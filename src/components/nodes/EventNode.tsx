import type { NodeProps } from '@xyflow/react'
import { NodeHandles } from './NodeHandles'

export function EventNode({ data, selected }: NodeProps) {
  const inicio = data.tipo === 'evento_inicio'
  return (
    <div className="relative w-[44px] h-[44px] cursor-pointer">
      <NodeHandles />
      <div
        className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] font-semibold text-gray-800"
      >
        {data.rotulo as string}
      </div>
      <div
        className={`w-full h-full rounded-full border-2 ${selected ? 'ring-4 ring-green-200' : ''}`}
        style={{
          background: inicio ? '#AED581' : '#EF9A9A',
          borderColor: inicio ? '#558B2F' : '#C62828',
        }}
      />
    </div>
  )
}
