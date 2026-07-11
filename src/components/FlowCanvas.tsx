import { ReactFlow, Background, Controls, MiniMap, MarkerType } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useMemo } from 'react'
import flow from '../data/flow.json'
import type { FlowData } from '../types'
import { buildNodes, buildEdges } from '../lib/flowModel'
import { computeDimming } from '../lib/highlight'
import { TaskNode } from './nodes/TaskNode'
import { GatewayNode } from './nodes/GatewayNode'
import { EventNode } from './nodes/EventNode'
import { LaneBackground } from './nodes/LaneBackground'
import { FlowEdge } from './edges/FlowEdge'
import { useAppStore } from '../store'

const data = flow as FlowData
const nodeTypes = { task: TaskNode, gateway: GatewayNode, event: EventNode, lane: LaneBackground }
const edgeTypes = { flow: FlowEdge }

const isDesktop = () => window.matchMedia('(min-width: 768px)').matches

export function FlowCanvas() {
  const select = useAppStore((s) => s.select)
  const clearSelection = useAppStore((s) => s.clearSelection)
  const selectedNodeId = useAppStore((s) => s.selectedNodeId)
  const laneFilter = useAppStore((s) => s.laneFilter)
  const tour = useAppStore((s) => s.tour)

  const baseNodes = useMemo(() => buildNodes(data), [])
  const baseEdges = useMemo(
    () =>
      buildEdges(data).map((e) => ({
        ...e,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: e.data?.tipo === 'retorno' ? '#E53935' : '#212121',
          width: 18,
          height: 18,
        },
      })),
    [],
  )

  const selectedGatewayId =
    selectedNodeId && data.nos.find((n) => n.id === selectedNodeId)?.tipo === 'gateway'
      ? selectedNodeId
      : null

  const { dimNodes, highlightEdges } = useMemo(() => {
    // no modo trilha, esmaece tudo menos o nó atual
    if (tour.ativo && tour.atual) {
      const dim = new Set(data.nos.filter((n) => n.id !== tour.atual).map((n) => n.id))
      return { dimNodes: dim, highlightEdges: new Set<string>() }
    }
    return computeDimming(data, laneFilter, selectedGatewayId)
  }, [laneFilter, selectedGatewayId, tour.ativo, tour.atual])

  const temDestaque = highlightEdges.size > 0

  const nodes = useMemo(
    () =>
      baseNodes.map((n) =>
        n.type === 'lane'
          ? n
          : {
              ...n,
              selected: n.id === selectedNodeId,
              style: dimNodes.has(n.id) ? { opacity: 0.18, transition: 'opacity 0.3s' } : { transition: 'opacity 0.3s' },
            },
      ),
    [baseNodes, dimNodes, selectedNodeId],
  )

  const edges = useMemo(
    () =>
      baseEdges.map((e) => {
        if (highlightEdges.has(e.id)) {
          return { ...e, animated: true, style: { strokeWidth: 3.5 } }
        }
        const esmaecida = temDestaque || dimNodes.has(e.source) || dimNodes.has(e.target)
        return esmaecida ? { ...e, style: { opacity: 0.15 } } : e
      }),
    [baseEdges, highlightEdges, dimNodes, temDestaque],
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      minZoom={0.15}
      maxZoom={4}
      proOptions={{ hideAttribution: true }}
      nodesConnectable={false}
      elementsSelectable
      onNodeClick={(_, node) => {
        if (node.type !== 'lane') select(node.id)
      }}
      onPaneClick={() => clearSelection()}
    >
      <Background color="#CFD8DC" />
      <Controls showInteractive={false} position="bottom-left" />
      {isDesktop() && <MiniMap pannable zoomable position="bottom-right" />}
    </ReactFlow>
  )
}
