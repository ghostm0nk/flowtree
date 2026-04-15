// No changes here as the issue seems configuration-based
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header session={session} />
      <main>
        {session ? (
          <Dashboard session={session} />
        ) : (
          <div className="max-w-md mx-auto py-12 px-4">
            <AuthForm />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;