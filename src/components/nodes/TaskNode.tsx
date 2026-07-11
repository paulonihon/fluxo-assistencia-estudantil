import type { NodeProps } from '@xyflow/react'
import { NodeHandles } from './NodeHandles'
import { RAIA_VISUAL } from '../../lib/raias'

export function TaskNode({ data, selected }: NodeProps) {
  const visual = RAIA_VISUAL[data.raia as string]
  return (
    <div
      className={`w-[200px] min-h-[72px] flex flex-col justify-center rounded-2xl bg-white px-3.5 py-2.5 text-left cursor-pointer transition-shadow ${selected ? 'shadow-lg' : 'shadow-[0_1px_4px_rgba(15,40,30,0.10)]'}`}
      style={{
        border: `1.5px solid ${selected ? visual.cor : '#E2E8E5'}`,
        boxShadow: selected ? `0 0 0 4px ${visual.corSuave}, 0 8px 20px rgba(15,40,30,0.14)` : undefined,
      }}
    >
      <NodeHandles />
      <div className="mb-1 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ background: visual.cor }} />
        <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: visual.corTexto }}>
          {visual.nome}
        </span>
      </div>
      <div className="text-[13.5px] font-semibold leading-snug text-[#1C2B24]">{data.rotulo as string}</div>
    </div>
  )
}
