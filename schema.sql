-- Enable Row Level Security
ALTER DATABASE postgres SET "app.settings.rls" = 'on';

-- Create diagrams table
CREATE TABLE IF NOT EXISTS diagrams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  diagram_id uuid REFERENCES diagrams(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  assignee_name text,
  assignee_email text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS for diagrams
ALTER TABLE diagrams ENABLE ROW LEVEL SECURITY;

-- Diagrams policies
CREATE POLICY "Users can view own diagrams" ON diagrams
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own diagrams" ON diagrams
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diagrams" ON diagrams
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own diagrams" ON diagrams
  FOR DELETE USING (auth.uid() = user_id);

-- Enable RLS for tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Tasks policies
CREATE POLICY "Users can view tasks from own diagrams" ON tasks
  FOR SELECT USING (
    diagram_id IN (
      SELECT id FROM diagrams WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create tasks in own diagrams" ON tasks
  FOR INSERT WITH CHECK (
    diagram_id IN (
      SELECT id FROM diagrams WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tasks in own diagrams" ON tasks
  FOR UPDATE USING (
    diagram_id IN (
      SELECT id FROM diagrams WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tasks in own diagrams" ON tasks
  FOR DELETE USING (
    diagram_id IN (
      SELECT id FROM diagrams WHERE user_id = auth.uid()
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_diagrams_updated_at ON diagrams;
CREATE TRIGGER update_diagrams_updated_at
  BEFORE UPDATE ON diagrams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();