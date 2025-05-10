/*
  # Add more sample tutors
  
  1. Changes
    - Add 5 more tutors to the database
    - Create corresponding profiles and tutor profiles
    
  2. Important Notes
    - Maintains referential integrity
    - Adds diverse subject combinations
*/

DO $$
DECLARE
  user6 uuid;
  user7 uuid;
  user8 uuid;
  user9 uuid;
  user10 uuid;
BEGIN
  -- Insert users and store their IDs
  user6 := (SELECT id FROM auth.users WHERE email = 'sanjay.patel@example.com' LIMIT 1);
  IF user6 IS NULL THEN
    user6 := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES (user6, 'sanjay.patel@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());
  END IF;

  user7 := (SELECT id FROM auth.users WHERE email = 'meera.reddy@example.com' LIMIT 1);
  IF user7 IS NULL THEN
    user7 := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES (user7, 'meera.reddy@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());
  END IF;

  user8 := (SELECT id FROM auth.users WHERE email = 'amrit.singh@example.com' LIMIT 1);
  IF user8 IS NULL THEN
    user8 := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES (user8, 'amrit.singh@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());
  END IF;

  user9 := (SELECT id FROM auth.users WHERE email = 'kavita.joshi@example.com' LIMIT 1);
  IF user9 IS NULL THEN
    user9 := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES (user9, 'kavita.joshi@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());
  END IF;

  user10 := (SELECT id FROM auth.users WHERE email = 'mohammed.khan@example.com' LIMIT 1);
  IF user10 IS NULL THEN
    user10 := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES (user10, 'mohammed.khan@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());
  END IF;

  -- Insert profiles
  INSERT INTO profiles (id, user_id, full_name, role, username, date_of_birth, address, phone)
  VALUES
    (gen_random_uuid(), user6, 'Dr. Sanjay Patel', 'tutor', 'sanjaypatel', '1983-04-12', 'Navrangpura, Ahmedabad', '+919876543215'),
    (gen_random_uuid(), user7, 'Meera Reddy', 'tutor', 'meerareddy', '1992-09-18', 'Koregaon Park, Pune', '+919876543216'),
    (gen_random_uuid(), user8, 'Amrit Singh', 'tutor', 'amritsingh', '1989-11-05', 'Salt Lake, Kolkata', '+919876543217'),
    (gen_random_uuid(), user9, 'Dr. Kavita Joshi', 'tutor', 'kavitajoshi', '1986-06-22', 'C-Scheme, Jaipur', '+919876543218'),
    (gen_random_uuid(), user10, 'Mohammed Khan', 'tutor', 'mohammedkhan', '1991-02-14', 'Hazratganj, Lucknow', '+919876543219');

  -- Insert tutor profiles
  INSERT INTO tutor_profiles (id, user_id, subjects, hourly_rate, experience, education, availability, location, boards, achievements, languages, teaching_style)
  VALUES
    (
      gen_random_uuid(),
      user6,
      ARRAY['Biology', 'NEET Biology', 'Environmental Science'],
      850,
      10,
      'Ph.D. in Biotechnology from IIT Bombay',
      ARRAY['Tuesday', 'Thursday', 'Saturday'],
      'Ahmedabad',
      ARRAY['CBSE', 'State Board'],
      ARRAY['NEET Mentor of the Year 2023', 'Research Published in Nature Journal'],
      ARRAY['English', 'Hindi', 'Gujarati'],
      'Case study based learning with practical applications'
    ),
    (
      gen_random_uuid(),
      user7,
      ARRAY['Social Studies', 'History', 'Political Science'],
      550,
      6,
      'M.A. in History from JNU, UGC-NET Qualified',
      ARRAY['Monday', 'Wednesday', 'Friday'],
      'Pune',
      ARRAY['CBSE', 'ICSE', 'State Board'],
      ARRAY['Published Author of History Textbooks', 'Educational YouTuber'],
      ARRAY['English', 'Hindi', 'Marathi', 'Telugu'],
      'Story-telling approach with contemporary connections'
    ),
    (
      gen_random_uuid(),
      user8,
      ARRAY['Computer Science', 'Mathematics', 'Coding'],
      800,
      8,
      'B.Tech from IIT Roorkee, Ex-Google Engineer',
      ARRAY['Tuesday', 'Thursday', 'Sunday'],
      'Kolkata',
      ARRAY['CBSE', 'ICSE'],
      ARRAY['100+ Students Placed in Tech Companies', 'Coding Competition Winner'],
      ARRAY['English', 'Hindi', 'Bengali'],
      'Project-based learning with real-world applications'
    ),
    (
      gen_random_uuid(),
      user9,
      ARRAY['Economics', 'Business Studies', 'Mathematics'],
      700,
      9,
      'Ph.D. in Economics from Delhi School of Economics',
      ARRAY['Monday', 'Wednesday', 'Saturday'],
      'Jaipur',
      ARRAY['CBSE', 'State Board'],
      ARRAY['Economics Olympiad Mentor', 'Published Research Papers'],
      ARRAY['English', 'Hindi', 'Rajasthani'],
      'Case study based with current economic scenarios'
    ),
    (
      gen_random_uuid(),
      user10,
      ARRAY['Mathematics', 'Physics', 'Chemistry'],
      600,
      7,
      'M.Sc. in Physics from Aligarh Muslim University',
      ARRAY['Tuesday', 'Thursday', 'Saturday'],
      'Lucknow',
      ARRAY['CBSE', 'State Board'],
      ARRAY['State-level Teaching Excellence Award', 'Educational Content Creator'],
      ARRAY['English', 'Hindi', 'Urdu'],
      'Conceptual clarity with daily practice sessions'
    );
END $$;