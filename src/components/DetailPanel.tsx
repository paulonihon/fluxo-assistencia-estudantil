import flow from '../data/flow.json'
import type { FlowData, FlowNodeData } from '../types'
import { RAIA_VISUAL } from '../lib/raias'
import { useAppStore } from '../store'
import { TermText } from './TermText'

const data = flow as FlowData

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{titulo}</div>
      <div className="mt-1.5 text-[14.5px] leading-relaxed text-gray-800">{children}</div>
    </div>
  )
}

export function ConteudoNo({ no }: { no: FlowNodeData }) {
  const visual = RAIA_VISUAL[no.raia]
  return (
    <div className="px-4 md:px-5 pb-6">
      <div className="font-display text-[18px] md:text-[19px] font-semibold leading-snug text-[#1C2B24]">
        {no.rotulo}
      </div>
      <span
        className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
        style={{ background: visual.corSuave, color: visual.corTexto }}
      >
        <span className="h-2 w-2 rounded-full" style={{ background: visual.cor }} />
        {data.raias.find((r) => r.id === no.raia)?.nome}
      </span>
      {no.descricao ? (
        <Bloco titulo="O que acontece nesta etapa">
          <TermText texto={no.descricao} />
        </Bloco>
      ) : null}
      {no.ramificacoes?.length ? (
        <Bloco titulo="Caminhos possíveis">
          <div className="space-y-2">
            {no.ramificacoes.map((r) => (
              <div key={r.rotulo} className="rounded-xl border border-gray-200 bg-gray-50/60 p-3">
                <span
                  className={`mr-2 inline-block rounded-md px-2 py-0.5 text-[11px] font-bold text-white ${r.rotulo === 'Sim' ? 'bg-emerald-600' : 'bg-red-500'}`}
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
        <Bloco titulo="Quem faz">
          <TermText texto={no.responsavel} />
        </Bloco>
      ) : null}
      {no.base_legal ? (
        <Bloco titulo="Base legal">
          <TermText texto={no.base_legal} />
        </Bloco>
      ) : null}
      {no.documentos?.length ? (
        <Bloco titulo="Documentos envolvidos">
          <ul className="list-disc space-y-1 pl-5">
            {no.documentos.map((d) => (
              <li key={d}>
                <TermText texto={d} />
              </li>
            ))}
          </ul>
        </Bloco>
      ) : null}
      {no.prazo ? (
        <Bloco titulo="Quando acontece">
          <TermText texto={no.prazo} />
        </Bloco>
      ) : null}
      {no.o_que_fazer ? (
        <Bloco titulo="O que você precisa fazer">
          <div className="rounded-xl border p-3" style={{ background: visual.corSuave, borderColor: visual.cor + '40' }}>
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

  const visual = RAIA_VISUAL[no.raia]

  return (
    <>
      {/* desktop: painel lateral direito */}
      <aside className="hidden md:flex flex-col absolute right-0 top-0 bottom-0 w-[400px] bg-white shadow-2xl ring-1 ring-black/5 z-20 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur">
          <div
            className="h-1.5 w-full"
            style={{ background: `linear-gradient(90deg, ${visual.cor}, ${visual.cor}99)` }}
          />
          <div className="flex justify-end px-2 pt-2">
            <button
              type="button"
              aria-label="Fechar painel"
              className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
              onClick={clearSelection}
            >
              ✕
            </button>
          </div>
        </div>
        <ConteudoNo no={no} />
      </aside>
      {/* mobile: bottom sheet (na trilha, o sheet da trilha assume o conteúdo) */}
      {tourAtivo ? null : (
      <div className="md:hidden absolute inset-x-0 bottom-0 z-20 max-h-[55vh] overflow-y-auto rounded-t-3xl bg-white shadow-[0_-8px_24px_rgba(15,40,30,0.16)]">
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur">
          <div
            className="h-1.5 w-full rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, ${visual.cor}, ${visual.cor}99)` }}
          />
          <div className="flex items-center justify-between px-4 pt-1.5 pb-1">
            <div className="mx-auto h-1.5 w-10 rounded-full bg-gray-200" />
            <button
              type="button"
              aria-label="Fechar painel"
              className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
              onClick={clearSelection}
            >
              ✕
            </button>
          </div>
        </div>
        <ConteudoNo no={no} />
      </div>
      )}
    </>
  )
}
