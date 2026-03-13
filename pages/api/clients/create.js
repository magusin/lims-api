import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  if (req.method !== "POST")
    return res.status(405).end()

  const { name, email, phone } = req.body

  const client = await prisma.clients.create({
    data: {
      name,
      email,
      phone
    }
  })

  res.json(client)

}