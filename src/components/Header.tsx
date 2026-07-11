import { useReactFlow } from '@xyflow/react'
import { useAppStore } from '../store'
import { LaneFilter } from './LaneFilter'

export function Header() {
  const setTour = useAppStore((s) => s.setTour)
  const setGlossarioAberto = useAppStore((s) => s.setGlossarioAberto)
  const tourAtivo = useAppStore((s) => s.tour.ativo)
  const { fitView } = useReactFlow()

  const telaCheia = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {})
    }
    setTimeout(() => fitView({ padding: 0.04, duration: 700 }), 150)
  }

  return (
    <header className="border-b border-[#E2E8E5] bg-white">
      <div className="flex h-[58px] items-center gap-2 px-3 md:px-4">
        <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0E4429] font-display text-[15px] font-bold text-white md:flex">
          AE
        </span>
        <h1 className="min-w-0 flex-1 truncate font-display text-[15px] md:text-[17px] font-semibold text-[#1C2B24]">
          Fluxo da Política de Assistência Estudantil
        </h1>
        <button
          type="button"
          className={`shrink-0 rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-colors ${tourAtivo ? 'bg-gray-100 text-gray-400' : 'bg-[#0E4429] text-white hover:bg-[#14532D]'}`}
          onClick={() => setTour({ ativo: true, atual: 'inicio', historico: [] })}
          disabled={tourAtivo}
        >
          <span className="md:hidden">▶ Percorrer</span>
          <span className="hidden md:inline">▶ Percorrer o fluxo</span>
        </button>
        <button
          type="button"
          className="shrink-0 rounded-xl border border-gray-300 px-3.5 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50"
          onClick={() => setGlossarioAberto(true)}
        >
          Glossário
        </button>
        <button
          type="button"
          title="Ver o fluxograma completo em tela cheia"
          className="shrink-0 rounded-xl border border-gray-300 px-3 py-2 text-[15px] font-semibold text-gray-700 hover:bg-gray-50"
          onClick={telaCheia}
        >
          ⛶
        </button>
      </div>
      <LaneFilter />
    </header>
  )
}
