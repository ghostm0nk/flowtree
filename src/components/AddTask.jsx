import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AddTask({ diagramId, onTaskAdded }) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assigneeName, setAssigneeName] = useState('')
  const [assigneeEmail, setAssigneeEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title,
            description,
            assignee_name: assigneeName,
            assignee_email: assigneeEmail,
            diagram_id: diagramId,
            status: 'pending'
          }
        ])
        .select()
        .single()

      if (error) throw error
      onTaskAdded(data)
      setTitle('')
      setDescription('')
      setAssigneeName('')
      setAssigneeEmail('')
    } catch (error) {
      alert('Error creating task: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Assignee name"
          value={assigneeName}
          onChange={(e) => setAssigneeName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="email"
          placeholder="Assignee email"
          value={assigneeEmail}
          onChange={(e) => setAssigneeEmail(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !title}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}