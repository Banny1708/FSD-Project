/*
  # Add INSERT policy for profiles table
  
  1. Security Changes
    - Add INSERT policy to profiles table to allow new user registration
    - Policy ensures users can only create their own profile
    - Policy is permissive and applies to authenticated users only
*/

CREATE POLICY "Users can create own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);