import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import WorkTreeList from './WorkTreeList'
import CreateWorkTree from './CreateWorkTree'

export default function Dashboard({ session }) {
  const [workTrees, setWorkTrees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkTrees()
  }, [])

  const fetchWorkTrees = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('work_trees')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setWorkTrees(data || [])
    } catch (error) {
      console.error('Error fetching work trees:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateWorkTree = async (name) => {
    try {
      const { data, error } = await supabase
        .from('work_trees')
        .insert([
          {
            name,
            user_id: session.user.id,
            data: { nodes: [], connections: [] }
          }
        ])
        .select()

      if (error) throw error
      setWorkTrees([data[0], ...workTrees])
    } catch (error) {
      console.error('Error creating work tree:', error)
    }
  }

  const handleDeleteWorkTree = async (id) => {
    try {
      const { error } = await supabase
        .from('work_trees')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id)

      if (error) throw error
      setWorkTrees(workTrees.filter(tree => tree.id !== id))
    } catch (error) {
      console.error('Error deleting work tree:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Work Trees</h2>
        <p className="text-gray-600">Create and manage collaborative task trees with your team</p>
      </div>

      <CreateWorkTree onCreate={handleCreateWorkTree} />
      
      <WorkTreeList 
        workTrees={workTrees} 
        loading={loading}
        onDelete={handleDeleteWorkTree}
      />
    </div>
  )
}