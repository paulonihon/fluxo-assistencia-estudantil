import type { NodeProps } from '@xyflow/react'
import { CANVAS_WIDTH } from '../../lib/flowModel'
import { useAppStore } from '../../store'

export function LaneBackground({ data }: NodeProps) {
  const setLaneFilter = useAppStore((s) => s.setLaneFilter)
  const laneFilter = useAppStore((s) => s.laneFilter)
  const height = data.height as number
  const index = data.index as number
  const raiaId = data.raiaId as string
  const ativa = laneFilter === raiaId
  return (
    <div
      className="flex"
      style={{
        width: CANVAS_WIDTH + 90,
        height,
        background: index % 2 === 0 ? '#EDF3ED' : '#F5F8F5',
        borderBottom: '1px solid #B0BEC5',
      }}
    >
      <button
        type="button"
        className="h-full w-[84px] flex items-center justify-center border-r pointer-events-auto"
        style={{ background: ativa ? '#C8DCC8' : '#E3EBE3', borderColor: '#B0BEC5' }}
        onClick={(e) => {
          e.stopPropagation()
          setLaneFilter(ativa ? null : raiaId)
        }}
        title={data.nome as string}
      >
        <span
          className="text-[11px] font-bold uppercase tracking-wide text-gray-700 text-center leading-tight"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', maxHeight: height - 16 }}
        >
          {data.nome as string}
        </span>
      </button>
    </div>
  )
}
