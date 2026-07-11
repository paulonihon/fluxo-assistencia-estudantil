import { useCallback, useEffect, useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import flow from '../data/flow.json'
import type { FlowData } from '../types'
import { NODE_SIZE } from '../lib/flowModel'
import { RAIA_VISUAL } from '../lib/raias'
import { advance, getOutgoing, isGateway } from '../lib/tour'
import { useAppStore } from '../store'
import { ConteudoNo } from './DetailPanel'

const data = flow as FlowData

function centroDoNo(id: string) {
  const no = data.nos.find((n) => n.id === id)!
  const s = NODE_SIZE[no.tipo]
  return { x: no.posicao.x + s.w / 2, y: no.posicao.y + s.h / 2 }
}

export function GuidedTour() {
  const tour = useAppStore((s) => s.tour)
  const setTour = useAppStore((s) => s.setTour)
  const select = useAppStore((s) => s.select)
  const clearSelection = useAppStore((s) => s.clearSelection)
  const { setCenter } = useReactFlow()
  // no mobile o sheet começa compacto para não sobrepor o fluxo
  const [expandido, setExpandido] = useState(false)

  const focar = useCallback(
    (id: string, sheetExpandido: boolean) => {
      const c = centroDoNo(id)
      const mobile = window.innerWidth < 768
      // cada etapa aparece em tamanho grande na tela
      const zoom = mobile ? 1.9 : 1.6
      // desloca o alvo para a área visível (acima do sheet no mobile, à esquerda do painel no desktop)
      const fatorSheet = sheetExpandido ? 0.27 : 0.11
      const offsetY = mobile ? (window.innerHeight * fatorSheet) / zoom : 0
      const offsetX = mobile ? 0 : 190 / zoom
      // easing suave (easeInOutCubic) e duração maior para a câmera deslizar com calma
      const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
      setCenter(c.x + offsetX, c.y + offsetY, { zoom, duration: 1100, ease: easeInOutCubic })
    },
    [setCenter],
  )

  useEffect(() => {
    if (tour.ativo && tour.atual) {
      select(tour.atual)
      focar(tour.atual, expandido)
    }
  }, [tour.ativo, tour.atual, select, focar, expandido])

  if (!tour.ativo || !tour.atual) return null

  const atual = data.nos.find((n) => n.id === tour.atual)!
  const visual = RAIA_VISUAL[atual.raia]
  const noGateway = isGateway(data, atual.id)
  const fim = getOutgoing(data, atual.id).length === 0
  const passo = tour.historico.length + 1

  const irPara = (id: string) => {
    setTour({ atual: id, historico: [...tour.historico, atual.id] })
  }

  const proximo = () => {
    const next = advance(data, atual.id)
    if (next) irPara(next)
  }

  const anterior = () => {
    const hist = [...tour.historico]
    const prev = hist.pop()
    if (prev) setTour({ atual: prev, historico: hist })
  }

  const recomecar = () => setTour({ atual: 'inicio', historico: [] })

  const sair = () => {
    setTour({ ativo: false, atual: null, historico: [] })
    clearSelection()
  }

  const botoes = (
    <div className="flex gap-2.5">
      <button
        type="button"
        className="inline-flex h-11 items-center rounded-xl bg-white px-4 text-[13px] font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50 disabled:opacity-40"
        onClick={anterior}
        disabled={tour.historico.length === 0}
      >
        ← Anterior
      </button>
      {fim ? (
        <button
          type="button"
          className="h-11 flex-1 rounded-xl bg-gradient-to-b from-emerald-800 to-emerald-950 px-4 text-[14px] font-semibold text-white shadow-md shadow-emerald-900/20 ring-1 ring-emerald-950/30 transition-all hover:brightness-110"
          onClick={recomecar}
        >
          Recomeçar do início
        </button>
      ) : noGateway ? (
        atual.ramificacoes?.map((r) => (
          <button
            key={r.rotulo}
            type="button"
            className={`h-11 flex-1 rounded-xl px-4 text-[14px] font-semibold text-white shadow-md ring-1 transition-all hover:brightness-110 ${
              r.rotulo === 'Sim'
                ? 'bg-gradient-to-b from-emerald-600 to-emerald-800 shadow-emerald-900/20 ring-emerald-900/30'
                : 'bg-gradient-to-b from-red-500 to-red-700 shadow-red-900/20 ring-red-900/30'
            }`}
            onClick={() => irPara(r.para)}
          >
            {r.rotulo}
          </button>
        ))
      ) : (
        <button
          type="button"
          className="h-11 flex-1 rounded-xl bg-gradient-to-b from-emerald-800 to-emerald-950 px-4 text-[14px] font-semibold text-white shadow-md shadow-emerald-900/20 ring-1 ring-emerald-950/30 transition-all hover:brightness-110"
          onClick={proximo}
        >
          Próximo →
        </button>
      )}
    </div>
  )

  // consequências visíveis junto dos botões de decisão
  const consequencias = noGateway ? (
    <div className="space-y-1.5">
      {atual.ramificacoes?.map((r) => (
        <div key={r.rotulo} className="flex items-start gap-2 text-[12.5px] leading-snug text-gray-600">
          <span
            className={`mt-0.5 inline-block shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white ${r.rotulo === 'Sim' ? 'bg-emerald-600' : 'bg-red-500'}`}
          >
            {r.rotulo}
          </span>
          <span>{r.consequencia}</span>
        </div>
      ))}
    </div>
  ) : null

  return (
    <>
      {/* desktop: card flutuante */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden justify-center md:flex">
        <div className="pointer-events-auto m-4 w-full max-w-[600px] rounded-2xl bg-white/95 p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur-md">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ background: visual.corSuave, color: visual.corTexto }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: visual.cor }} />
                  {visual.nome}
                </span>
                <span className="text-[11px] font-semibold text-gray-400">passo {passo}</span>
              </div>
              <div className="mt-0.5 truncate font-display text-[15px] font-semibold text-[#14201A]">
                {atual.rotulo}
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-full px-2.5 py-1 text-[12px] font-medium text-gray-500 hover:bg-gray-100"
              onClick={sair}
            >
              Sair
            </button>
          </div>
          {consequencias ? <div className="mt-3">{consequencias}</div> : null}
          <div className="mt-3">{botoes}</div>
        </div>
      </div>

      {/* mobile: superfície única recolhível — compacta por padrão para não sobrepor o fluxo */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 flex flex-col rounded-t-3xl bg-white shadow-[0_-8px_28px_rgba(15,40,30,0.2)] md:hidden ${expandido ? 'max-h-[58vh]' : ''}`}
      >
        <div className="shrink-0">
          <div
            className="h-1.5 w-full rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, ${visual.cor}, ${visual.cor}99)` }}
          />
          <div className="flex items-center justify-between px-4 pb-0.5 pt-2">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{ background: visual.corSuave, color: visual.corTexto }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: visual.cor }} />
                {visual.nome}
              </span>
              <span className="text-[11px] font-semibold text-gray-400">passo {passo}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-full px-2.5 py-1 text-[12px] font-semibold text-emerald-800 hover:bg-emerald-50"
                onClick={() => setExpandido(!expandido)}
              >
                {expandido ? 'Ocultar detalhes ▾' : 'Ver detalhes ▴'}
              </button>
              <button
                type="button"
                className="rounded-full px-2.5 py-1 text-[12px] font-medium text-gray-500 hover:bg-gray-100"
                onClick={sair}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
        {expandido ? (
          <div className="relative min-h-0 flex-1 overflow-y-auto">
            <ConteudoNo no={atual} />
            {/* fade sinalizando conteúdo rolável */}
            <div className="pointer-events-none sticky bottom-0 h-6 w-full bg-gradient-to-t from-white to-transparent" />
          </div>
        ) : (
          <div className="px-4 pt-1">
            <div className="font-display text-[15px] font-semibold leading-snug text-[#14201A]">
              {atual.rotulo}
            </div>
            {consequencias ? <div className="mt-2">{consequencias}</div> : null}
          </div>
        )}
        <div className="shrink-0 px-4 py-3">{botoes}</div>
      </div>
    </>
  )
}
