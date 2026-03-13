import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function test() {

  const clients = await prisma.clients.findMany()

  console.log(clients)

}

test()