import { useState, useEffect } from 'react';
import { 
  signInAnonymously, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth } from '../config/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Error signing in anonymously:', error);
    }
  };

  const signInAdmin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Verify admin role here if needed
      // const token = await user?.getIdTokenResult();
      // if (!token?.claims?.admin) throw new Error('Unauthorized');
    } catch (error) {
      let errorMessage = 'Failed to sign in';
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      }
      throw new Error(errorMessage);
    }
  };

  return {
    user,
    loading,
    signInAsGuest,
    signInAdmin
  };
}