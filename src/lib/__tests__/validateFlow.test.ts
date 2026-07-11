import { describe, it, expect } from 'vitest'
import flow from '../../data/flow.json'
import { validateFlow } from '../validateFlow'
import type { FlowData } from '../../types'

describe('validateFlow', () => {
  it('flow.json é válido', () => {
    expect(validateFlow(flow as FlowData)).toEqual([])
  })
  it('detecta conexão para nó inexistente', () => {
    const broken = structuredClone(flow) as FlowData
    broken.conexoes.push({ de: 'inicio', para: 'nao_existe', tipo: 'sequencia' })
    expect(validateFlow(broken).length).toBeGreaterThan(0)
  })
  it('detecta id duplicado', () => {
    const broken = structuredClone(flow) as FlowData
    broken.nos.push({ ...broken.nos[0] })
    expect(validateFlow(broken).length).toBeGreaterThan(0)
  })
})
