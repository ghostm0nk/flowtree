import { supabase } from '../lib/supabase'

export default function Header({ session }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Flowtree</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              {session.user.user_metadata?.full_name || session.user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}