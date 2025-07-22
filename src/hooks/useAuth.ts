import { useState, useEffect } from 'react';
import { mockAuth, mockDb, MockUser } from '../services/mockAuth';

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  name: string;
  avatar?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = mockAuth.onAuthStateChanged(async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const userDoc = await mockDb.getDoc({ uid: user.uid });
          if (userDoc.exists()) {
            setUserProfile({
              uid: user.uid,
              email: user.email || '',
              ...userDoc.data()
            } as UserProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await mockAuth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await mockAuth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return {
    user,
    userProfile,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: userProfile?.role === 'admin',
    isTeacher: userProfile?.role === 'teacher',
    isStudent: userProfile?.role === 'student'
  };
};