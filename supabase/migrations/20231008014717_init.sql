BEGIN;

CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    user_id UUID REFERENCES profiles(id)
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    user_id UUID REFERENCES profiles(id)
);

-- @note - we don't need this table for now
-- CREATE TABLE images (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
--     filename VARCHAR(255) NOT NULL UNIQUE,
--     filepath VARCHAR(255) NOT NULL,
--     bucket_id VARCHAR(255) NOT NULL
-- );

-- Lock all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Specify only the permissions you want to grant to the tables
CREATE POLICY "Allow authenticated users to CRUD their own profile" 
ON profiles FOR ALL TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY "Allow authenticated users to CRUD their items that belong to their profile"  
ON items FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow authenticated users to CRUD their tasks that belong to their profile"   
ON tasks FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Automatically create a profile when a new user is created
CREATE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- Create a new profile and bucket for the new user
  INSERT INTO storage.buckets (id, name, owner)
  VALUES (NEW.id::text, NEW.id::text, NEW.id);
  
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users 
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Allow owners to CRUD files in their buckets
CREATE POLICY "Allow owners to CRUD files in their buckets" ON storage.objects FOR ALL USING (
  bucket_id = auth.uid() :: text
  AND owner = auth.uid()
);

-- References: https://supabase.com/docs/guides/realtime/postgres-changes#replication-setup
-- Add the items table to the supabase_realtime publication so we can listen to this table for updates in realtime.
ALTER PUBLICATION supabase_realtime
ADD
  TABLE items;

COMMIT;
