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
    borderRadius: 8,
  })
  const retorno = data?.tipo === 'retorno'
  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          stroke: retorno ? '#E53935' : '#212121',
          strokeWidth: 2,
          strokeDasharray: retorno ? '7 5' : undefined,
          ...style,
        }}
      />
      {label ? (
        <EdgeLabelRenderer>
          <div
            className="absolute rounded bg-white/90 px-1 text-[12px] font-medium pointer-events-none"
            style={{
              transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
              color: retorno ? '#C62828' : '#212121',
            }}
          >
            {label as string}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  )
}
