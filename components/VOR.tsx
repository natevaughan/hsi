import * as React from "react";
import { FC } from "react";

interface VORProps {
  size: number
  color: string
  fromIndicatorColor: string
  bgColor: string
  bearing: number
  from: boolean
  deviation: number
  dotCount: number
}


const VOR: FC<VORProps> = (props: VORProps) => {

  const barWidth = props.size * .01
  const radius = props.size / 2
  const dotOffset = radius / props.dotCount
  const deviationIndicatorSize = radius * .6
  const deviationLineSize = radius - deviationIndicatorSize / 2
  const deviationIndicatorGap = radius * .02
  const dotStart = (props.dotCount - 1) / 2 * dotOffset * -1

  const dots = new Array(props.dotCount).fill(0).map((it: any, idx: number) => { return idx * dotOffset + dotStart })

  return (
    <g transform={`rotate(${props.bearing})`}>
      <path
        transform={`translate(0, ${deviationIndicatorSize * .6 * (props.from ? 1 : -1) }), scale(${dotOffset/4} ${dotOffset/4})${(props.from ?  ', rotate(180)' : '')}`}
        fill={props.fromIndicatorColor}
        d="M -4 0 L 0 -4 L 4 0 ZZ"
      />
      <rect width={barWidth} x={-barWidth/2 + (-props.deviation * dotOffset / 5) } y={-deviationIndicatorSize / 2} height={deviationIndicatorSize} stroke="none" fill={props.color} />
      <rect width={barWidth} x={-barWidth/2} y={-deviationIndicatorSize / 2 - deviationLineSize} height={deviationLineSize - deviationIndicatorGap} stroke="none" fill={props.color} />
      <rect width={barWidth} x={-barWidth/2} y={deviationIndicatorSize / 2  + deviationIndicatorGap} height={deviationLineSize - deviationIndicatorGap} stroke="none" fill={props.color} />
      <path
        transform={`translate(0, -${deviationIndicatorSize}), scale(${barWidth} ${barWidth})`}
        stroke={props.color}
        strokeWidth={barWidth / 4}
        fill={props.bgColor}
        d="m 0 -6 l 2 6 l -4 0 z"
      />

      {dots.map(it => {
        return <circle r={barWidth} cx={it} fill={props.color} />
      })}
    </g>
  )
}

export default VOR;
