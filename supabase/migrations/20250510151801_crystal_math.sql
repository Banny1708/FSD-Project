/*
  # Add sample tutors
  
  1. Changes
    - Create sample users in auth.users table
    - Create corresponding profiles
    - Create tutor profiles with teaching details
    
  2. Important Notes
    - Uses auth.users() function to create auth users
    - Maintains referential integrity with foreign keys
*/

-- Create users in auth.users table
DO $$
DECLARE
  user1 uuid;
  user2 uuid;
  user3 uuid;
  user4 uuid;
  user5 uuid;
BEGIN
  -- Insert users and store their IDs
  user1 := (SELECT id FROM auth.users WHERE email = 'priya.sharma@example.com' LIMIT 1);
  IF user1 IS NULL THEN
    user1 := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES (user1, 'priya.sharma@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());
  END IF;

  user2 := (SELECT id FROM auth.users WHERE email = 'rajesh.kumar@example.com' LIMIT 1);
  IF user2 IS NULL THEN
    user2 := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES (user2, 'rajesh.kumar@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());
  END IF;

  user3 := (SELECT id FROM auth.users WHERE email = 'anjali.desai@example.com' LIMIT 1);
  IF user3 IS NULL THEN
    user3 := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES (user3, 'anjali.desai@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());
  END IF;

  user4 := (SELECT id FROM auth.users WHERE email = 'arjun.menon@example.com' LIMIT 1);
  IF user4 IS NULL THEN
    user4 := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES (user4, 'arjun.menon@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());
  END IF;

  user5 := (SELECT id FROM auth.users WHERE email = 'fatima.sheikh@example.com' LIMIT 1);
  IF user5 IS NULL THEN
    user5 := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES (user5, 'fatima.sheikh@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());
  END IF;

  -- Insert profiles
  INSERT INTO profiles (id, user_id, full_name, role, username, date_of_birth, address, phone)
  VALUES
    (gen_random_uuid(), user1, 'Dr. Priya Sharma', 'tutor', 'priyasharma', '1985-05-15', 'Sector 15, Delhi', '+919876543210'),
    (gen_random_uuid(), user2, 'Prof. Rajesh Kumar', 'tutor', 'rajeshkumar', '1980-03-20', 'Indiranagar, Bangalore', '+919876543211'),
    (gen_random_uuid(), user3, 'Anjali Desai', 'tutor', 'anjalidesai', '1990-08-10', 'Bandra West, Mumbai', '+919876543212'),
    (gen_random_uuid(), user4, 'Dr. Arjun Menon', 'tutor', 'arjunmenon', '1982-12-25', 'T Nagar, Chennai', '+919876543213'),
    (gen_random_uuid(), user5, 'Fatima Sheikh', 'tutor', 'fatimasheikh', '1988-07-30', 'Banjara Hills, Hyderabad', '+919876543214');

  -- Insert tutor profiles
  INSERT INTO tutor_profiles (id, user_id, subjects, hourly_rate, experience, education, availability, location, boards, achievements, languages, teaching_style)
  VALUES
    (
      gen_random_uuid(),
      user1,
      ARRAY['Mathematics', 'IIT-JEE Physics', 'NEET Physics'],
      800,
      8,
      'Ph.D. in Physics from IIT Delhi',
      ARRAY['Monday', 'Wednesday', 'Friday'],
      'Delhi',
      ARRAY['CBSE', 'ICSE'],
      ARRAY['Gold Medalist - IIT Delhi', 'Published in International Physics Journal'],
      ARRAY['English', 'Hindi'],
      'Interactive learning with practical demonstrations'
    ),
    (
      gen_random_uuid(),
      user2,
      ARRAY['Chemistry', 'NEET Biology', 'IIT-JEE Chemistry'],
      750,
      12,
      'M.Sc. from IISc Bangalore, NET-JRF Qualified',
      ARRAY['Tuesday', 'Thursday', 'Saturday'],
      'Bangalore',
      ARRAY['CBSE', 'State Board'],
      ARRAY['CSIR-NET Qualified', '10+ Years at Leading Coaching Institute'],
      ARRAY['English', 'Hindi', 'Kannada'],
      'Concept-based learning with regular assessments'
    ),
    (
      gen_random_uuid(),
      user3,
      ARRAY['English Literature', 'Hindi', 'Sanskrit'],
      600,
      7,
      'M.A. in English Literature from Delhi University, B.Ed',
      ARRAY['Monday', 'Tuesday', 'Thursday'],
      'Mumbai',
      ARRAY['CBSE', 'ICSE', 'State Board'],
      ARRAY['Cambridge CELTA Certified', 'Published Author'],
      ARRAY['English', 'Hindi', 'Marathi', 'Sanskrit'],
      'Literature-based approach with focus on communication skills'
    ),
    (
      gen_random_uuid(),
      user4,
      ARRAY['Mathematics', 'IIT-JEE Mathematics', 'Vedic Mathematics'],
      900,
      15,
      'Ph.D. in Mathematics from IIT Madras',
      ARRAY['Wednesday', 'Friday', 'Sunday'],
      'Chennai',
      ARRAY['CBSE', 'State Board'],
      ARRAY['IIT-JEE AIR 50', 'Mathematics Olympiad Gold Medalist'],
      ARRAY['English', 'Tamil', 'Malayalam'],
      'Problem-solving based approach with shortcuts'
    ),
    (
      gen_random_uuid(),
      user5,
      ARRAY['Physics', 'Chemistry', 'Mathematics'],
      650,
      5,
      'B.Tech from NIT Trichy, M.Ed',
      ARRAY['Monday', 'Wednesday', 'Saturday'],
      'Hyderabad',
      ARRAY['CBSE', 'ICSE'],
      ARRAY['Best Teacher Award 2022', 'Published Educational Content Creator'],
      ARRAY['English', 'Hindi', 'Urdu', 'Telugu'],
      'Visual learning with online tools and animations'
    );
END $$;