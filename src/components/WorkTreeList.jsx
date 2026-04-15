import React from 'react';
import { format } from 'date-fns';

const WorkTreeList = ({ workTrees, onDelete }) => {
  if (workTrees.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">No work trees yet</div>
        <p className="text-gray-400">Create your first work tree to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workTrees.map((tree) => (
        <div
          key={tree.id}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{tree.title}</h3>
          <p className="text-sm text-gray-500 mb-4">
            Created {format(new Date(tree.created_at), 'MMM d, yyyy')}
          </p>
          <div className="flex justify-between items-center">
            <button className="text-indigo-600 hover:text-indigo-500 font-medium">
              Open Tree
            </button>
            <button
              onClick={() => onDelete(tree.id)}
              className="text-red-600 hover:text-red-500 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkTreeList;