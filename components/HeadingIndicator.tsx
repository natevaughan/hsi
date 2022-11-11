import { FC } from "react";
import * as React from "react";


interface HeadingIndicatorProps {
  radius: number
  circleColor: string
  tickColor: string
  size: number
}

const HeadingIndicator: FC<HeadingIndicatorProps> = (props: HeadingIndicatorProps) => {


  const fontSize = props.size * .05
  const barHeight = props.size * .05
  const barWidth = props.size * .01

  const bigBars = new Array(36).fill(0).map((it: any, idx: number) => { return idx * 10 })

  const labels = {
    0: "N",
    30: "3",
    60: "6",
    90: "E",
    120: "12",
    150: "15",
    180: "S",
    210: "21",
    240: "24",
    270: "W",
    300: "30",
    330: "33"
  }

  return (
    <g>
      <circle r={props.radius} stroke={props.circleColor} fill="none" />
      {bigBars.map(it => {
        return (
          <g key={"bar" + (it)} transform={`rotate(${it})`}>
            <g transform={`translate(0,-${props.radius})`}>
              <rect width={barWidth} height={barHeight} x={-barWidth / 2} stroke="none" fill={props.tickColor} />
              {labels[it] && (
                <text fill={props.circleColor} textAnchor="middle" y={barHeight * 2} fontSize={fontSize}>{labels[it]}</text>
              )}
            </g>
          </g>
        )
      })}
      {bigBars.map(it => {
        return (
          <g key={"bar" + (it + 5)} transform={`rotate(${it + 5})`}>
            <rect width={barWidth} height={barHeight / 2} x={-barWidth / 2} transform={`translate(0,-${props.radius})`} stroke="none" fill={props.tickColor} />
          </g>
        )
      })}
    </g>
  )
}

export default HeadingIndicator;
