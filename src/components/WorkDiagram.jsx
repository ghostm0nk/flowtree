import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import TaskItem from './TaskItem'
import AddTask from './AddTask'

export default function WorkDiagram({ diagram, onBack, onUpdate, onDelete, session }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('diagram_id', diagram.id)
        .order('created_at', { ascending: true })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      alert('Error fetching tasks: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const addTask = (task) => {
    setTasks([...tasks, task])
  }

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
  }

  const deleteTask = async (id) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTasks(tasks.filter(t => t.id !== id))
    } catch (error) {
      alert('Error deleting task: ' + error.message)
    }
  }

  const handleDeleteDiagram = async () => {
    if (window.confirm('Are you sure you want to delete this diagram?')) {
      await onDelete(diagram.id)
      onBack()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to diagrams
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{diagram.name}</h2>
          <p className="text-gray-600">{diagram.description}</p>
        </div>
        <button
          onClick={handleDeleteDiagram}
          className="text-red-600 hover:text-red-700"
        >
          Delete Diagram
        </button>
      </div>

      <div className="mb-6">
        <AddTask
          diagramId={diagram.id}
          onTaskAdded={addTask}
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No tasks yet</div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  )
}