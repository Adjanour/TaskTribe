// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const useRequireAuth = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  console.log('Checking if user is logged in');
  const router = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      router('/auth/login');
    }
  }, []);

  return currentUser;
};


export default useAuth;

