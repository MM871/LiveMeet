import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function analyzeTranscript(text: string) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `You are analyzing a meeting transcript. Return ONLY valid JSON with no extra text, no markdown, no backticks.

Extract:
- summary
- actionItems (array)
- decisions (array)
- topic

Transcript: ${text}

Respond in this exact format:
{"summary":"...","actionItems":["..."],"decisions":["..."],"topic":"..."}`
      }
    ]
  })

  const content = response.choices[0].message.content || ""
  const clean = content.replace(/```json|```/g, "").trim()
  return JSON.parse(clean)
}