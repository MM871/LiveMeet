import { Router } from "express"
import { analyzeTranscript } from "../services/ai"
import { broadcast } from "../index"
import pool from "../database/db"

const router = Router()

const meetings: any[] = []
const insights: any[] = []

router.post("/meetings", async (req, res) => {
    const { title } = req.body
    const result = await pool.query(
    "INSERT INTO meetings (title) VALUES ($1) RETURNING *",
    [title]
  )
  res.json(result.rows[0])
})

router.post("/transcript", async (req, res) => {
  const { meeting_id, text } = req.body

  await pool.query(
    "INSERT INTO transcripts (meeting_id, text) VALUES ($1, $2)",
    [meeting_id, text]
  )

  const insight = await analyzeTranscript(text)

  const saved = await pool.query(
    "INSERT INTO insights (meeting_id, summary, decisions, topic) VALUES ($1, $2, $3, $4) RETURNING *",
    [meeting_id, insight.summary, JSON.stringify(insight.decisions), insight.topic]
  )

  for (const task of insight.actionItems) {
    await pool.query(
      "INSERT INTO action_items (meeting_id, task) VALUES ($1, $2)",
      [meeting_id, task]
    )
  }

  const fullInsight = { meeting_id, ...insight }
  broadcast({ type: "insight", data: fullInsight })

  res.json(fullInsight)
})

router.get("/insights/:meeting_id", async (req, res) => {
  const { meeting_id } = req.params
  const insights = await pool.query(
    "SELECT * FROM insights WHERE meeting_id = $1",
    [meeting_id]
  )
  const actions = await pool.query(
    "SELECT * FROM action_items WHERE meeting_id = $1",
    [meeting_id]
  )
  res.json({ insights: insights.rows, actionItems: actions.rows })
})

router.get("/meetings", async (req, res) => {
  const result = await pool.query("SELECT * FROM meetings ORDER BY created_at DESC")
  res.json(result.rows)
})

export default router