import flow from '../data/flow.json'
import type { FlowData } from '../types'
import { RAIA_VISUAL } from '../lib/raias'
import { useAppStore } from '../store'

const data = flow as FlowData

export function LaneFilter() {
  const laneFilter = useAppStore((s) => s.laneFilter)
  const setLaneFilter = useAppStore((s) => s.setLaneFilter)

  return (
    <div className="relative flex gap-2 overflow-x-auto px-4 pb-3 pt-0.5 [scrollbar-width:none] md:px-6">
      <button
        type="button"
        className={`inline-flex h-8 shrink-0 items-center rounded-full px-3.5 text-[12px] font-semibold transition-all ${
          laneFilter === null
            ? 'bg-white text-emerald-950 shadow-sm'
            : 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15'
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
            className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[12px] font-semibold transition-all ${
              ativa ? 'text-white shadow-sm' : 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15'
            }`}
            style={ativa ? { background: v.cor } : undefined}
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
