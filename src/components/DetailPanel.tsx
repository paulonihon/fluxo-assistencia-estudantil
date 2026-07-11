import { useReactFlow } from '@xyflow/react'
import flow from '../data/flow.json'
import type { FlowData, FlowNodeData } from '../types'
import { NODE_SIZE } from '../lib/flowModel'
import { RAIA_VISUAL } from '../lib/raias'
import { useAppStore } from '../store'
import { NodeIcon } from './nodes/NodeIcon'
import { TermText } from './TermText'

const data = flow as FlowData

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-gray-400">{titulo}</div>
      <div className="mt-2 text-[14.5px] leading-relaxed text-gray-800">{children}</div>
    </div>
  )
}

export function ConteudoNo({ no }: { no: FlowNodeData }) {
  const visual = RAIA_VISUAL[no.raia]
  return (
    <div className="px-4 md:px-6 pb-6">
      <div className="font-display text-[18px] md:text-[19px] font-semibold leading-snug text-[#14201A]">
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

// navegação entre etapas conectadas (de onde vem / para onde vai)
function EtapasConectadas({ no }: { no: FlowNodeData }) {
  const select = useAppStore((s) => s.select)
  const { setCenter, getZoom } = useReactFlow()

  const irPara = (id: string) => {
    const destino = data.nos.find((n) => n.id === id)!
    const s = NODE_SIZE[destino.tipo]
    select(id)
    setCenter(destino.posicao.x + s.w / 2, destino.posicao.y + s.h / 2, {
      zoom: Math.max(getZoom(), 1.1),
      duration: 600,
    })
  }

  const chips = (conexoes: typeof data.conexoes, chave: 'de' | 'para') =>
    conexoes.map((c) => {
      const alvo = data.nos.find((n) => n.id === c[chave])!
      const v = RAIA_VISUAL[alvo.raia]
      return (
        <button
          key={`${c.de}_${c.para}`}
          type="button"
          className="flex w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-left text-[13px] font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50 hover:ring-gray-300"
          onClick={() => irPara(alvo.id)}
        >
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: v.cor }} />
          <span className="min-w-0 flex-1 truncate">{alvo.rotulo}</span>
          {c.rotulo ? (
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold text-white ${c.rotulo === 'Sim' ? 'bg-emerald-600' : 'bg-red-500'}`}
            >
              {c.rotulo}
            </span>
          ) : null}
        </button>
      )
    })

  const entradas = data.conexoes.filter((c) => c.para === no.id)
  const saidas = data.conexoes.filter((c) => c.de === no.id)
  if (!entradas.length && !saidas.length) return null

  return (
    <div className="border-t border-gray-100 px-4 pb-6 md:px-6">
      {entradas.length ? (
        <div className="mt-5">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-gray-400">Vem de</div>
          <div className="mt-2 space-y-1.5">{chips(entradas, 'de')}</div>
        </div>
      ) : null}
      {saidas.length ? (
        <div className="mt-5">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-gray-400">Leva a</div>
          <div className="mt-2 space-y-1.5">{chips(saidas, 'para')}</div>
        </div>
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
      <aside
        key={no.id}
        className="panel-in absolute bottom-0 right-0 top-0 z-20 hidden w-[420px] flex-col overflow-y-auto bg-white shadow-2xl ring-1 ring-black/5 md:flex"
      >
        <div className="sticky top-0 z-10">
          <div
            className="relative overflow-hidden px-6 pb-4 pt-5"
            style={{ background: `linear-gradient(135deg, ${visual.corSuave}, #FFFFFF 78%)` }}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full"
              style={{ border: `1.5px solid ${visual.cor}22` }}
            />
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm"
                style={{ boxShadow: `inset 0 0 0 1.5px ${visual.cor}55, 0 2px 8px rgba(15,40,30,0.08)` }}
              >
                <NodeIcon noId={no.id} cor={visual.cor} size={20} />
              </div>
              <button
                type="button"
                aria-label="Fechar painel"
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-600"
                onClick={clearSelection}
              >
                ✕
              </button>
            </div>
          </div>
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${visual.cor}, ${visual.cor}66)` }} />
        </div>
        <ConteudoNo no={no} />
        {tourAtivo ? null : <EtapasConectadas no={no} />}
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
          <EtapasConectadas no={no} />
        </div>
      )}
    </>
  )
}
