import type { FlowData } from '../types'

export interface Dimming {
  dimNodes: Set<string>
  highlightEdges: Set<string>
}

export function computeDimming(
  data: FlowData,
  laneFilter: string | null,
  selectedGatewayId: string | null,
): Dimming {
  const dimNodes = new Set<string>()
  const highlightEdges = new Set<string>()

  if (selectedGatewayId && data.nos.find((n) => n.id === selectedGatewayId)?.tipo === 'gateway') {
    const visiveis = new Set<string>([selectedGatewayId])
    data.conexoes.forEach((c, i) => {
      if (c.de === selectedGatewayId) {
        visiveis.add(c.para)
        highlightEdges.add(`e${i}_${c.de}_${c.para}`)
      }
    })
    for (const no of data.nos) if (!visiveis.has(no.id)) dimNodes.add(no.id)
    return { dimNodes, highlightEdges }
  }

  if (laneFilter) {
    for (const no of data.nos) if (no.raia !== laneFilter) dimNodes.add(no.id)
  }
  return { dimNodes, highlightEdges }
}
