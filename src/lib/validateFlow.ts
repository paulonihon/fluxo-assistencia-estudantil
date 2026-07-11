import type { FlowData } from '../types'

export function validateFlow(data: FlowData): string[] {
  const erros: string[] = []
  const ids = new Set<string>()
  const raias = new Set(data.raias.map((r) => r.id))

  for (const no of data.nos) {
    if (ids.has(no.id)) erros.push(`id duplicado: ${no.id}`)
    ids.add(no.id)
    if (!raias.has(no.raia)) erros.push(`raia inexistente em ${no.id}: ${no.raia}`)
    if (no.tipo === 'gateway' && (!no.ramificacoes || no.ramificacoes.length !== 2))
      erros.push(`gateway ${no.id} precisa de 2 ramificações`)
  }
  for (const c of data.conexoes) {
    if (!ids.has(c.de)) erros.push(`conexão parte de nó inexistente: ${c.de}`)
    if (!ids.has(c.para)) erros.push(`conexão chega em nó inexistente: ${c.para}`)
  }
  return erros
}
