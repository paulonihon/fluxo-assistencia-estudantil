export type NodeKind = 'evento_inicio' | 'evento_fim' | 'tarefa' | 'gateway'

export interface Lane {
  id: string
  nome: string
}

export interface Ramificacao {
  rotulo: 'Sim' | 'Não'
  para: string
  consequencia: string
}

export interface FlowNodeData {
  id: string
  tipo: NodeKind
  rotulo: string
  raia: string
  posicao: { x: number; y: number }
  descricao: string | null
  responsavel: string | null
  base_legal: string | null
  documentos: string[] | null
  prazo: string | null
  o_que_fazer: string | null
  ramificacoes?: Ramificacao[]
}

export interface FlowConnection {
  de: string
  para: string
  tipo: 'sequencia' | 'retorno'
  rotulo?: string
  saida?: string
  entrada?: string
}

export interface FlowData {
  titulo: string
  raias: Lane[]
  nos: FlowNodeData[]
  conexoes: FlowConnection[]
}
