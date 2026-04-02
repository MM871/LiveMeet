interface Props {
  actionItems: string[]
  decisions: string[]
}

export default function ActionItemsPanel({ actionItems, decisions }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3 text-yellow-400">Action Items</h2>
        {actionItems.length === 0 ? (
          <p className="text-gray-500 text-sm">No action items yet</p>
        ) : (
          <ul className="space-y-2">
            {actionItems.map((item, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2">
                <span className="text-yellow-400">→</span> {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-3 text-green-400">Decisions</h2>
        {decisions.length === 0 ? (
          <p className="text-gray-500 text-sm">No decisions yet</p>
        ) : (
          <ul className="space-y-2">
            {decisions.map((item, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2">
                <span className="text-green-400">✓</span> {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}