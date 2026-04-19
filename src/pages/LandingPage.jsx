import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up rounded-b-3xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Organize Your Work, Amplify Your Flow.
            </h1>
            <p className="text-lg sm:text-xl mb-8 opacity-90">
              FlowTree helps teams and individuals manage tasks, assign responsibilities, and track progress effortlessly.
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-white text-gray-800 font-bold rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 text-lg"
            >
              Get Started for Free
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
              Features Designed for Productivity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-blue-600 text-5xl mb-4">📝</div> {/* Placeholder icon */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Intuitive Task Management</h3>
                <p className="text-gray-700">
                  Create, update, and delete tasks with ease. Keep track of everything you need to do.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-blue-600 text-5xl mb-4">👥</div> {/* Placeholder icon */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaborative Assignees</h3>
                <p className="text-gray-700">
                  Assign tasks to team members by name and email, fostering clear responsibilities.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-blue-600 text-5xl mb-4">✍️</div> {/* Placeholder icon */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Detailed Task Notes</h3>
                <p className="text-gray-700">
                  Add long-form descriptions and notes to your tasks for comprehensive context.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to boost your productivity?
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90">
              Join FlowTree today and transform the way you manage your tasks and projects.
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 text-lg animate-pulse hover:animate-none"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;