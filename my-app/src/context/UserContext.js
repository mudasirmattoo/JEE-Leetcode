import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserProfile } from '../services/api.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserProfile(response.data);
      } catch (err) {
        console.error('Error in UserContext:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if user is authenticated
    if (localStorage.getItem('token')) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ 
      userProfile, 
      loading, 
      error,
      setUserProfile // Export this to update user profile after login
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 