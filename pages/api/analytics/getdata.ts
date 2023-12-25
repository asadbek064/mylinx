import { NextApiRequest, NextApiResponse } from 'next'

import {
  GetCountryHits,
  GetCountryHitsReturnData,
  GetDeviceHits,
  GetDeviceHitsReturnData,
  GetLinkHits,
  GetLinkHitsReturnData,
  GetPageHits,
  GetPageHitsReturnData,
  GetTimeSeriesData,
  GetTrafficSources,
  GetTrafficSourcesReturnData,
} from 'controllers/analytics'

import { getUserFromNextAuth } from 'controllers/getuser'

export type AnalyticAPIReturnData = {
  success?: boolean
  error?: string
  totalHits?: GetPageHitsReturnData
  topLinks?: GetLinkHitsReturnData
  topCountries?: GetCountryHitsReturnData
  topDevices?: GetDeviceHitsReturnData
  trafficSources?: GetTrafficSourcesReturnData
  timeSeriesData?: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse<AnalyticAPIReturnData>) => {
  const { user } = await getUserFromNextAuth(req, res)
  if (!user) return res.status(400).json({ error: 'No user found' })

  const mylinxId = user.id

  console.log('/api/analytics/getdata hit for:', mylinxId)

  const totalHits = await GetPageHits(mylinxId)

  const topLinks = await GetLinkHits(mylinxId)

  const topCountries = await GetCountryHits(mylinxId)

  const topDevices = await GetDeviceHits(mylinxId)

  const topTrafficSources = await GetTrafficSources(mylinxId)

  const timeSeriesData = await GetTimeSeriesData(mylinxId)

  return res.status(200).json({
    success: true,
    totalHits,
    topLinks,
    topCountries,
    topDevices,
    trafficSources: topTrafficSources,
    timeSeriesData,
  })
}

export default handler
