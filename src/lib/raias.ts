// identidade visual de cada ator do fluxo
export interface RaiaVisual {
  nome: string
  cor: string
  corSuave: string
  corTexto: string
}

export const RAIA_VISUAL: Record<string, RaiaVisual> = {
  cgae: { nome: 'CGAE', cor: '#059669', corSuave: '#ECFDF5', corTexto: '#065F46' },
  comunicacao: { nome: 'Comunicação', cor: '#0284C7', corSuave: '#F0F9FF', corTexto: '#075985' },
  discentes: { nome: 'Discentes', cor: '#7C3AED', corSuave: '#F5F3FF', corTexto: '#5B21B6' },
  assistente_social: { nome: 'Assist. Social', cor: '#E11D48', corSuave: '#FFF1F2', corTexto: '#9F1239' },
  financas: { nome: 'Finanças', cor: '#D97706', corSuave: '#FFFBEB', corTexto: '#92400E' },
}
