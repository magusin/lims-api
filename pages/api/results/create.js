import prisma from "../../../lib/prisma"

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const { sample_id, analysis_id, value, machine_id } = req.body

  const result = await prisma.results.create({
    data: {
      sample_id,
      analysis_id,
      value,
      machine_id
    }
  })

  res.json(result)

}