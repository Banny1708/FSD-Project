import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const StudentDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">My Learning</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-teal-50 rounded-xl p-4">
            <p className="text-teal-600 font-medium">Upcoming Sessions</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-purple-600 font-medium">Completed Sessions</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">My Tutors</h3>
        <div className="text-gray-500 text-center py-8">
          <p>You haven't booked any sessions yet.</p>
          <a href="/tutors" className="text-teal-600 hover:text-teal-700 font-medium mt-2 inline-block">
            Find a tutor
          </a>
        </div>
      </div>
    </div>
  );

  const TutorDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Teaching Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-teal-50 rounded-xl p-4">
            <p className="text-teal-600 font-medium">Upcoming Sessions</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-purple-600 font-medium">Total Students</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-blue-600 font-medium">Total Earnings</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">₹0</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule</h3>
        <div className="text-gray-500 text-center py-8">
          <p>No upcoming sessions scheduled.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Reviews</h3>
        <div className="text-gray-500 text-center py-8">
          <p>No reviews yet.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h2>
        <p className="text-gray-600 mt-2">Here's an overview of your activities</p>
      </div>
      
      {user?.role === 'student' ? <StudentDashboard /> : <TutorDashboard />}
    </div>
  );
}