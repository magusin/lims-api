import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { status, client_id, request_code, date_from, date_to } = req.query

  const where = {}

  if (status) where.status = status

  if (client_id && client_id.length === 36) {
    where.client_id = client_id
  }

  if (request_code) {
    where.request_code = {
      contains: request_code
    }
  }

  if (date_from || date_to) {
    where.received_date = {}

    if (date_from) {
      where.received_date.gte = new Date(date_from)
    }

    if (date_to) {
      where.received_date.lte = new Date(date_to)
    }
  }

  const requests = await prisma.requests.findMany({
    where,
    orderBy: {
      created_at: "desc"
    },
    take: 1000
  })

  res.json(requests)

}