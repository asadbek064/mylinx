import { getPublishedMylinxFromId, getUserFromSession } from 'controllers/getuser'
import { NextApiRequest, NextApiResponse } from 'next';
import { TUser } from 'types/user';

type GetUserRes = {
  user?: TUser
  publishedMylinx?: TUser
  error?: string
}

const getuser = async (req: NextApiRequest, res: NextApiResponse<GetUserRes>): Promise<void> => {
  const { user, error } = await getUserFromSession(req)
  if (!user || error) return res.status(400).json({ error })

  const { user: publishedMylinx } = await getPublishedMylinxFromId(user.id)

  return res.status(200).json({ user, publishedMylinx })
}


export default getuser
