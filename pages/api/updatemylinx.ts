import { NextApiRequest, NextApiResponse } from 'next'

import { updateDraftMylinx } from 'controllers/editmylinx'
import { getUserFromNextAuth } from 'controllers/getuser'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.draftData) return res.status(400).json({ error: 'No draft data found' })

  const { user, error } = await getUserFromNextAuth(req, res)
  if (!user || error) return res.status(400).json({ error })

  await updateDraftMylinx(user.id, req.body.draftData)

  return res.status(200).json({ success: true })
}

export default handler
