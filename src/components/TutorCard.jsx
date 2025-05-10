import { useState } from 'react';

export default function TutorCard({ tutor }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 m-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-teal-600">
          {tutor.experience}+ Years
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{tutor.name}</h3>
            <p className="text-gray-600 text-sm">{tutor.education}</p>
          </div>
          <div className="flex items-center bg-teal-50 px-3 py-1 rounded-full">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-teal-600 font-semibold">{tutor.rating}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Subjects:</p>
            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map((subject) => (
                <span
                  key={subject}
                  className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Boards:</p>
            <div className="flex flex-wrap gap-2">
              {tutor.boards.map((board) => (
                <span
                  key={board}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                >
                  {board}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Languages:</p>
            <div className="flex flex-wrap gap-2">
              {tutor.languages.map((language) => (
                <span
                  key={language}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Teaching Style:</p>
            <p className="text-sm text-gray-700">{tutor.teachingStyle}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Key Achievements:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {tutor.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-lg font-semibold text-teal-600">
              ₹{tutor.hourlyRate}/hr
            </span>
            <button className={`${
              isHovered 
                ? 'bg-teal-600 text-white'
                : 'bg-teal-50 text-teal-600'
            } py-2 px-6 rounded-full font-medium transition-colors duration-300`}>
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}