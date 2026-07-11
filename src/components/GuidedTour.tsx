import { useCallback, useEffect } from 'react'
import { useReactFlow } from '@xyflow/react'
import flow from '../data/flow.json'
import type { FlowData } from '../types'
import { NODE_SIZE } from '../lib/flowModel'
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
      setCenter(c.x, c.y, { zoom: mobile ? 1.3 : 1.1, duration: 600 })
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
      <div className="pointer-events-auto m-3 w-full max-w-[560px] rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">
              Trilha guiada · passo {passo}
            </div>
            <div className="truncate text-[14px] font-semibold text-gray-900">{atual.rotulo}</div>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full px-2.5 py-1 text-[12px] font-medium text-gray-500 hover:bg-gray-100"
            onClick={sair}
          >
            Sair
          </button>
        </div>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-[13px] font-medium text-gray-700 disabled:opacity-40"
            onClick={anterior}
            disabled={tour.historico.length === 0}
          >
            ← Anterior
          </button>
          {fim ? (
            <button
              type="button"
              className="flex-1 rounded-lg bg-emerald-700 px-3 py-1.5 text-[13px] font-semibold text-white"
              onClick={recomecar}
            >
              Recomeçar
            </button>
          ) : noGateway ? (
            atual.ramificacoes?.map((r) => (
              <button
                key={r.rotulo}
                type="button"
                className={`flex-1 rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white ${r.rotulo === 'Sim' ? 'bg-emerald-600' : 'bg-red-600'}`}
                onClick={() => irPara(r.para)}
                title={r.consequencia}
              >
                {r.rotulo}
              </button>
            ))
          ) : (
            <button
              type="button"
              className="flex-1 rounded-lg bg-gray-900 px-3 py-1.5 text-[13px] font-semibold text-white"
              onClick={proximo}
            >
              Próximo →
            </button>
          )}
        </div>
        {noGateway ? (
          <div className="mt-1.5 text-[12px] text-gray-500">Escolha um caminho para continuar.</div>
        ) : null}
      </div>
    </div>
  )
}
