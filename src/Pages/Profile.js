import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import './CSS/Profile.css'; 
import ProfileDashboard from '../Components/Profile/ProfileDashboard.js';
import LoginSignup from '../Components/Profile/LoginSignup.js';

const Profile = () => {
  //const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for an existing token on component mount.
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
    // Optionally, navigate to another page if needed.
    // navigate('/login');
  };

  return (
    <div className="profile-page">
      {isAuthenticated ? (
        <ProfileDashboard onLogout={handleLogout} />
      ) : (
        <LoginSignup onLoginSuccess={onLoginSuccess} />
      )}
    </div>
  );
};

export default Profile;
