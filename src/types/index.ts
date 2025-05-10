export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'tutor';
}

export interface TutorProfile {
  id: string;
  userId: string;
  subjects: string[];
  hourlyRate: number;
  experience: number;
  education: string;
  availability: string[];
}

export interface Student {
  id: string;
  userId: string;
  grade: string;
  subjects: string[];
  preferredTimeSlots: string[];
}