import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import WorkDiagramList from './WorkDiagramList'
import CreateDiagram from './CreateDiagram'
import Profile from './Profile'

export default function Dashboard({ session }) {
  const [activeTab, setActiveTab] = useState('diagrams')
  const [diagrams, setDiagrams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDiagrams()
  }, [])

  const fetchDiagrams = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('diagrams')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDiagrams(data || [])
    } catch (error) {
      alert('Error fetching diagrams: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const addDiagram = (diagram) => {
    setDiagrams([diagram, ...diagrams])
  }

  const updateDiagram = (updatedDiagram) => {
    setDiagrams(diagrams.map(d => d.id === updatedDiagram.id ? updatedDiagram : d))
  }

  const deleteDiagram = async (id) => {
    try {
      const { error } = await supabase
        .from('diagrams')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id)

      if (error) throw error
      setDiagrams(diagrams.filter(d => d.id !== id))
    } catch (error) {
      alert('Error deleting diagram: ' + error.message)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('diagrams')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'diagrams'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Work Diagrams
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'create'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Create Diagram
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profile
          </button>
        </nav>
      </div>

      {activeTab === 'diagrams' && (
        <WorkDiagramList
          diagrams={diagrams}
          loading={loading}
          onDelete={deleteDiagram}
          onUpdate={updateDiagram}
          session={session}
        />
      )}
      {activeTab === 'create' && (
        <CreateDiagram
          session={session}
          onDiagramCreated={() => {
            fetchDiagrams()
            setActiveTab('diagrams')
          }}
        />
      )}
      {activeTab === 'profile' && (
        <Profile session={session} />
      )}
    </div>
  )
}