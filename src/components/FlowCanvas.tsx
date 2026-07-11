import { ReactFlow, Background, Controls, MiniMap, MarkerType } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useMemo } from 'react'
import flow from '../data/flow.json'
import type { FlowData } from '../types'
import { buildNodes, buildEdges } from '../lib/flowModel'
import { TaskNode } from './nodes/TaskNode'
import { GatewayNode } from './nodes/GatewayNode'
import { EventNode } from './nodes/EventNode'
import { LaneBackground } from './nodes/LaneBackground'
import { FlowEdge } from './edges/FlowEdge'
import { useAppStore } from '../store'

const nodeTypes = { task: TaskNode, gateway: GatewayNode, event: EventNode, lane: LaneBackground }
const edgeTypes = { flow: FlowEdge }

const isDesktop = () => window.matchMedia('(min-width: 768px)').matches

export function FlowCanvas() {
  const select = useAppStore((s) => s.select)
  const clearSelection = useAppStore((s) => s.clearSelection)

  const nodes = useMemo(() => buildNodes(flow as FlowData), [])
  const edges = useMemo(
    () =>
      buildEdges(flow as FlowData).map((e) => ({
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
