import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  if (req.method === "GET") {

    const clients = await prisma.clients.findMany({
      orderBy: { created_at: "desc" }
    })

    res.status(200).json(clients)
  }

}