// ícone por natureza da etapa (traço estilo lucide, 24x24)
const PATHS: Record<string, React.ReactNode> = {
  pessoas: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  documento: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </>
  ),
  envio: (
    <>
      <path d="M22 2 11 13" />
      <path d="M22 2l-7 20-4-9-9-4z" />
    </>
  ),
  anuncio: (
    <>
      <path d="M3 11l18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>
  ),
  formulario: <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />,
  analise: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </>
  ),
  conversa: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  resultado: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  verificacao: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  pagamento: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </>
  ),
  recurso: (
    <>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  decisao: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </>
  ),
  inicio: <path d="M8 5v14l11-7z" />,
  fim: <rect x="7" y="7" width="10" height="10" rx="1" />,
}

const ICONE_POR_NO: Record<string, string> = {
  nomeacao_comissao: 'pessoas',
  elaboracao_edital: 'documento',
  submissao_edital: 'envio',
  divulgacao_edital_comunidade: 'anuncio',
  divulgacao_lista_preliminar: 'anuncio',
  publicacao_edital: 'anuncio',
  publicacao_resultado_final: 'anuncio',
  realizacao_inscricoes: 'formulario',
  recurso_task: 'recurso',
  analise_socioeconomica: 'analise',
  entrevista_task: 'conversa',
  resultado_final: 'resultado',
  verificar_frequencia: 'verificacao',
  pagamento_auxilios: 'pagamento',
  gw_aprovado: 'decisao',
  gw_recurso: 'decisao',
  gw_entrevista: 'decisao',
  gw_monitoramento: 'decisao',
  inicio: 'inicio',
  fim: 'fim',
}

export function NodeIcon({ noId, cor, size = 16 }: { noId: string; cor: string; size?: number }) {
  const tipo = ICONE_POR_NO[noId]
  if (!tipo) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={cor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[tipo]}
    </svg>
  )
}
