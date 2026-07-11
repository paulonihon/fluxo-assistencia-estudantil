import type { NodeProps } from '@xyflow/react'
import { NodeHandles } from './NodeHandles'

export function GatewayNode({ data, selected }: NodeProps) {
  return (
    <div className="relative w-[64px] h-[64px] cursor-pointer">
      <NodeHandles />
      <div
        className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] font-semibold"
        style={{ color: '#5D4037' }}
      >
        {data.rotulo as string}
      </div>
      <div
        className={`absolute inset-[8px] rotate-45 border-2 ${selected ? 'ring-4 ring-amber-300' : ''}`}
        style={{ background: '#FFEB3B', borderColor: '#B8860B' }}
      />
    </div>
  )
}
