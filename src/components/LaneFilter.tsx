import flow from '../data/flow.json'
import type { FlowData } from '../types'
import { RAIA_VISUAL } from '../lib/raias'
import { useAppStore } from '../store'

const data = flow as FlowData

export function LaneFilter() {
  const laneFilter = useAppStore((s) => s.laneFilter)
  const setLaneFilter = useAppStore((s) => s.setLaneFilter)

  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-3 pt-0.5 [scrollbar-width:none] md:px-6">
      <button
        type="button"
        className={`inline-flex h-8 shrink-0 items-center rounded-full px-3.5 text-[12px] font-semibold transition-all ${
          laneFilter === null
            ? 'bg-gradient-to-b from-emerald-800 to-emerald-950 text-white shadow-sm ring-1 ring-emerald-950/30'
            : 'bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300'
        }`}
        onClick={() => setLaneFilter(null)}
      >
        Todos os atores
      </button>
      {data.raias.map((r) => {
        const v = RAIA_VISUAL[r.id]
        const ativa = laneFilter === r.id
        return (
          <button
            key={r.id}
            type="button"
            className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[12px] font-semibold shadow-sm ring-1 transition-all"
            style={{
              background: ativa ? v.cor : '#FFFFFF',
              color: ativa ? '#FFFFFF' : v.corTexto,
              // ring via boxShadow para poder usar a cor do ator
              boxShadow: ativa
                ? `inset 0 0 0 1px ${v.cor}, 0 1px 2px rgba(0,0,0,0.06)`
                : 'inset 0 0 0 1px #E5E7EB, 0 1px 2px rgba(0,0,0,0.04)',
            }}
            onClick={() => setLaneFilter(ativa ? null : r.id)}
            title={r.nome}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: ativa ? '#FFFFFF' : v.cor }} />
            {v.nome}
          </button>
        )
      })}
    </div>
  )
}
