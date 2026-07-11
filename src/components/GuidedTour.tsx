import { useCallback, useEffect } from 'react'
import { useReactFlow } from '@xyflow/react'
import flow from '../data/flow.json'
import type { FlowData } from '../types'
import { NODE_SIZE } from '../lib/flowModel'
import { RAIA_VISUAL } from '../lib/raias'
import { advance, getOutgoing, isGateway } from '../lib/tour'
import { useAppStore } from '../store'

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

  const focar = useCallback(
    (id: string) => {
      const c = centroDoNo(id)
      const mobile = window.innerWidth < 768
      // cada etapa aparece em tamanho grande na tela
      const zoom = mobile ? 1.9 : 1.6
      // desloca o alvo para a área visível (acima do bottom sheet no mobile, à esquerda do painel no desktop)
      const offsetY = mobile ? (window.innerHeight * 0.27) / zoom : 0
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
      focar(tour.atual)
    }
  }, [tour.ativo, tour.atual, select, focar])

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

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center pointer-events-none">
      <div className="pointer-events-auto m-3 w-full max-w-[600px] rounded-2xl border border-[#E2E8E5] bg-white/95 p-3.5 shadow-2xl backdrop-blur">
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
            <div className="mt-0.5 truncate font-display text-[15px] font-semibold text-[#1C2B24]">
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
        <div className="mt-2.5 flex gap-2">
          <button
            type="button"
            className="rounded-xl border border-gray-300 px-3.5 py-2 text-[13px] font-medium text-gray-700 disabled:opacity-40"
            onClick={anterior}
            disabled={tour.historico.length === 0}
          >
            ← Anterior
          </button>
          {fim ? (
            <button
              type="button"
              className="flex-1 rounded-xl bg-emerald-700 px-3.5 py-2 text-[14px] font-semibold text-white hover:bg-emerald-800"
              onClick={recomecar}
            >
              Recomeçar do início
            </button>
          ) : noGateway ? (
            atual.ramificacoes?.map((r) => (
              <button
                key={r.rotulo}
                type="button"
                className={`flex-1 rounded-xl px-3.5 py-2 text-[14px] font-semibold text-white ${r.rotulo === 'Sim' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-500 hover:bg-red-600'}`}
                onClick={() => irPara(r.para)}
                title={r.consequencia}
              >
                {r.rotulo}
              </button>
            ))
          ) : (
            <button
              type="button"
              className="flex-1 rounded-xl bg-[#0E4429] px-3.5 py-2 text-[14px] font-semibold text-white hover:bg-[#14532D]"
              onClick={proximo}
            >
              Próximo →
            </button>
          )}
        </div>
        {noGateway ? (
          <div className="mt-1.5 text-[12px] text-gray-500">
            Este é um ponto de decisão: escolha um caminho para revelar a próxima etapa.
          </div>
        ) : null}
      </div>
    </div>
  )
}
