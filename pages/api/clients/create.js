import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  try {

    if (req.method === "POST") {

      const { name, email, phone, address } = req.body

      if (!name || !email) {
        return res.status(400).json({ error: "name et email requis" })
      }

      const existing = await prisma.clients.findFirst({
        where: { email }
      })

      if (existing) {
        return res.status(409).json({ error: "Client déjà existant" })
      }

      const client = await prisma.clients.create({
        data: {
          name,
          email,
          phone,
          address
        }
      })

      return res.status(201).json(client)

    }

    return res.status(405).json({ error: "Method not allowed" })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      error: error.message
    })

  }

}