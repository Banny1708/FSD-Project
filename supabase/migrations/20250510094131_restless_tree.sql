/*
  # Add user details fields

  1. Changes
    - Add new columns to profiles table for additional user details:
      - username (text, unique)
      - date_of_birth (date)
      - address (text)
  
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS username text UNIQUE,
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS address text;