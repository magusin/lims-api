import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {

    const { sample_id, analysis_id, machine_id, value } = req.body

    // Validation
    if (!sample_id || !analysis_id || !machine_id) {
      return res.status(400).json({
        error: "sample_id, analysis_id et machine_id sont requis"
      })
    }

    if (value === undefined || value === null) {
      return res.status(400).json({
        error: "value est requise"
      })
    }

    // Vérifier sample
    const sample = await prisma.samples.findUnique({
      where: { id: sample_id }
    })

    if (!sample) {
      return res.status(404).json({
        error: "sample introuvable"
      })
    }

    // Vérifier analysis
    const analysis = await prisma.analyses.findUnique({
      where: { id: analysis_id }
    })

    if (!analysis) {
      return res.status(404).json({
        error: "analysis introuvable"
      })
    }

    // Vérifier machine
    const machine = await prisma.machines.findUnique({
      where: { id: machine_id }
    })

    if (!machine) {
      return res.status(404).json({
        error: "machine introuvable"
      })
    }

    // Vérifier doublon sample + analyse
    const existing = await prisma.results.findFirst({
      where: {
        sample_id,
        analysis_id,
        machine_id
      }
    })

    if (existing) {
      return res.status(409).json({
        error: "Un résultat existe déjà pour cette analyse sur cet échantillon"
      })
    }

    // Création résultat
    const result = await prisma.results.create({
      data: {
        sample_id,
        analysis_id,
        machine_id,
        value
      }
    })

    return res.status(200).json(result)

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      error: "Erreur serveur"
    })

  }

}