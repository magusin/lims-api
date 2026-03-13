import pkg from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pkgpg from "pg"

const { PrismaClient } = pkg
const { Pool } = pkgpg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter
})

export default prisma