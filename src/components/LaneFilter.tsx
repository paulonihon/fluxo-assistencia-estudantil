import flow from '../data/flow.json'
import type { FlowData } from '../types'
import { useAppStore } from '../store'

const data = flow as FlowData

const nomesCurtos: Record<string, string> = {
  cgae: 'CGAE',
  comunicacao: 'Comunicação',
  discentes: 'Discentes',
  assistente_social: 'Assist. Social',
  financas: 'Finanças',
}

export function LaneFilter() {
  const laneFilter = useAppStore((s) => s.laneFilter)
  const setLaneFilter = useAppStore((s) => s.setLaneFilter)

  return (
    <div className="flex gap-1.5 overflow-x-auto px-3 py-1.5 [scrollbar-width:none]">
      <button
        type="button"
        className={`shrink-0 rounded-full border px-3 py-1 text-[12px] font-medium ${laneFilter === null ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 border-gray-300'}`}
        onClick={() => setLaneFilter(null)}
      >
        Todas
      </button>
      {data.raias.map((r) => (
        <button
          key={r.id}
          type="button"
          className={`shrink-0 rounded-full border px-3 py-1 text-[12px] font-medium ${laneFilter === r.id ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-gray-700 border-gray-300'}`}
          onClick={() => setLaneFilter(laneFilter === r.id ? null : r.id)}
          title={r.nome}
        >
          {nomesCurtos[r.id] ?? r.nome}
        </button>
      ))}
    </div>
  )
}
