import type { NodeProps } from '@xyflow/react'
import { NodeHandles } from './NodeHandles'
import { RAIA_VISUAL } from '../../lib/raias'

export function TaskNode({ data, selected }: NodeProps) {
  const visual = RAIA_VISUAL[data.raia as string]
  return (
    <div
      className="flex min-h-[72px] w-[200px] cursor-pointer flex-col justify-center rounded-2xl bg-gradient-to-b from-white to-[#FBFCFB] px-4 py-3 text-left transition-shadow"
      style={{
        boxShadow: selected
          ? `inset 0 0 0 1.5px ${visual.cor}, 0 0 0 4px ${visual.corSuave}, 0 12px 28px rgba(15,40,30,0.16)`
          : 'inset 0 0 0 1px #E4E9E6, 0 1px 2px rgba(15,40,30,0.05), 0 4px 12px rgba(15,40,30,0.06)',
      }}
    >
      <NodeHandles />
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ background: visual.cor }} />
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: visual.corTexto }}>
          {visual.nome}
        </span>
      </div>
      <div className="text-[13.5px] font-semibold leading-snug text-[#14201A]">{data.rotulo as string}</div>
    </div>
  )
}
