const handleCreateWorkTree = async (title, description = '') => {
  try {
    const { error } = await supabase
      .from('work_trees')
      .insert([
        {
          title,
          description,
          user_id: session.user.id,
        },
      ]);

    if (error) throw error;
    fetchWorkTrees(); 
  } catch (error) {
    console.error('Error creating work tree:', error);
  }
};