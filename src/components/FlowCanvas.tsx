import { ReactFlow, Background, BackgroundVariant, Controls, MarkerType } from '@xyflow/react'
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
          color: e.data?.tipo === 'retorno' ? '#F87171' : '#64748B',
          width: 16,
          height: 16,
        },
      })),
    [],
  )

  const selectedGatewayId =
    selectedNodeId && data.nos.find((n) => n.id === selectedNodeId)?.tipo === 'gateway'
      ? selectedNodeId
      : null

  // revelação progressiva: na trilha, o percorrido fica visível e o futuro vira fantasma
  const revelados = useMemo(() => {
    if (!tour.ativo || !tour.atual) return null
    return new Set([...tour.historico, tour.atual])
  }, [tour.ativo, tour.atual, tour.historico])

  const { dimNodes, highlightEdges } = useMemo(
    () => computeDimming(data, laneFilter, selectedGatewayId),
    [laneFilter, selectedGatewayId],
  )

  const ultimaTransicao = useMemo(() => {
    if (!revelados || tour.historico.length === 0) return null
    return { de: tour.historico[tour.historico.length - 1], para: tour.atual }
  }, [revelados, tour.historico, tour.atual])

  const temDestaque = highlightEdges.size > 0

  const nodes = useMemo(
    () =>
      baseNodes.map((n) => {
        if (n.type === 'lane') return n
        if (revelados) {
          const fantasma = !revelados.has(n.id)
          return {
            ...n,
            selected: n.id === tour.atual,
            style: { opacity: fantasma ? 0.07 : 1, transition: 'opacity 0.45s' },
          }
        }
        return {
          ...n,
          selected: n.id === selectedNodeId,
          style: dimNodes.has(n.id)
            ? { opacity: 0.15, transition: 'opacity 0.3s' }
            : { transition: 'opacity 0.3s' },
        }
      }),
    [baseNodes, dimNodes, selectedNodeId, revelados, tour.atual],
  )

  const edges = useMemo(
    () =>
      baseEdges.map((e) => {
        if (revelados) {
          const visivel = revelados.has(e.source) && revelados.has(e.target)
          const recemPercorrida =
            ultimaTransicao && e.source === ultimaTransicao.de && e.target === ultimaTransicao.para
          if (recemPercorrida) return { ...e, animated: true, style: { strokeWidth: 2.5, opacity: 1 } }
          return { ...e, style: { opacity: visivel ? 0.85 : 0.04, transition: 'opacity 0.45s' } }
        }
        if (highlightEdges.has(e.id)) {
          return { ...e, animated: true, style: { strokeWidth: 3 } }
        }
        const esmaecida = temDestaque || dimNodes.has(e.source) || dimNodes.has(e.target)
        return esmaecida ? { ...e, style: { opacity: 0.12 } } : e
      }),
    [baseEdges, highlightEdges, dimNodes, temDestaque, revelados, ultimaTransicao],
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      fitViewOptions={{ padding: 0.06 }}
      minZoom={0.15}
      maxZoom={4}
      zoomOnScroll={false}
      panOnScroll
      zoomOnPinch
      proOptions={{ hideAttribution: true }}
      nodesConnectable={false}
      elementsSelectable
      onNodeClick={(_, node) => {
        if (node.type !== 'lane') select(node.id)
      }}
      onPaneClick={() => clearSelection()}
    >
      <Background variant={BackgroundVariant.Dots} color="#E3E9E5" gap={24} size={1.25} />
      <Controls showInteractive={false} position="bottom-left" />
    </ReactFlow>
  )
}
