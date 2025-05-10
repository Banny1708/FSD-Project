import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import TutorList from './TutorList';

export default function TutorsData({ filters }) {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const { data, error } = await supabase
        .from('tutor_profiles')
        .select(`
          *,
          user_id (
            profiles (
              full_name,
              username,
              phone
            )
          )
        `);

      if (error) throw error;

      const transformedTutors = data.map(tutor => ({
        id: tutor.id,
        name: tutor.user_id?.profiles?.full_name || 'Unknown',
        subjects: tutor.subjects || [],
        hourlyRate: tutor.hourly_rate || 0,
        experience: tutor.experience || 0,
        education: tutor.education || '',
        availability: tutor.availability || [],
        location: tutor.location || '',
        boards: tutor.boards || [],
        image: tutor.image_url || 'https://images.pexels.com/photos/5905902/pexels-photo-5905902.jpeg',
        achievements: tutor.achievements || [],
        languages: tutor.languages || [],
        teachingStyle: tutor.teaching_style || '',
        rating: 4.5
      }));

      setTutors(transformedTutors);
      setError(null);
    } catch (err) {
      console.error('Error fetching tutors:', err);
      setError('Failed to load tutors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = !filters.searchTerm || 
      tutor.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesSubject = !filters.selectedSubject || 
      tutor.subjects.includes(filters.selectedSubject);
    const matchesCity = !filters.selectedCity || 
      tutor.location === filters.selectedCity;
    const matchesBoard = !filters.selectedBoard || 
      tutor.boards.includes(filters.selectedBoard);
    return matchesSearch && matchesSubject && matchesCity && matchesBoard;
  });

  return <TutorList tutors={filteredTutors} loading={loading} error={error} />;
}