import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
              Home Tutor Finder
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            {(!user || user.role === 'student') && (
              <Link 
                to="/tutors" 
                className="text-gray-700 hover:text-teal-600 transition-colors text-lg font-medium"
              >
                Find Tutors
              </Link>
            )}
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-teal-600 transition-colors text-lg font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-colors text-lg font-medium shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-teal-600 transition-colors text-lg font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-teal-600 transition-colors text-lg font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}