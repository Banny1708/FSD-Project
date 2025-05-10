import { useState, useEffect } from 'react';
import { cities, boards, subjects } from '../data/tutors';
import TutorCard from '../components/TutorCard';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function Tutors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const { data, error } = await supabase
        .from('tutor_profiles')
        .select(`
          *,
          profile:profile_id(full_name, username, phone)
        `);

      if (error) throw error;

      // Transform the data to match the TutorCard component's expected format
      const transformedTutors = data.map(tutor => ({
        id: tutor.id,
        name: tutor.profile?.full_name || 'Unknown',
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
        rating: 4.5 // Default rating for now
      }));

      setTutors(transformedTutors);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !selectedSubject || tutor.subjects.includes(selectedSubject);
    const matchesCity = !selectedCity || tutor.location === selectedCity;
    const matchesBoard = !selectedBoard || tutor.boards.includes(selectedBoard);
    return matchesSearch && matchesSubject && matchesCity && matchesBoard;
  });

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Please log in to view tutors.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Find Tutors Near You</h2>
        <div className="bg-gray-50 p-6 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search tutors..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Board</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
              >
                <option value="">All Boards</option>
                {boards.map(board => (
                  <option key={board} value={board}>{board}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tutors...</p>
        </div>
      ) : filteredTutors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No tutors found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}