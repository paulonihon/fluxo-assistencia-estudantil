import { describe, it, expect } from 'vitest'
import flow from '../../data/flow.json'
import glossario from '../../data/glossario.json'

describe('conteúdo pedagógico', () => {
  it('todo nó de tarefa e gateway tem descricao e responsavel', () => {
    for (const no of flow.nos.filter((n) => n.tipo === 'tarefa' || n.tipo === 'gateway')) {
      expect(no.descricao, `descricao ausente em ${no.id}`).toBeTruthy()
      expect(no.responsavel, `responsavel ausente em ${no.id}`).toBeTruthy()
    }
  })
  it('glossário tem os termos essenciais', () => {
    const siglas = glossario.termos.map((t) => t.sigla)
    for (const s of ['CGAE', 'SUAP', 'PNAES', 'PAAE']) expect(siglas).toContain(s)
  })
})
