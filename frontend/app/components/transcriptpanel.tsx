"use client"
import { useState } from "react"

export default function TranscriptPanel() {
  const [text, setText] = useState("")
  const [meetingId, setMeetingId] = useState(1)
  const [log, setLog] = useState<string[]>([])

  async function sendChunk() {
    if (!text.trim()) return
    
    try {
      const response = await fetch("http://localhost:4000/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meeting_id: meetingId, text })
      })
      
      if (!response.ok) {
        console.error("Failed to send transcript:", response.statusText)
        return
      }
      
      setLog(prev => [...prev, text])
      setText("")
    } catch (error) {
      console.error("Error sending transcript:", error)
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-purple-400">Transcript Input</h2>
      
      <div className="flex flex-col gap-2 flex-1">
        <div className="bg-gray-900 rounded-lg p-3 h-48 overflow-y-auto">
          {log.length === 0 ? (
            <p className="text-gray-600 text-sm">Transcript will appear here...</p>
          ) : (
            log.map((entry, i) => (
              <p key={i} className="text-sm text-gray-300 mb-1">— {entry}</p>
            ))
          )}
        </div>

        <textarea
          className="bg-gray-900 text-white rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type transcript chunk here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={sendChunk}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 text-sm font-semibold transition"
        >
          Send Chunk
        </button>
      </div>
    </div>
  )
}

