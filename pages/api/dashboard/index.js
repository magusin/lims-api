import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const requests_today = await prisma.requests.count({
        where: {
            created_at: { gte: today }
        }
    })

    const samples_received = await prisma.samples.count({
        where: { status: "received" }
    })

    const samples_analysis = await prisma.samples.count({
        where: { status: "analysis" }
    })

    const samples_completed = await prisma.samples.count({
        where: { status: "completed" }
    })

    const samples_rejected = await prisma.samples.count({
        where: { status: "rejected" }
    })

    const results_today = await prisma.results.count({
        where: {
            created_at: { gte: today }
        }
    })

    const latest_results = await prisma.results.findMany({
        take: 10,
        orderBy: { created_at: "desc" },
        include: {
            sample: true,
            analysis: true,
            machine: true
        }
    })

    res.json({
        requests_today,
        samples_received,
        samples_analysis,
        samples_completed,
        samples_rejected,
        results_today,
        latest_results
    })

}