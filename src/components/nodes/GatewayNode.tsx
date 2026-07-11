import type { NodeProps } from '@xyflow/react'
import { NodeHandles } from './NodeHandles'

export function GatewayNode({ data, selected }: NodeProps) {
  return (
    <div className="relative w-[72px] h-[72px] cursor-pointer">
      <NodeHandles />
      <div
        className={`absolute inset-[10px] rotate-45 rounded-lg border-2 bg-amber-100 transition-shadow ${selected ? 'shadow-lg' : 'shadow-sm'}`}
        style={{
          borderColor: '#D97706',
          boxShadow: selected ? '0 0 0 4px #FEF3C7, 0 8px 20px rgba(120,80,0,0.18)' : undefined,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-[20px] font-bold text-amber-700">?</div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
        {data.rotulo as string}
      </div>
    </div>
  )
}
