import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        FlowTree
      </h1>
      <p className="text-xl mb-8 max-w-2x text-gray-300">
        Organize your tasks into a work tree with names and calendar dates.
      </p>
      <Link to="/login" className="btn btn-primary">
        Get Started
      </Link>
    </div>
  );
}