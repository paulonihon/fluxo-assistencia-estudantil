import flow from '../data/flow.json'
import type { FlowData, FlowNodeData } from '../types'
import { useAppStore } from '../store'
import { TermText } from './TermText'

const data = flow as FlowData

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="text-[11px] font-bold uppercase tracking-wide text-gray-500">{titulo}</div>
      <div className="mt-1 text-[14px] leading-relaxed text-gray-800">{children}</div>
    </div>
  )
}

function ConteudoNo({ no }: { no: FlowNodeData }) {
  const raia = data.raias.find((r) => r.id === no.raia)
  return (
    <div className="px-4 pb-6">
      <div className="text-[17px] font-semibold text-gray-900 leading-snug">{no.rotulo}</div>
      {raia ? (
        <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-900">
          {raia.nome}
        </span>
      ) : null}
      {no.descricao ? (
        <Bloco titulo="O que acontece">
          <TermText texto={no.descricao} />
        </Bloco>
      ) : null}
      {no.ramificacoes?.length ? (
        <Bloco titulo="Caminhos possíveis">
          <div className="space-y-2">
            {no.ramificacoes.map((r) => (
              <div key={r.rotulo} className="rounded-lg border border-gray-200 p-2.5">
                <span
                  className={`mr-2 inline-block rounded px-1.5 py-0.5 text-[11px] font-bold text-white ${r.rotulo === 'Sim' ? 'bg-emerald-600' : 'bg-red-600'}`}
                >
                  {r.rotulo}
                </span>
                <TermText texto={r.consequencia} />
              </div>
            ))}
          </div>
        </Bloco>
      ) : null}
      {no.responsavel ? (
        <Bloco titulo="Responsável">
          <TermText texto={no.responsavel} />
        </Bloco>
      ) : null}
      {no.base_legal ? (
        <Bloco titulo="Base legal">
          <TermText texto={no.base_legal} />
        </Bloco>
      ) : null}
      {no.documentos?.length ? (
        <Bloco titulo="Documentos">
          <ul className="list-disc pl-5 space-y-1">
            {no.documentos.map((d) => (
              <li key={d}>
                <TermText texto={d} />
              </li>
            ))}
          </ul>
        </Bloco>
      ) : null}
      {no.prazo ? (
        <Bloco titulo="Prazo">
          <TermText texto={no.prazo} />
        </Bloco>
      ) : null}
      {no.o_que_fazer ? (
        <Bloco titulo="Na prática">
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-2.5">
            <TermText texto={no.o_que_fazer} />
          </div>
        </Bloco>
      ) : null}
    </div>
  )
}

export function DetailPanel() {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId)
  const clearSelection = useAppStore((s) => s.clearSelection)
  const tourAtivo = useAppStore((s) => s.tour.ativo)
  const no = data.nos.find((n) => n.id === selectedNodeId)
  if (!no) return null

  return (
    <>
      {/* desktop: painel lateral direito */}
      <aside className="hidden md:flex flex-col absolute right-0 top-0 bottom-0 w-[380px] bg-white border-l border-gray-200 shadow-xl z-20 overflow-y-auto">
        <div className="sticky top-0 flex justify-end bg-white/95 px-2 pt-2">
          <button
            type="button"
            aria-label="Fechar painel"
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
            onClick={clearSelection}
          >
            ✕
          </button>
        </div>
        <ConteudoNo no={no} />
      </aside>
      {/* mobile: bottom sheet */}
      <div
        className={`md:hidden absolute inset-x-0 z-20 overflow-y-auto rounded-t-2xl bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.18)] ${tourAtivo ? 'bottom-[132px] max-h-[38vh]' : 'bottom-0 max-h-[55vh]'}`}
      >
        <div className="sticky top-0 flex items-center justify-between bg-white/95 px-4 pt-2 pb-1">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-gray-300" />
          <button
            type="button"
            aria-label="Fechar painel"
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
            onClick={clearSelection}
          >
            ✕
          </button>
        </div>
        <ConteudoNo no={no} />
      </div>
    </>
  )
}
