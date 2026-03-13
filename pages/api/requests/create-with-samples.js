import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  const { client_id, samples_count } = req.body

  const request = await prisma.requests.create({
    data: {
      client_id,
      status: "received"
    }
  })

  const samples = []

  for (let i = 0; i < samples_count; i++) {

    const sample = await prisma.samples.create({
      data: {
        request_id: request.id,
        sample_type: "water",
        status: "received"
      }
    })

    samples.push(sample)

  }

  res.json({
    request,
    samples
  })

}