import * as React from "react";
import { FC } from "react";

interface MiniatureAirplaneProps {
  size: number
  color: string
}

const MiniatureAirplane: FC<MiniatureAirplaneProps> = (props: MiniatureAirplaneProps) => {

  const aircraftScale = props.size * .0125
  const barWidth = props.size * .01

  return (
    <path
      transform={`scale(${aircraftScale} ${aircraftScale})`}
      stroke={props.color}
      fill="none"
      strokeWidth={barWidth / 6}
      d="m 0 -13 c 2 1 2 2 2 5 l 0 4 l 11 5 l 0 3 l -11 -2 l 0 5 l 3 2 l 0 2 l -10 0 l 0 -2 l 3 -2 l 0 -5 l -11 2 l 0 -3 l 11 -5 l 0 -4 c 0 -3 0 -4 2 -5 z"
    />
  )
}

export default MiniatureAirplane;
