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
    <header className="relative overflow-hidden bg-gradient-to-r from-[#0A2E22] via-[#14503C] to-[#0F3D2E]">
      <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -top-24 right-32 h-48 w-48 rounded-full bg-white/[0.04] blur-xl" />
      <div className="relative flex h-16 items-center gap-2 px-4 md:gap-3 md:px-6">
        <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white font-display text-[14px] font-bold text-emerald-950 shadow-md shadow-black/20 md:flex">
          AE
        </span>
        <h1 className="min-w-0 flex-1 truncate font-display text-[15px] font-semibold tracking-tight text-white md:text-[17px]">
          Fluxo da Política de Assistência Estudantil
        </h1>
        <button
          type="button"
          className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-4 text-[13px] font-semibold transition-all ${
            tourAtivo
              ? 'bg-white/10 text-white/40'
              : 'bg-white text-emerald-950 shadow-md shadow-black/20 hover:brightness-95'
          }`}
          onClick={() => setTour({ ativo: true, atual: 'inicio', historico: [] })}
          disabled={tourAtivo}
        >
          ▶<span className="hidden lg:inline"> Percorrer o fluxo</span>
          <span className="lg:hidden"> Percorrer</span>
        </button>
        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center rounded-xl bg-white/10 px-4 text-[13px] font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/15"
          onClick={() => setGlossarioAberto(true)}
        >
          Glossário
        </button>
        <Link
          to="/sobre"
          className="inline-flex h-10 shrink-0 items-center rounded-xl bg-white/10 px-4 text-[13px] font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/15"
        >
          Sobre
        </Link>
        <button
          type="button"
          title="Ver o fluxograma completo em tela cheia"
          aria-label="Tela cheia"
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[15px] text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/15 md:inline-flex"
          onClick={telaCheia}
        >
          ⛶
        </button>
      </div>
      <LaneFilter />
    </header>
  )
}
