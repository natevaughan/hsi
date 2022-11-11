import AnalyticsEvent from "../../model/AnalyticsEvent";

export default function (event: AnalyticsEvent): Promise<void> {
  return fetch("/api/t", {
    method: "POST",
    body: JSON.stringify(event)
  }).then(_ => {}).catch(_ => {})
}

