import { describe, it, expect } from 'vitest'
import flow from '../../data/flow.json'
import { computeDimming } from '../highlight'
import type { FlowData } from '../../types'

describe('computeDimming', () => {
  it('sem filtro nem gateway, nada esmaecido', () => {
    const { dimNodes, highlightEdges } = computeDimming(flow as FlowData, null, null)
    expect(dimNodes.size).toBe(0)
    expect(highlightEdges.size).toBe(0)
  })
  it('filtro de raia esmaece nós das outras raias', () => {
    const { dimNodes } = computeDimming(flow as FlowData, 'discentes', null)
    expect(dimNodes.has('inicio')).toBe(true)
    expect(dimNodes.has('realizacao_inscricoes')).toBe(false)
    expect(dimNodes.has('recurso_task')).toBe(false)
  })
  it('gateway selecionado destaca as duas saídas e seus destinos', () => {
    const { dimNodes, highlightEdges } = computeDimming(flow as FlowData, null, 'gw_aprovado')
    expect(dimNodes.has('gw_aprovado')).toBe(false)
    expect(dimNodes.has('elaboracao_edital')).toBe(false)
    expect(dimNodes.has('publicacao_edital')).toBe(false)
    expect(dimNodes.has('pagamento_auxilios')).toBe(true)
    expect(highlightEdges.size).toBe(2)
  })
  it('gateway tem precedência sobre filtro de raia', () => {
    const a = computeDimming(flow as FlowData, 'discentes', 'gw_aprovado')
    const b = computeDimming(flow as FlowData, null, 'gw_aprovado')
    expect([...a.dimNodes].sort()).toEqual([...b.dimNodes].sort())
  })
})
