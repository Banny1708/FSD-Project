/*
  # Update database schema for tutor finder application

  1. Tables
    - Ensures profiles table exists with correct structure
    - Creates tutor_profiles table with references to profiles
    - Creates bookings table for session management
  
  2. Security
    - Enables RLS on all tables
    - Sets up appropriate access policies for each table
*/

-- Create tutor_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS tutor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  subjects text[],
  hourly_rate integer,
  experience integer,
  education text,
  availability text[],
  location text,
  boards text[],
  image_url text,
  achievements text[],
  languages text[],
  teaching_style text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create bookings table if it doesn't exist
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES auth.users ON DELETE CASCADE,
  tutor_id uuid REFERENCES auth.users ON DELETE CASCADE,
  subject text,
  date timestamptz,
  status text CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE tutor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Tutor profiles policies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'tutor_profiles' AND policyname = 'Anyone can read tutor profiles'
  ) THEN
    CREATE POLICY "Anyone can read tutor profiles"
      ON tutor_profiles
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'tutor_profiles' AND policyname = 'Tutors can update own profile'
  ) THEN
    CREATE POLICY "Tutors can update own profile"
      ON tutor_profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Bookings policies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Students can read own bookings'
  ) THEN
    CREATE POLICY "Students can read own bookings"
      ON bookings
      FOR SELECT
      TO authenticated
      USING (auth.uid() = student_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Tutors can read bookings where they are the tutor'
  ) THEN
    CREATE POLICY "Tutors can read bookings where they are the tutor"
      ON bookings
      FOR SELECT
      TO authenticated
      USING (auth.uid() = tutor_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Students can create bookings'
  ) THEN
    CREATE POLICY "Students can create bookings"
      ON bookings
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = student_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Users can update own bookings'
  ) THEN
    CREATE POLICY "Users can update own bookings"
      ON bookings
      FOR UPDATE
      TO authenticated
      USING (auth.uid() IN (student_id, tutor_id));
  END IF;
END $$;