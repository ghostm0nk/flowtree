import { useState, useEffect } from 'react'

export default function UrlDataFetch({ session }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState('https://www.subway.com')

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const text = await response.text()
      setData(text)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return (
    <div className="bg-white shadow-md rounded-lg px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Fetch URL Data</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url-input">
          URL to Fetch
        </label>
        <div className="flex items-center space-x-3">
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter URL"
          />
          <button
            onClick={fetchData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Fetching...' : 'Fetch Data'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-6 text-gray-500">
          Fetching data...
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 mb-6">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {data && !loading && !error && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Raw Response (first 2000 chars):</h3>
          <div className="bg-gray-50 rounded-md p-4 h-96 overflow-auto text-sm font-mono">
            <pre>{data.substring(0, 2000)}{data.length > 2000 ? '...' : ''}</pre>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: Direct fetching from websites like Subway.com often fails due to CORS restrictions.
            For production use, consider implementing a backend proxy service.
          </p>
        </div>
      )}

      {!data && !loading && !error && (
        <div className="text-center py-8 text-gray-500">
          Click "Fetch Data" to retrieve content from the specified URL.
        </div>
      )}
    </div>
  )
}