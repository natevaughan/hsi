import AnalyticsContext from "./AnalyticsContext";

export default interface AnalyticsPage {
  name: string
  properties?: any
  context?: AnalyticsContext
}
