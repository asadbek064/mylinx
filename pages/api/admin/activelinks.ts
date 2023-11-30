import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  const activeMylinxs = await prisma.mylinxProd.findMany({
    where: {
      OR: [
        {
          pageHits: {
            some: {
              timestamp: {
                gte: threeDaysAgo,
              },
            },
          },
        },
        {
          linkHits: {
            some: {
              timestamp: {
                gte: threeDaysAgo,
              },
            },
          },
        },
      ],
    },
    select: {
      name: true,
      pageHits: {
        where: {
          timestamp: {
            gte: threeDaysAgo,
          },
        },
        select: {
          id: true,
        },
      },
    },
  })

  const activeMylinxsData = activeMylinxs.map((mylinx) => ({
    name: mylinx.name,
    totalPageHits: mylinx.pageHits.length,
  }))

  // Sort by totalPageHits in descending order
  activeMylinxsData.sort((a, b) => b.totalPageHits - a.totalPageHits)

  const count = activeMylinxsData.length

  return res.status(200).json({ count, activeMylinxsData })
}

export default handler
