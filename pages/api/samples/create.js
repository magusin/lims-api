import prisma from "../../../lib/prisma"

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const { request_id, sample_code, sample_type, operator } = req.body

  try {

    const sample = await prisma.samples.create({
      data: {
        request_id,
        sample_code,
        sample_type,
        operator,
        status: "received"
      }
    })

    res.json(sample)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}