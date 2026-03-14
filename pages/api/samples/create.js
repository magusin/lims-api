import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" })
}

try {

const { request_id, sample_type, quantity, operator } = req.body

if (!request_id) {
return res.status(400).json({ error: "request_id missing" })
}

if (!sample_type) {
return res.status(400).json({ error: "sample_type missing" })
}

const qty = parseInt(quantity)

if (!qty || qty <= 0) {
return res.status(400).json({ error: "quantity invalid" })
}

const created = []

for (let i = 0; i < qty; i++) {

const last = await prisma.samples.findFirst({
orderBy: { created_at: "desc" }
})

let nextNumber = 1

if (last && last.sample_code) {

const parts = last.sample_code.split("-")

nextNumber = parseInt(parts[2]) + 1

}

const year = new Date().getFullYear()

const code = `ECH-${year}-${String(nextNumber).padStart(6,"0")}`

const sample = await prisma.samples.create({
data: {
sample_code: code,
request_id: request_id,
sample_type: sample_type,
status: "received",
operator: operator || "Excel",
created_at: new Date()
}
})

created.push(sample)

}

return res.status(200).json(created)

} catch (err) {

console.error(err)

return res.status(500).json({ error: "server error" })

}

}