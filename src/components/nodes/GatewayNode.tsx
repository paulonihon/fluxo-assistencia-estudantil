import type { NodeProps } from '@xyflow/react'
import { NodeHandles } from './NodeHandles'

export function GatewayNode({ data, selected }: NodeProps) {
  return (
    <div className="relative h-[72px] w-[72px] cursor-pointer">
      <NodeHandles />
      <div
        className="absolute inset-[10px] rotate-45 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 transition-shadow"
        style={{
          boxShadow: selected
            ? 'inset 0 0 0 1.5px #B45309, 0 0 0 4px #FEF3C7, 0 12px 28px rgba(120,80,0,0.22)'
            : 'inset 0 0 0 1.5px #D97706, 0 2px 6px rgba(120,80,0,0.15)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-[20px] font-bold text-amber-800">?</div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 shadow-sm ring-1 ring-amber-200">
        {data.rotulo as string}
      </div>
    </div>
  )
}
