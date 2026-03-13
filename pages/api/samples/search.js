import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  const { q } = req.query

  const samples = await prisma.samples.findMany({
    where: {
      sample_code: {
        contains: q,
        mode: "insensitive"
      }
    },
    take: 50
  })

  res.json(samples)

}