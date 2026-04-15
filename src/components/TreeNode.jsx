import { useState } from 'react'

export default function TreeNode({ node, nodes, onUpdate, onDelete, onAddChild, level }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(node.title)

  const children = nodes.filter(n => n.parentId === node.id)

  const handleSave = async () => {
    await onUpdate(node.id, { title: editTitle })
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditTitle(node.title)
      setIsEditing(false)
    }
  }

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    inProgress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800'
  }

  return (
    <div className={`${level > 0 ? 'ml-8' : ''}`}>
      <div className="flex items-center group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        {children.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2 text-gray-500 hover:text-gray-700"
          >
            <svg 
              className={`h-4 w-4 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <h3 
              className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
              onClick={() => setIsEditing(true)}
            >
              {node.title}
            </h3>
          )}
          
          {node.description && (
            <p className="text-sm text-gray-600 mt-1">{node.description}</p>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <select
            value={node.status}
            onChange={(e) => onUpdate(node.id, { status: e.target.value })}
            className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <button
            onClick={() => onAddChild(node.id)}
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            title="Add subtask"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          
          <button
            onClick={() => onDelete(node.id)}
            className="text-gray-500 hover:text-red-600 transition-colors duration-200"
            title="Delete task"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {isExpanded && children.length > 0 && (
        <div className="mt-2 space-y-2">
          {children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              nodes={nodes}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onAddChild={onAddChild}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}