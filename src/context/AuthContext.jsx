import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getAccessToken = () => session?.access_token;

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', data.user.id)
      .single();

    setUser({ ...data.user, ...profile });
    setSession(data.session);
    return data;
  };

  const register = async ({ email, password, name, role }) => {
    // First sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Wait for the session to be established
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error('Failed to establish session after signup');
    }

    setSession(session);

    // Create user profile using the service role client
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          user_id: session.user.id,
          full_name: name,
          role,
        },
      ])
      .select()
      .single();

    if (profileError) throw profileError;

    // If the user is a tutor, create an empty tutor profile
    if (role === 'tutor') {
      const { error: tutorProfileError } = await supabase
        .from('tutor_profiles')
        .insert([
          {
            user_id: session.user.id,
            subjects: [],
            hourly_rate: 0,
            experience: 0,
            availability: [],
            boards: [],
            achievements: [],
            languages: [],
          },
        ]);

      if (tutorProfileError) throw tutorProfileError;
    }

    setUser({ ...session.user, full_name: name, role });
    return { ...authData, redirectTo: '/user-details' };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const value = {
    user,
    login,
    logout,
    register,
    resetPassword,
    loading,
    getAccessToken,
    session
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};