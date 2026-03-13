import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  try {

    if (req.method === "GET") {

      const clients = await prisma.clients.findMany({
        orderBy: { created_at: "desc" }
      })

      return res.status(200).json(clients)
    }

    return res.status(405).json({
      error: "Method not allowed"
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      error: error.message
    })

  }

}