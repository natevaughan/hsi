import type { NextPage } from "next";
import Head from "next/head";
import sendAnalyticsPage from "../lib/api/sendAnalyticsPage";
import { useEffect, useState } from "react";
import HSI from "../components/HSI";


function getHeadingInfo(trueBearing: number, updatedBearing: number, updatedDeviation: number, updatedFrom: boolean) {
  return "true bearing " + trueBearing + (updatedFrom ? " from the VORTAC" : " to the vortac") + ": indicated bearing " + updatedBearing +  ", deviation " + updatedDeviation
}

const Landing: NextPage = () => {
  const [heading, setHeading] = useState(0)
  const [bearing, setBearing] = useState(45)
  const [deviation, setDeviation] = useState(5)
  const [from, setFrom] = useState(true)
  const [revealed, setRevealed] = useState(true)
  const [answer, setAnswer] = useState("northeast")

  const [deviationAdjustment, setDeviationAdjustment] = useState(0)
  const [controlOrientation, setControlOrientation] = useState(135)

  function decrementCourse() {
    setControlOrientation(controlOrientation - 15)
    setDeviationAdjustment(deviationAdjustment - 1)
    setBearing(bearing - 1)
  }
  function incrementCourse() {
    setControlOrientation(controlOrientation + 15)
    setDeviationAdjustment(deviationAdjustment + 1)
    setBearing(bearing + 1)
  }

  useEffect(() => {
    sendAnalyticsPage({
      name: "HSI Home"
    })
  }, [])

  function generate() {
    const updatedHeading = Math.round(Math.random() * 360)
    const updatedBearing = Math.round(Math.random() * 360)
    const updatedFrom = Math.random() > 0.5
    const updatedDeviation = Math.round(Math.random() * 18 - 9)
    const cardinalHeadingErrorMargin = 5
    console.log("VOR should be pointed to " + updatedBearing)
    setHeading(updatedHeading)
    setBearing(updatedBearing)
    setFrom(updatedFrom)
    setDeviation(updatedDeviation)
    setRevealed(false)
    setDeviationAdjustment(0)
    const trueBearing = (updatedBearing + (updatedFrom ? 0 : 180) + updatedDeviation) % 360

    if (trueBearing < cardinalHeadingErrorMargin || trueBearing > 360 - cardinalHeadingErrorMargin) {
      setAnswer(`north (${getHeadingInfo(trueBearing, updatedBearing, updatedDeviation, updatedFrom)})`)
    } else if (trueBearing >= cardinalHeadingErrorMargin && trueBearing <= 90 - cardinalHeadingErrorMargin) {
      setAnswer(`northeast (${getHeadingInfo(trueBearing, updatedBearing, updatedDeviation, updatedFrom)})`)
    } else if (trueBearing > 90 - cardinalHeadingErrorMargin && trueBearing < 90 + cardinalHeadingErrorMargin) {
      setAnswer(`east (${getHeadingInfo(trueBearing, updatedBearing, updatedDeviation, updatedFrom)})`)
    } else if (trueBearing >= 90 + cardinalHeadingErrorMargin && trueBearing <= 180 - cardinalHeadingErrorMargin) {
      setAnswer(`southeast (${getHeadingInfo(trueBearing, updatedBearing, updatedDeviation, updatedFrom)})`)
    } else if (trueBearing > 180 - cardinalHeadingErrorMargin && trueBearing < 180 + cardinalHeadingErrorMargin) {
      setAnswer(`south (${getHeadingInfo(trueBearing, updatedBearing, updatedDeviation, updatedFrom)})`)
    } else if (trueBearing >= 180 + cardinalHeadingErrorMargin && trueBearing <= 270 - cardinalHeadingErrorMargin) {
      setAnswer(`southwest (${getHeadingInfo(trueBearing, updatedBearing, updatedDeviation, updatedFrom)})`)
    } else if (trueBearing > 270 - cardinalHeadingErrorMargin && trueBearing < 270 + cardinalHeadingErrorMargin) {
      setAnswer(`west (${getHeadingInfo(trueBearing, updatedBearing, updatedDeviation, updatedFrom)})`)
    } else {
      setAnswer(`northwest (${getHeadingInfo(trueBearing, updatedBearing, updatedDeviation, updatedFrom)})`)
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen py-4">
      <Head>
        <title>HSI Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center">
        <div className="text-4xl my-2 text-white">
          HSI quiz
        </div>
        <HSI
          heading={heading}
          bearing={bearing}
          from={from}
          size={400}
          deviation={deviation - deviationAdjustment * (from ? 1 : -1)}
          onCourseIncrement={incrementCourse}
          onCourseDecrement={decrementCourse}
          controlOrientation={controlOrientation}
        />
        <div className="text-3xl mb-2 text-white">
          In which general direction from the VORTAC is the aircraft located?
        </div>
          <div className="py-6 text-xl italic text-white">
            {revealed && (answer)}&nbsp;
          </div>
        <div className="flex flex-row  text-white">
          <button className={`text-xl px-6 mx-2 py-3 border-2 border-gray-400 rounded-md ${revealed ? 'bg-gray-600 text-gray-400 disabled pointer-events-none' : 'cursor-pointer'}`} onClick={() => {setRevealed(true)}}>Reveal answer</button>
          <button className="cursor-pointer mx-2 text-xl px-6 py-3 border-2 border-gray-400 rounded-md" onClick={generate}>New problem</button>
        </div>
      </main>
    </div>
  )
}

export default Landing
