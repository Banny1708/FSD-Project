/*
  # Delete all data from tables
  
  1. Changes
    - Removes all data from profiles table
    - Removes all data from tutor_profiles table
    - Removes all data from bookings table
    
  2. Important Notes
    - Table structures are preserved
    - Foreign key constraints and policies remain intact
*/

-- Delete data from tables with foreign key dependencies first
DELETE FROM public.bookings;

-- Delete data from profile tables
DELETE FROM public.tutor_profiles;
DELETE FROM public.profiles;