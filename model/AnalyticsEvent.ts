import AnalyticsContext from "./AnalyticsContext";

export default interface AnalyticsEvent {
  event: string
  properties?: any
  context?: AnalyticsContext
}
