import React from 'react';
import './ProfileDashboard.css'; // Make sure this CSS file exists and is customized as needed
import SolvedQuestions from '../SolvedQuestions/SolvedQuestions.js';
import { useUser } from "../../context/UserContext.js";
const ProfileDashboard = ({ onLogout }) => {
  const { userProfile, loading, error } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Hard-coded value for total questions solved
  const totalSolved = 112; 

  // Hard-coded solved-day data:
  // For demonstration, we mark these day numbers as "solved"
  const solvedDays = [2, 5, 7, 11, 15, 22, 27, 32, 35, 37, 41, 45, 52, 57, 62, 67, 72, 77, 82, 87, 92, 97, 102, 107, 112];

  const isDaySolved = (day) => solvedDays.includes(day);

  // Create an array for 6 months (180 days) and apply a "solved" class if the day is in solvedDays.
  const daysArray = Array.from({ length: 180 }, (_, index) => {
    return (
      <div key={index} className={`day-box ${isDaySolved(index + 1) ? 'solved' : ''}`}></div>
    );
  });

  return (
    <>
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="profile-header">
          <div className="profile-info">
            <img src="../Assets/Screenshot 2025-02-05 at 11.14.48 AM.png" alt="Profile" className="profile-pic" />
            <div>
              <h3>{userProfile.name}</h3>
              <p>Rank: {userProfile.rank}</p>
              <p>Email: {userProfile.email}</p>
              <p>Role: {userProfile.role}</p>
            </div>
          </div>
          
          <div className="stats-summary">
            <div className="solved-count">Total Questions solved : {totalSolved}</div>
            <div className="streak-calendar">
              {daysArray}
            </div>
          </div>
          <div className="button-box">
            <button className="edit-profile-btn">EditProfile</button>
            <button className="edit-profile-btn">Subscribe</button>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
      
    </div>
    <br></br>
    
      <SolvedQuestions/>
    
    </>
  );
};

export default ProfileDashboard; 