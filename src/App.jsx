import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="app-container">
      <Outlet />
    </div>
  )
}

export default App