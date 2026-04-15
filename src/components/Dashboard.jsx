import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import WorkTreeList from './WorkTreeList';
import CreateWorkTree from './CreateWorkTree';

const Dashboard = ({ session }) => {
  const [workTrees, setWorkTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkTrees();
  }, []);

  const fetchWorkTrees = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('work_trees')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkTrees(data || []); 
    } catch (error) {
      console.error('Error fetching work trees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkTree = async (title) => {
    try {
      const { data, error } = await supabase
        .from('work_trees')
        .insert([
          {
            title,
            user_id: session.user.id,
          },
        ])
        .select();

      if (error) throw error;
      setWorkTrees([data[0], ...workTrees]); 
    } catch (error) {
      console.error('Error creating work tree:', error);
    }
  };

  const handleDeleteWorkTree = async (id) => {
    try {
      const { error } = await supabase
        .from('work_trees')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setWorkTrees(workTrees.filter(tree => tree.id !== id)); 
    } catch (error) {
      console.error('Error deleting work tree:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-gray-500">Loading work trees...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {session.user.email}</h1>
        <p className="text-gray-600">Organize your work and ideas hierarchically</p>
      </div>

      <div className="mb-8">
        <CreateWorkTree onCreate={handleCreateWorkTree} />
      </div>

      <WorkTreeList workTrees={workTrees} onDelete={handleDeleteWorkTree} />
    </div>
  );
};

export default Dashboard;