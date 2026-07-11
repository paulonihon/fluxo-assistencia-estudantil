import { describe, it, expect } from 'vitest'
import flow from '../../data/flow.json'
import { advance, getOutgoing, isGateway } from '../tour'
import type { FlowData } from '../../types'

const data = flow as FlowData

describe('tour', () => {
  it('avança em sequência linear', () => {
    expect(advance(data, 'inicio')).toBe('nomeacao_comissao')
  })
  it('gateway sem escolha retorna null', () => {
    expect(advance(data, 'gw_aprovado')).toBeNull()
    expect(isGateway(data, 'gw_aprovado')).toBe(true)
  })
  it('gateway com escolha segue o rótulo', () => {
    expect(advance(data, 'gw_aprovado', 'Sim')).toBe('publicacao_edital')
    expect(advance(data, 'gw_aprovado', 'Não')).toBe('elaboracao_edital')
  })
  it('fim não tem saída', () => {
    expect(getOutgoing(data, 'fim')).toEqual([])
    expect(advance(data, 'fim')).toBeNull()
  })
  it('nó com mais de uma saída sem rótulo segue rumo ao fim', () => {
    expect(advance(data, 'pagamento_auxilios')).toBe('fim')
  })
})
