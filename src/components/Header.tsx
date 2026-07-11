import { useAppStore } from '../store'
import { LaneFilter } from './LaneFilter'

export function Header() {
  const setTour = useAppStore((s) => s.setTour)
  const setGlossarioAberto = useAppStore((s) => s.setGlossarioAberto)
  const tourAtivo = useAppStore((s) => s.tour.ativo)

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-[56px] items-center gap-2 px-3">
        <h1 className="min-w-0 flex-1 truncate text-[15px] md:text-[17px] font-bold text-gray-900">
          Fluxo da Política de Assistência Estudantil
        </h1>
        <button
          type="button"
          className={`shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-semibold ${tourAtivo ? 'bg-gray-200 text-gray-600' : 'bg-emerald-700 text-white'}`}
          onClick={() => setTour({ ativo: true, atual: 'inicio', historico: [] })}
          disabled={tourAtivo}
        >
          <span className="md:hidden">▶</span>
          <span className="hidden md:inline">Trilha guiada</span>
        </button>
        <button
          type="button"
          className="shrink-0 rounded-lg border border-gray-300 px-3 py-1.5 text-[13px] font-semibold text-gray-700"
          onClick={() => setGlossarioAberto(true)}
        >
          <span className="md:hidden">📖</span>
          <span className="hidden md:inline">Glossário</span>
        </button>
      </div>
      <LaneFilter />
    </header>
  )
}
