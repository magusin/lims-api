import prisma from "../../../lib/prisma"

export default async function handler(req, res) {

  if (req.method === "GET") {

    const samples = await prisma.samples.findMany({
      take: 50,
      orderBy: {
        created_at: "desc"
      }
    })

    return res.json(samples)
  }

  res.status(405).json({ message: "Method not allowed" })
}