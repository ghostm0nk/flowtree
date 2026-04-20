import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskNotes, setTaskNotes] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      notes: taskNotes,
      created_at: new Date().toISOString(),
      user_id: user.id
    };

    setTasks(prev => [newTask, ...prev]);
    setTaskName('');
    setTaskNotes('');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome to your FlowTree Dashboard, {user?.user_metadata?.name || user?.email}!
          </h1>
          <p className="text-gray-700">Manage your tasks below</p>
          
          {/* Task Creation Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
              <div className="mb-4">
                <label htmlFor="task-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Task Name
                </label>
                <input
                  id="task-name"
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter task name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="task-notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Task Notes (optional)
                </label>
                <textarea
                  id="task-notes"
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  placeholder="Enter task details..."
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  Create Task
                </button>
              </div>
            </form>
          )}
          
          {/* Task List */}
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Your Tasks
              </h2>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  New Task
                </button>
              )}
            </div>
            
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No tasks yet. Click "New Task" to get started!
              </p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <li key={task.id} className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{task.name}</h3>
                        {task.notes && (
                          <p className="text-sm text-gray-600 mt-1">{task.notes}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          Created: {new Date(task.created_at).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;