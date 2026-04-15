import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import TreeNode from './TreeNode'

export default function WorkTreeView({ treeId, session }) {
  const [tree, setTree] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedNode, setSelectedNode] = useState(null)

  useEffect(() => {
    fetchTree()
  }, [treeId])

  const fetchTree = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('work_trees')
        .select('*')
        .eq('id', treeId)
        .single()

      if (error) throw error
      setTree(data)
    } catch (error) {
      console.error('Error fetching tree:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateTree = async (updates) => {
    try {
      const { data, error } = await supabase
        .from('work_trees')
        .update(updates)
        .eq('id', treeId)
        .select()

      if (error) throw error
      setTree(data[0])
    } catch (error) {
      console.error('Error updating tree:', error)
    }
  }

  const addNode = async (parentId = null) => {
    const newNode = {
      id: Date.now().toString(),
      title: 'New Task',
      description: '',
      status: 'todo',
      assignee: null,
      dueDate: null,
      parentId,
      children: []
    }

    const updatedData = {
      ...tree.data,
      nodes: [...(tree.data.nodes || []), newNode]
    }

    await updateTree({ data: updatedData })
  }

  const updateNode = async (nodeId, updates) => {
    const updatedNodes = tree.data.nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    )

    await updateTree({ 
      data: { ...tree.data, nodes: updatedNodes }
    })
  }

  const deleteNode = async (nodeId) => {
    const updatedNodes = tree.data.nodes.filter(node => node.id !== nodeId)
    await updateTree({ 
      data: { ...tree.data, nodes: updatedNodes }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!tree) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Work tree not found</p>
      </div>
    )
  }

  const rootNodes = tree.data.nodes?.filter(node => !node.parentId) || []

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{tree.name}</h1>
        <p className="text-gray-600 mt-1">Collaborative task management</p>
      </div>

      <div className="space-y-4">
        {rootNodes.map(node => (
          <TreeNode
            key={node.id}
            node={node}
            nodes={tree.data.nodes || []}
            onUpdate={updateNode}
            onDelete={deleteNode}
            onAddChild={addNode}
            level={0}
          />
        ))}
        
        <button
          onClick={() => addNode()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Root Task
        </button>
      </div>
    </div>
  )
}