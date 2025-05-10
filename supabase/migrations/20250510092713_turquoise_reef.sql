/*
  # Initial schema setup for Home Tutor Finder

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - full_name (text)
      - role (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - tutor_profiles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - subjects (text[])
      - hourly_rate (integer)
      - experience (integer)
      - education (text)
      - availability (text[])
      - location (text)
      - boards (text[])
      - image_url (text)
      - achievements (text[])
      - languages (text[])
      - teaching_style (text)
      - created_at (timestamp)
      - updated_at (timestamp)

    - bookings
      - id (uuid, primary key)
      - student_id (uuid, references auth.users)
      - tutor_id (uuid, references auth.users)
      - subject (text)
      - date (timestamp)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  role text CHECK (role IN ('student', 'tutor')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create tutor_profiles table
CREATE TABLE tutor_profiles (
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

-- Create bookings table
CREATE TABLE bookings (
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
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Tutor profiles policies
CREATE POLICY "Anyone can read tutor profiles"
  ON tutor_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Tutors can update own profile"
  ON tutor_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Bookings policies
CREATE POLICY "Students can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Tutors can read bookings where they are the tutor"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = tutor_id);

CREATE POLICY "Students can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (student_id, tutor_id));