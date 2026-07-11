import type { FlowConnection, FlowData } from '../types'

export function getOutgoing(data: FlowData, id: string): FlowConnection[] {
  return data.conexoes.filter((c) => c.de === id)
}

export function isGateway(data: FlowData, id: string): boolean {
  return data.nos.find((n) => n.id === id)?.tipo === 'gateway'
}

export function advance(data: FlowData, atual: string, escolha?: 'Sim' | 'Não'): string | null {
  const saidas = getOutgoing(data, atual)
  if (saidas.length === 0) return null
  if (isGateway(data, atual)) {
    if (!escolha) return null
    return saidas.find((s) => s.rotulo === escolha)?.para ?? null
  }
  if (saidas.length === 1) return saidas[0].para
  // nó com múltiplas saídas (ex.: pagamento_auxilios): a trilha segue rumo ao fim
  return saidas.find((s) => s.para === 'fim')?.para ?? saidas.find((s) => s.tipo === 'sequencia')!.para
}
