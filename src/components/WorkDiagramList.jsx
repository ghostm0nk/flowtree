import { useState } from 'react'
import WorkDiagram from './WorkDiagram'

export default function WorkDiagramList({ diagrams, loading, onDelete, onUpdate, session }) {
  const [selectedDiagram, setSelectedDiagram] = useState(null)

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading diagrams...</div>
  }

  if (diagrams.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No diagrams created yet</p>
        <p className="text-sm text-gray-400">Create your first work diagram to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {selectedDiagram ? (
        <WorkDiagram
          diagram={selectedDiagram}
          onBack={() => setSelectedDiagram(null)}
          onUpdate={onUpdate}
          onDelete={onDelete}
          session={session}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diagrams.map((diagram) => (
            <div
              key={diagram.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedDiagram(diagram)}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{diagram.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{diagram.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{new Date(diagram.created_at).toLocaleDateString()}</span>
                <span>{diagram.tasks?.length || 0} tasks</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}