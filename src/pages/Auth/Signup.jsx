import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      // Insert user details into public.users table
      const { error: profileError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, email: data.user.email, name: name }]);

      if (profileError) {
        console.error('Error inserting user profile:', profileError.message);
        setError('Error creating user profile. Please try again.');
        // Optionally, you might want to delete the auth user if profile creation fails
        // await supabase.auth.admin.deleteUser(data.user.id); // This requires admin privileges, usually not done client-side
      } else {
        alert('Check your email for the verification link!');
        navigate('/login'); // Redirect to login after successful signup and verification email sent
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Section - Image */}
        <div
          className="md:w-1/2 bg-blue-500 h-64 md:h-auto bg-[url('https://images.unsplash.com/photo-1507679799977-c9183b063857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDIyfHx3b3JrZmxvd3xlbnwwfHx8fDE3MTYwNzYwMDJ8MHw&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center"
          aria-hidden="true"
        ></div>

        {/* Right Section - Signup Form */}
        <div className="md:w-1/2 p-10 bg-white flex flex-col justify-center">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your FlowTree account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Start your journey with FlowTree today!
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="full-name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign up'}
              </button>
            </div>
          </form>
          <div className="text-center text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;