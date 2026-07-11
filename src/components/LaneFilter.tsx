import flow from '../data/flow.json'
import type { FlowData } from '../types'
import { RAIA_VISUAL } from '../lib/raias'
import { useAppStore } from '../store'

const data = flow as FlowData

export function LaneFilter() {
  const laneFilter = useAppStore((s) => s.laneFilter)
  const setLaneFilter = useAppStore((s) => s.setLaneFilter)

  return (
    <div className="flex gap-1.5 overflow-x-auto px-3 py-2 [scrollbar-width:none] md:px-4">
      <button
        type="button"
        className={`shrink-0 rounded-full border px-3 py-1 text-[12px] font-semibold ${laneFilter === null ? 'border-[#0E4429] bg-[#0E4429] text-white' : 'border-gray-300 bg-white text-gray-600'}`}
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
            className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold transition-colors"
            style={{
              background: ativa ? v.cor : '#FFFFFF',
              borderColor: ativa ? v.cor : '#D1D5DB',
              color: ativa ? '#FFFFFF' : v.corTexto,
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
