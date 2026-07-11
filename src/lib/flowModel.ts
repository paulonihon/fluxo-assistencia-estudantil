import type { Edge, Node } from '@xyflow/react'
import type { FlowData, FlowNodeData } from '../types'

export const LANE_BOUNDS: Record<string, { y: number; height: number }> = {
  cgae: { y: 0, height: 490 },
  comunicacao: { y: 490, height: 215 },
  discentes: { y: 705, height: 150 },
  assistente_social: { y: 855, height: 175 },
  financas: { y: 1030, height: 260 },
}
export const CANVAS_WIDTH = 1550

export const NODE_SIZE: Record<string, { w: number; h: number }> = {
  tarefa: { w: 200, h: 72 },
  gateway: { w: 72, h: 72 },
  evento_inicio: { w: 48, h: 48 },
  evento_fim: { w: 48, h: 48 },
}

function centro(no: FlowNodeData) {
  const s = NODE_SIZE[no.tipo]
  return { x: no.posicao.x + s.w / 2, y: no.posicao.y + s.h / 2 }
}

export function buildNodes(data: FlowData): Node[] {
  const lanes: Node[] = data.raias.map((raia, i) => ({
    id: `lane_${raia.id}`,
    type: 'lane',
    position: { x: -90, y: LANE_BOUNDS[raia.id].y },
    data: { nome: raia.nome, index: i, raiaId: raia.id, height: LANE_BOUNDS[raia.id].height },
    draggable: false,
    selectable: false,
    zIndex: -1,
  }))
  const nos: Node[] = data.nos.map((no) => ({
    id: no.id,
    type: no.tipo === 'tarefa' ? 'task' : no.tipo === 'gateway' ? 'gateway' : 'event',
    position: no.posicao,
    data: { ...no },
    draggable: false,
  }))
  return [...lanes, ...nos]
}

// escolhe o par de handles pelo eixo dominante entre os centros dos nós
function handles(de: FlowNodeData, para: FlowNodeData): { sourceHandle: string; targetHandle: string } {
  const a = centro(de)
  const b = centro(para)
  const dx = b.x - a.x
  const dy = b.y - a.y
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0
      ? { sourceHandle: 'right', targetHandle: 't-left' }
      : { sourceHandle: 'left', targetHandle: 't-right' }
  }
  return dy >= 0
    ? { sourceHandle: 'bottom', targetHandle: 't-top' }
    : { sourceHandle: 'top', targetHandle: 't-bottom' }
}

export function buildEdges(data: FlowData): Edge[] {
  const porId = new Map(data.nos.map((n) => [n.id, n]))
  return data.conexoes.map((c, i) => {
    const de = porId.get(c.de)!
    const para = porId.get(c.para)!
    return {
      id: `e${i}_${c.de}_${c.para}`,
      source: c.de,
      target: c.para,
      type: 'flow',
      label: c.rotulo,
      data: { tipo: c.tipo },
      ...handles(de, para),
      ...(c.saida ? { sourceHandle: c.saida } : {}),
      ...(c.entrada ? { targetHandle: c.entrada } : {}),
    }
  })
}
