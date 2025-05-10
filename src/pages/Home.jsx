import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center">
      <div className="relative bg-gradient-to-r from-teal-500 to-blue-500 text-white py-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-8 tracking-tight">
            Find Your Perfect Home Tutor
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-2xl mb-12 text-teal-50">
              Connect with qualified tutors for CBSE, ICSE, JEE, NEET, and all other subjects across major Indian cities.
            </p>
            <Link
              to="/tutors"
              className="bg-white text-teal-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-teal-50 transition-all transform hover:scale-105 shadow-lg inline-block"
            >
              Start Learning Today
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-gray-900 mb-16">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Expert Tutors</h3>
            <p className="text-gray-600 text-lg">
              Learn from experienced tutors from top institutions like IITs and NITs
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">All Boards</h3>
            <p className="text-gray-600 text-lg">
              Comprehensive coverage of CBSE, ICSE, State Boards, and competitive exams
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Flexible Learning</h3>
            <p className="text-gray-600 text-lg">
              Choose from online or in-person sessions at your convenience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}