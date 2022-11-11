import type { NextApiRequest, NextApiResponse } from "next";
import analytics from "../../lib/analytics";
import { KEY_ANALYTICS_ID } from "../../lib/constants";

/**
 * Track analytics page hits
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (req.method !== 'POST') {
    res.status(404).end();
    return
  }

  const analyticsId = req.cookies[KEY_ANALYTICS_ID]

  if (!analyticsId) {
    res.status(401).end();
    console.warn(`Cannot send analytics page: no cookie set for ${KEY_ANALYTICS_ID}`)
    return
  }

  try {
    const data = JSON.parse(req.body)
    // data.context = Object.assign(data.context || {}, {ip: '1.1.1.1'})
    data.userId = analyticsId
    analytics.page(data);
  } catch (e) {
    console.error(e)
    res.status(400).end()
    return
  }

  res.status(204).end()
}
