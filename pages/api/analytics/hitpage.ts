import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import { AddPageHit } from 'controllers/analytics'
import { Device } from 'types/utils'

const RequestSchema = z.object({
  mylinxId: z.string(),
  username: z.string(),
  referrer: z.string().optional(),
  device: z.nativeEnum(Device).optional(),
  ip: z.string().optional(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('hitpage hit')
  const request = RequestSchema.safeParse(req.body)
  if (!request.success) return res.status(400).json({ error: request.error })

  // premmaturely return 200 to prevent blocking the client from loading
  res.status(200).json({ success: true })

  const { mylinxId, referrer, device, ip, username } = request.data

  await AddPageHit({ mylinxId, referrer, ip, device, username })
}

export default handler
