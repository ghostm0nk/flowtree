import React from 'react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    // Fetch tasks from Supabase
  }, []);

  const handleAddTask = () => {
    // Add task to Supabase
  };

  return (
    <div className="home-container">
      <h1 className="app-name">FlowTree</h1>
      <p className="tagline">Organize your tasks into a work tree with precision.</p>
      <button className="cta-button" onClick={() => window.location.href = '/login'}>
        Get Started
      </button>
      {/* Task list rendering */}
    </div>
  );
}