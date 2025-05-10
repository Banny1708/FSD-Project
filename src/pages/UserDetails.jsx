import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { subjects } from '../data/tutors';

export default function UserDetails() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const role = user?.role;

  const onSubmit = async (data) => {
    try {
      setError('');
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          date_of_birth: data.dateOfBirth,
          address: data.address,
          phone: data.phone,
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      if (role === 'tutor') {
        const { error: tutorError } = await supabase
          .from('tutor_profiles')
          .update({
            subjects: data.subjects,
            hourly_rate: parseInt(data.hourlyRate),
            education: data.education,
            location: data.city,
          })
          .eq('user_id', user.id);

        if (tutorError) throw tutorError;
      }

      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'An error occurred while updating your details.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please provide some additional information to complete your profile.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  {...register('username', { 
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters'
                    }
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  type="tel"
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+?[1-9]\d{9,11}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="mt-1">
                <input
                  id="dateOfBirth"
                  type="date"
                  {...register('dateOfBirth', { 
                    required: 'Date of birth is required'
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1">
                <textarea
                  id="address"
                  {...register('address', { 
                    required: 'Address is required'
                  })}
                  rows={3}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
              </div>
            </div>

            {role === 'tutor' && (
              <>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      id="city"
                      type="text"
                      {...register('city', { 
                        required: 'City is required'
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                    Education
                  </label>
                  <div className="mt-1">
                    <input
                      id="education"
                      type="text"
                      {...register('education', { 
                        required: 'Education details are required'
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                    {errors.education && <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subjects" className="block text-sm font-medium text-gray-700">
                    Subjects
                  </label>
                  <div className="mt-1">
                    <select
                      id="subjects"
                      multiple
                      {...register('subjects', { 
                        required: 'Please select at least one subject'
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    {errors.subjects && <p className="mt-1 text-sm text-red-600">{errors.subjects.message}</p>}
                    <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) or Command (Mac) to select multiple subjects</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                    Hourly Rate (₹)
                  </label>
                  <div className="mt-1">
                    <input
                      id="hourlyRate"
                      type="number"
                      min="0"
                      {...register('hourlyRate', { 
                        required: 'Hourly rate is required',
                        min: {
                          value: 0,
                          message: 'Hourly rate must be positive'
                        }
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                    {errors.hourlyRate && <p className="mt-1 text-sm text-red-600">{errors.hourlyRate.message}</p>}
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Save Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}