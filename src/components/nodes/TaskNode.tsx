import type { NodeProps } from '@xyflow/react'
import { NodeHandles } from './NodeHandles'

export function TaskNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`w-[190px] min-h-[64px] flex items-center justify-center rounded-xl border-2 px-3 py-2 text-center text-[13px] leading-snug cursor-pointer ${selected ? 'ring-4 ring-blue-300' : ''}`}
      style={{ background: '#E8EAF6', borderColor: '#1565C0', color: '#1A237E' }}
    >
      <NodeHandles />
      {data.rotulo as string}
    </div>
  )
}
