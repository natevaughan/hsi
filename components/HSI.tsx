import * as React from "react";
import { FC } from "react";
import HeadingIndicator from "./HeadingIndicator";
import VOR from "./VOR";
import MiniatureAirplane from "./MiniatureAirplane";

interface HSIProps {
  size: number
  bearing: number
  heading: number
  deviation: number
  from: boolean
  controlOrientation: number
  onCourseDecrement: () => void
  onCourseIncrement: () => void
}

const HSI: FC<HSIProps> = (props: HSIProps) => {
  const color1 = "#abcdef"
  const color2 = "#fedcba"
  const color3 = "#FFAA00"
  const bgColor = "#111827"
  const ctrlColor = "#666666"
  const totalSize = props.size || 500
  const margin = totalSize * .05
  const size = totalSize - (margin * 2)
  const radius = size / 2
  const controlSize = totalSize * .125

  return (
    <svg height={totalSize} width={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} style={{backgroundColor: bgColor}}>
      <g transform={`translate(${margin}, ${margin})`}>
        {/* everything in here is rotated and translated to center */}
        <g transform={`translate(${radius}, ${radius})`}>
          <g transform={`rotate(${-props.heading})`}>
            <HeadingIndicator radius={radius} circleColor={color1} tickColor={color2} size={totalSize} />
            <VOR size={size} color={color3} fromIndicatorColor={color2} bearing={props.bearing} from={props.from} deviation={props.deviation} dotCount={5} bgColor={bgColor} />
          </g>
          <MiniatureAirplane size={size} color={color1} />
        </g>
      </g>
      {/* top indicator */}
      <path
        transform={`translate(${totalSize / 2}, 0), scale(${margin / 20} ${margin / 20})`}
        fill={color1}
        d="m 1 20 l -2 0 l 0 -9 l -12 -11 l 26 0 l -12 11 z"
      />
      {/*course control*/}
      <g transform={`translate(${controlSize / 2 + margin / 2}, ${totalSize - controlSize / 2 - margin / 2})`}>
        <g transform={`rotate(${props.controlOrientation})`}>
          <circle r={controlSize / 2} fill={ctrlColor} stroke={ctrlColor} strokeWidth={controlSize / 12} strokeDasharray={controlSize / Math.PI / 2} />
          <circle r={controlSize / 2 * .875} fill="none" stroke={color3} strokeWidth={controlSize / 20} />
          <path transform={`scale(${controlSize * .05}, ${controlSize * .05})`} fill="none" strokeWidth="1" stroke={color3} d="m 0 -5 l 0 10 m -1 -3 l 1 3 l 1 -3" />
        </g>
        <g style={{cursor: "pointer"}} onClick={props.onCourseDecrement} transform={`translate(${-controlSize / 2}, 0)`}>
          <rect fill="transparent" height={controlSize} width={controlSize / 2} y={-controlSize / 2} x={-controlSize / 4} />
          <path fill="none" strokeWidth="0.75" stroke={color1} transform={`translate(${-controlSize / 20}, 0), scale(${controlSize * .05}, ${controlSize * .05})`} d="m 0 -6 q -4 6 0 12 m -2.5 -1.5 l 2.7 2 l 0 -3.6" />
        </g>
        <g style={{cursor: "pointer"}} onClick={props.onCourseIncrement} transform={`translate(${controlSize / 2}, 0)`}>
          <rect fill="transparent" height={controlSize} width={controlSize / 2} y={-controlSize / 2} x={-controlSize / 4} />
          <path fill="none" strokeWidth="0.75" stroke={color1} transform={`translate(${controlSize / 20}, 0), scale(${controlSize * .05}, ${controlSize * .05})`} d="m 0 -6 q 4 6 0 12 m 2.5 -1.5 l -2.7 2 l 0 -3.6" />
        </g>
      </g>

    </svg>
  );
}

export default React.memo(HSI);
