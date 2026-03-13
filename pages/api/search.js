import { prisma } from "../../lib/prisma"

export default async function handler(req, res) {

  const { client, order } = req.query

  const results = await prisma.samples.findMany({

    where: {
      request: {
        order_reference: {
          contains: order || ""
        }
      }
    },

    include: {
      request: true
    },

    take: 100

  })

  res.json(results)

}