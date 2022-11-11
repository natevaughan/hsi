import type { NextApiRequest, NextApiResponse } from "next";
import analytics from "../../lib/analytics";
import { KEY_ANALYTICS_ID } from "../../lib/constants";

/**
 * Track analytics events
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const analyticsId = req.cookies[KEY_ANALYTICS_ID]

  if (!analyticsId) {
    res.status(401).end();
    console.warn(`Cannot send analytics event: no cookie set for ${KEY_ANALYTICS_ID}`)
    return
  }

  if (req.method !== 'POST') {
    res.status(404).end();
    return
  }

  try {
    const data = JSON.parse(req.body)
    // data.context = Object.assign(data.context || {}, {ip: '1.1.1.1'})
    data.userId = analyticsId

    analytics.track(data);
  } catch (e) {
    console.error(e)
    res.status(400).end()
    return
  }

  res.status(204).end()
  return
}
