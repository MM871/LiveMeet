interface Props {
  summary: string
}

export default function SummaryPanel({ summary }: Props) {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-3 text-blue-400">Summary</h2>
      <p className="text-gray-300 text-sm leading-relaxed">{summary}</p>
    </div>
  )
}