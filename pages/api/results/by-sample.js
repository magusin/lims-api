import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  const { sample_id } = req.query

  if (!sample_id) {
    return res.status(400).json({ error: "sample_id requis" })
  }

  try {

    const results = await prisma.results.findMany({
      where: {
        sample_id: sample_id
      },
      include: {
        analysis: true,
        machine: true
      },
      orderBy: {
        created_at: "desc"
      }
    })

    res.status(200).json(results)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}