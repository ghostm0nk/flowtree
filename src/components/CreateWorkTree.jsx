import { useState } from 'react'

export default function CreateWorkTree({ onCreate }) {
  const [name, setName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsCreating(true)
    await onCreate(name.trim())
    setName('')
    setIsCreating(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Work Tree</h3>
      <div className="flex gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter work tree name..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={isCreating}
        />
        <button
          type="submit"
          disabled={isCreating || !name.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isCreating ? 'Creating...' : 'Create Tree'}
        </button>
      </div>
    </form>
  )
}