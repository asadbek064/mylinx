import { NextApiRequest, NextApiResponse } from 'next'

import { updateMylinxEmail } from 'controllers/editmylinx'
import { getUserFromNextAuth } from 'controllers/getuser'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.email) return res.status(400).json({ error: 'No email found' })

  const { user, error } = await getUserFromNextAuth(req, res)
  if (!user || error) return res.status(400).json({ error })

  await updateMylinxEmail(user.id, req.body.email)

  return res.status(200).json({ success: true })
}

export default handler
