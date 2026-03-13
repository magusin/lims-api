import pkg from "@prisma/client"

const { PrismaClient } = pkg

const prisma = new PrismaClient()

async function main() {

  console.log("Seeding database...")

  const client = await prisma.clients.create({
    data: {
      name: "EDF Poitiers",
      email: "contact@edf.fr",
      phone: "0500000001",
      address: "Poitiers"
    }
  })

  console.log("Client created")

  const machine = await prisma.machines.create({
    data: {
      name: "SpectroLab 3000",
      model: "SL-3000",
      location: "Lab A"
    }
  })

  console.log("Machine created")

  const analysis = await prisma.analyses.create({
    data: {
      name: "pH",
      unit: "pH",
      reference_min: 6.5,
      reference_max: 8.5
    }
  })

  console.log("Analysis created")

  const request = await prisma.requests.create({
    data: {
      request_code: "REQ-DEMO-001",
      client_id: client.id,
      order_reference: "EDF-POITIER-TEST",
      status: "received",
      received_date: new Date()
    }
  })

  console.log("Request created")

  const samples = []

  for (let i = 1; i <= 10; i++) {

    const sample = await prisma.samples.create({
      data: {
        sample_code: `SMP-DEMO-${i}`,
        request_id: request.id,
        sample_type: "water",
        status: "received",
        operator: "Technician A"
      }
    })

    samples.push(sample)
  }

  console.log("Samples created")

  for (const sample of samples) {

    await prisma.results.create({
      data: {
        sample_id: sample.id,
        analysis_id: analysis.id,
        machine_id: machine.id,
        value: Math.random() * 8
      }
    })

  }

  console.log("Results created")

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())