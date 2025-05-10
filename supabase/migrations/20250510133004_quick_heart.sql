/*
  # Add INSERT policy for tutor_profiles table
  
  1. Security Changes
    - Add INSERT policy to tutor_profiles table to allow new tutor registration
    - Policy ensures tutors can only create their own profile
    - Policy is permissive and applies to authenticated users only
*/

CREATE POLICY "Tutors can create own profile"
ON public.tutor_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);