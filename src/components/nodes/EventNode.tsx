import type { NodeProps } from '@xyflow/react'
import { NodeHandles } from './NodeHandles'

export function EventNode({ data, selected }: NodeProps) {
  const inicio = data.tipo === 'evento_inicio'
  return (
    <div className="relative h-[48px] w-[48px] cursor-pointer">
      <NodeHandles />
      <div
        className={`flex h-full w-full items-center justify-center rounded-full text-[15px] font-bold text-white transition-shadow ${
          inicio
            ? 'bg-gradient-to-br from-emerald-500 to-emerald-700'
            : 'bg-gradient-to-br from-red-500 to-red-700'
        }`}
        style={{
          boxShadow: selected
            ? `0 0 0 4px ${inicio ? '#D1FAE5' : '#FEE2E2'}, 0 8px 20px rgba(15,40,30,0.2)`
            : '0 2px 8px rgba(15,40,30,0.18)',
        }}
      >
        {inicio ? '▶' : '■'}
      </div>
      <div
        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold shadow-sm ring-1 ${
          inicio ? 'text-emerald-800 ring-emerald-200' : 'text-red-800 ring-red-200'
        }`}
      >
        {data.rotulo as string}
      </div>
    </div>
  )
}
