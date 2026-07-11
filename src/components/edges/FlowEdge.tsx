import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react'
import type { EdgeProps } from '@xyflow/react'

export function FlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  data,
  markerEnd,
  style,
}: EdgeProps) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 14,
  })
  const retorno = data?.tipo === 'retorno'
  const sim = label === 'Sim'
  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          stroke: retorno ? '#E24A4A' : '#44534C',
          strokeWidth: 2.5,
          strokeDasharray: retorno ? '7 5' : undefined,
          ...style,
        }}
      />
      {label ? (
        <EdgeLabelRenderer>
          <div
            className={`absolute rounded-full border px-2.5 py-0.5 text-[13px] font-bold pointer-events-none ${sim ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-red-50 border-red-300 text-red-700'}`}
            style={{ transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`, opacity: (style as React.CSSProperties)?.opacity }}
          >
            {label as string}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  )
}
