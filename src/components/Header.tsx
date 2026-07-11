import { Link } from 'react-router-dom'
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
    <header className="border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center gap-2 px-4 md:gap-3 md:px-6">
        <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-950 font-display text-[14px] font-bold text-white shadow-sm ring-1 ring-emerald-900/20 md:flex">
          AE
        </span>
        <h1 className="min-w-0 flex-1 truncate font-display text-[15px] font-semibold tracking-tight text-[#14201A] md:text-[17px]">
          Fluxo da Política de Assistência Estudantil
        </h1>
        <button
          type="button"
          className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-4 text-[13px] font-semibold transition-all ${
            tourAtivo
              ? 'bg-gray-100 text-gray-400'
              : 'bg-gradient-to-b from-emerald-800 to-emerald-950 text-white shadow-md shadow-emerald-900/20 ring-1 ring-emerald-950/30 hover:shadow-lg hover:brightness-110'
          }`}
          onClick={() => setTour({ ativo: true, atual: 'inicio', historico: [] })}
          disabled={tourAtivo}
        >
          ▶<span className="hidden lg:inline"> Percorrer o fluxo</span>
          <span className="lg:hidden"> Percorrer</span>
        </button>
        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center rounded-xl bg-white px-4 text-[13px] font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50 hover:ring-gray-300"
          onClick={() => setGlossarioAberto(true)}
        >
          Glossário
        </button>
        <Link
          to="/sobre"
          className="inline-flex h-10 shrink-0 items-center rounded-xl bg-white px-4 text-[13px] font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50 hover:ring-gray-300"
        >
          Sobre
        </Link>
        <button
          type="button"
          title="Ver o fluxograma completo em tela cheia"
          aria-label="Tela cheia"
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[15px] text-gray-600 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50 hover:ring-gray-300 md:inline-flex"
          onClick={telaCheia}
        >
          ⛶
        </button>
      </div>
      <LaneFilter />
    </header>
  )
}
