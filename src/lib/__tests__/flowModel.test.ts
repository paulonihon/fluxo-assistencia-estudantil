import { describe, it, expect } from 'vitest'
import flow from '../../data/flow.json'
import { buildNodes, buildEdges } from '../flowModel'
import type { FlowData } from '../../types'

describe('flowModel', () => {
  it('gera um node React Flow por nó + um por raia', () => {
    const nodes = buildNodes(flow as FlowData)
    expect(nodes.length).toBe(flow.nos.length + flow.raias.length)
  })
  it('arestas de retorno saem com tipo retorno', () => {
    const edges = buildEdges(flow as FlowData)
    const retornos = edges.filter((e) => e.data?.tipo === 'retorno')
    expect(retornos.length).toBe(flow.conexoes.filter((c) => c.tipo === 'retorno').length)
  })
})
