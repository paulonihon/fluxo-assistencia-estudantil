import type { NodeProps } from '@xyflow/react'
import { CANVAS_WIDTH } from '../../lib/flowModel'
import { RAIA_VISUAL } from '../../lib/raias'
import { useAppStore } from '../../store'

export function LaneBackground({ data }: NodeProps) {
  const setLaneFilter = useAppStore((s) => s.setLaneFilter)
  const laneFilter = useAppStore((s) => s.laneFilter)
  const height = data.height as number
  const index = data.index as number
  const raiaId = data.raiaId as string
  const visual = RAIA_VISUAL[raiaId]
  const ativa = laneFilter === raiaId
  return (
    <div
      className="relative"
      style={{
        width: CANVAS_WIDTH + 90,
        height,
        background: index % 2 === 0 ? '#FFFFFF' : '#FAFAF8',
        borderBottom: '1px dashed #E2E8E5',
      }}
    >
      <button
        type="button"
        className="pointer-events-auto absolute left-3 top-3 flex items-center gap-2 rounded-full border px-4 py-1.5 text-[16px] font-bold shadow-sm transition-colors"
        style={{
          background: ativa ? visual.cor : '#FFFFFF',
          borderColor: ativa ? visual.cor : '#E2E8E5',
          color: ativa ? '#FFFFFF' : visual.corTexto,
        }}
        onClick={(e) => {
          e.stopPropagation()
          setLaneFilter(ativa ? null : raiaId)
        }}
        title={data.nome as string}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: ativa ? '#FFFFFF' : visual.cor }} />
        {visual.nome}
      </button>
    </div>
  )
}
