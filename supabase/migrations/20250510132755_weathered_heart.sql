/*
  # Add phone number field to profiles table
  
  1. Changes
    - Add phone column to profiles table
    
  2. Important Notes
    - Phone numbers should be stored in international format
    - No specific validation is added at the database level
*/

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS phone text;