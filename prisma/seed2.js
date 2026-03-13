import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function seed() {

console.log("Seeding database...")

/* USERS */

const users = []

for (let i = 0; i < 5; i++) {

const user = await prisma.users.create({
data: {
username: faker.internet.username(),
password_hash: faker.string.alphanumeric(60),
role: faker.helpers.arrayElement(["admin","technician","lab"]),
}
})

users.push(user)

}

/* MACHINES */

const machines = []

for (let i = 0; i < 5; i++) {

const machine = await prisma.machines.create({
data: {
name: "Analyzer " + faker.number.int({min:1,max:99}),
model: faker.helpers.arrayElement(["HPLC","GC-MS","ICP","Spectrometer"]),
location: faker.helpers.arrayElement(["Lab A","Lab B","Lab C"])
}
})

machines.push(machine)

}

/* ANALYSES */

const analyses = []

const analysesList = [
{ name:"pH", unit:"pH", min:6.5, max:8.5 },
{ name:"Nitrate", unit:"mg/L", min:0, max:50 },
{ name:"Lead", unit:"µg/L", min:0, max:10 },
{ name:"Chloride", unit:"mg/L", min:0, max:250 },
{ name:"Conductivity", unit:"µS/cm", min:50, max:1500 },
{ name:"Temperature", unit:"°C", min:2, max:25 }
]

for (const a of analysesList) {

const analysis = await prisma.analyses.create({
data:{
name:a.name,
unit:a.unit,
reference_min:a.min,
reference_max:a.max
}
})

analyses.push(analysis)

}

/* CLIENTS */

const clients = []

for (let i = 0; i < 20; i++) {

const client = await prisma.clients.create({
data:{
name:faker.company.name(),
email:faker.internet.email(),
phone:faker.phone.number(),
address:faker.location.streetAddress()
}
})

clients.push(client)

}

let sampleCounter = 1

/* REQUESTS */

for (const client of clients) {

const requestsCount = faker.number.int({min:5,max:10})

for (let r=0; r<requestsCount; r++) {

const request = await prisma.requests.create({
data:{
client_id:client.id,
request_code:"REQ-"+faker.number.int({min:100000,max:999999}),
order_reference:"ORD-"+faker.number.int({min:100000,max:999999}),
received_date:faker.date.recent({days:30}),
status:faker.helpers.arrayElement(["received","analysis","completed"])
}
})

/* SAMPLES */

const samplesCount = faker.number.int({min:10,max:20})

for (let s=0; s<samplesCount; s++) {

const sampleCode = "ECH-2026-" + String(sampleCounter).padStart(6,"0")

sampleCounter++

const sample = await prisma.samples.create({
data:{
sample_code:sampleCode,
request_id:request.id,
sample_type:faker.helpers.arrayElement(["water","soil","food","chemical"]),
status:faker.helpers.arrayElement(["received","analysis","completed"]),
operator:faker.person.fullName()
}
})

/* RESULTS */

const resultsCount = faker.number.int({min:3,max:6})

for (let a=0; a<resultsCount; a++) {

const analysis = faker.helpers.arrayElement(analyses)

await prisma.results.create({
data:{
sample_id:sample.id,
analysis_id:analysis.id,
machine_id:faker.helpers.arrayElement(machines).id,
value:faker.number.float({
min:analysis.reference_min ?? 0,
max:analysis.reference_max ?? 100
})
}
})

}

}

}

}

/* LOGS */

for (let i = 0; i < 20; i++) {

await prisma.logs.create({
data:{
user_id:faker.helpers.arrayElement(users).id,
action:faker.helpers.arrayElement([
"login",
"create sample",
"update result",
"validate analysis"
])
}
})

}

console.log("Seed terminé")

}

seed()
.catch(console.error)
.finally(()=>prisma.$disconnect())