"use client"
import { useState, useEffect } from "react"
import SummaryPanel from "@/app/components/summary"
import ActionItemsPanel from "@/app/components/actionitems"
import TranscriptPanel from "@/app/components/transcriptpanel"

export default function Home() {
  const [summary, setSummary] = useState("Waiting for meeting data...")
  const [actionItems, setActionItems] = useState<string[]>([])
  const [decisions, setDecisions] = useState<string[]>([])
  const [topic, setTopic] = useState("No topic yet")
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000")

    ws.onopen = () => setConnected(true)
    ws.onclose = () => setConnected(false)
    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      setConnected(false)
    }

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        if (msg.type === "insight" && msg.data) {
          setSummary(msg.data.summary || "No summary available")
          setActionItems(msg.data.actionItems || [])
          setDecisions(msg.data.decisions || [])
          setTopic(msg.data.topic || "No topic")
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    return () => ws.close()
  }, [])

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">LiveMeet</h1>
          <span className={`px-3 py-1 rounded-full text-sm ${connected ? "bg-green-500" : "bg-red-500"}`}>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>

        <div className="mb-4 px-4 py-2 bg-gray-800 rounded-lg">
          <span className="text-gray-400 text-sm">Current Topic: </span>
          <span className="font-semibold">{topic}</span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <TranscriptPanel />
          <div className="flex flex-col gap-6">
            <SummaryPanel summary={summary} />
            <ActionItemsPanel actionItems={actionItems} decisions={decisions} />
          </div>
        </div>
      </div>
    </main>
  )
}