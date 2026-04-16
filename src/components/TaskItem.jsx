import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [assigneeName, setAssigneeName] = useState(task.assignee_name || '')
  const [assigneeEmail, setAssigneeEmail] = useState(task.assignee_email || '')
  const [status, setStatus] = useState(task.status || 'pending')

  const handleUpdate = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          title,
          description,
          assignee_name: assigneeName,
          assignee_email: assigneeEmail,
          status
        })
        .eq('id', task.id)
        .select()
        .single()

      if (error) throw error
      onUpdate(data)
      setEditing(false)
    } catch (error) {
      alert('Error updating task: ' + error.message)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await onDelete(task.id)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {editing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={assigneeName}
              onChange={(e) => setAssigneeName(e.target.value)}
              placeholder="Assignee name"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={assigneeEmail}
              onChange={(e) => setAssigneeEmail(e.target.value)}
              placeholder="Assignee email"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{task.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${
              task.status === 'completed' ? 'bg-green-100 text-green-800' :
              task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {task.status?.replace('_', ' ') || 'Pending'}
            </span>
          </div>
          {task.description && (
            <p className="text-gray-600 text-sm mb-2">{task.description}</p>
          )}
          {(task.assignee_name || task.assignee_email) && (
            <div className="text-sm text-gray-500 mb-3">
              {task.assignee_name && <div>Assignee: {task.assignee_name}</div>}
              {task.assignee_email && <div>Email: {task.assignee_email}</div>}
            </div>
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}