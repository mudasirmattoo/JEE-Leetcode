import React, { useState, useEffect } from 'react';
import ProfileDashboard from '../Components/Profile/ProfileDashboard.js';
import LoginSignup from '../Components/Profile/LoginSignup.js';

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const onLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <div className="font-quicksand flex justify-center items-center min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <ProfileDashboard onLogout={handleLogout} />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoginSignup onLoginSuccess={onLoginSuccess} />
        </div>
      )}
    </div>
  );
};

export default Profile;
