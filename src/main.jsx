import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import App from './App'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Define routes
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login supabase={supabase} /> }
])

ReactDOM.render(
  <Router>
    <router />
  </Router>,
  document.getElementById('app')
)