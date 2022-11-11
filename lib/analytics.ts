import Analytics from "analytics-node";

const dummy = { track: () => {}, identify: () => {}, alias: () => {}, page: () => {} };
const analytics = process.env.SEGMENT_WRITE_KEY ? new Analytics(process.env.SEGMENT_WRITE_KEY) : dummy;
if (analytics === dummy) {
  console.warn("No environment value for SEGMENT_WRITE_KEY found. Analytics are disabled.")
}
export default analytics;
