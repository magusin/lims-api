import prisma from "../../lib/prisma"

export default async function handler(req, res) {

  await prisma.$queryRaw`SELECT 1`

  res.json({ status: "ok" })

}