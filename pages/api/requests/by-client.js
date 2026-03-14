import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  const { client_id } = req.query

  if (!client_id) {
    return res.status(400).json({ error: "client_id requis" })
  }

  const requests = await prisma.requests.findMany({
    where: {
      client_id: client_id
    },
    orderBy: {
      created_at: "desc"
    }
  })

  res.status(200).json(requests)

}