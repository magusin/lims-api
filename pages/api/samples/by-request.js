import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  const { request_id } = req.query

  if (!request_id) {
    return res.status(400).json({ error: "request_id requis" })
  }

  const samples = await prisma.samples.findMany({
    where: {
      request_id
    },
    orderBy: {
      created_at: "desc"
    }
  })

  res.status(200).json(samples)

}