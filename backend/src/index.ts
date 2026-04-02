import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import { WebSocketServer } from "ws"
import { createServer } from "http"
import meetingRoutes from "./routes/meetings"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api", meetingRoutes)

// Create HTTP server (needed to attach WebSocket)
const server = createServer(app)

// WebSocket server
const wss = new WebSocketServer({ server })

wss.on("connection", (ws) => {
  console.log("Client connected via WebSocket")

  ws.send(JSON.stringify({ type: "connected", message: "LiveMeet WebSocket ready" }))

  ws.on("close", () => {
    console.log("Client disconnected")
  })
})

// Export so routes can broadcast later
export function broadcast(data: object) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data))
    }
  })
}

server.listen(4000, () => {
  console.log("Server running on port 4000")
})