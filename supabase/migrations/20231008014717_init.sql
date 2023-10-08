CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE items (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    user_id UUID REFERENCES profiles(id)
);

-- Lock all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Specify only the permissions you want to grant to the tables
CREATE POLICY "Allow authenticated users to CRUD their own profile" 
ON profiles FOR ALL TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY "Allow authenticated users to CRUD their items that belong to their profile"  
ON items FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Automatically create a profile when a new user is created
CREATE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users 
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Add bucket for images
INSERT INTO storage.buckets (id, name) 
VALUES ('images', 'images');

-- Allow everyone to read images
CREATE POLICY "Allow public access to images" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to CRUD images
CREATE POLICY "Allow authenticated users to CRUD images" ON storage.objects FOR ALL TO authenticated USING (
  auth.role() = 'authenticated'
) WITH CHECK (
  auth.role() = 'authenticated'
);
