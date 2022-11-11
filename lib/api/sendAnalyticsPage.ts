import AnalyticsPage from "../../model/AnalyticsPage";

export default function (page: AnalyticsPage): Promise<void> {
  return fetch("/api/p", {
    method: "POST",
    body: JSON.stringify(page)
  }).then(_ => {}).catch(_ => {})
}

