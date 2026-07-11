import { Handle, Position } from '@xyflow/react'

const lados = [
  { pos: Position.Top, id: 'top' },
  { pos: Position.Right, id: 'right' },
  { pos: Position.Bottom, id: 'bottom' },
  { pos: Position.Left, id: 'left' },
]

export function NodeHandles() {
  return (
    <>
      {lados.map((l) => (
        <Handle key={l.id} id={l.id} type="source" position={l.pos} className="!opacity-0 !w-1.5 !h-1.5 !min-w-0 !min-h-0 !border-0 !pointer-events-none" />
      ))}
      {lados.map((l) => (
        <Handle key={`t-${l.id}`} id={`t-${l.id}`} type="target" position={l.pos} className="!opacity-0 !w-1.5 !h-1.5 !min-w-0 !min-h-0 !border-0 !pointer-events-none" />
      ))}
    </>
  )
}
