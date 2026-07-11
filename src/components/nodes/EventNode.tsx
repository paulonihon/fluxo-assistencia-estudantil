import type { NodeProps } from '@xyflow/react'
import { NodeHandles } from './NodeHandles'

export function EventNode({ data, selected }: NodeProps) {
  const inicio = data.tipo === 'evento_inicio'
  return (
    <div className="relative w-[48px] h-[48px] cursor-pointer">
      <NodeHandles />
      <div
        className={`flex h-full w-full items-center justify-center rounded-full text-[16px] font-bold text-white transition-shadow ${selected ? 'shadow-lg' : 'shadow-sm'}`}
        style={{
          background: inicio ? '#059669' : '#DC2626',
          boxShadow: selected ? `0 0 0 4px ${inicio ? '#D1FAE5' : '#FEE2E2'}` : undefined,
        }}
      >
        {inicio ? '▶' : '■'}
      </div>
      <div
        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold ${inicio ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}
      >
        {data.rotulo as string}
      </div>
    </div>
  )
}
