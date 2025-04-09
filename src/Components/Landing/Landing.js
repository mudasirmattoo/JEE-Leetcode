import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import Questions from '../Questions/Questions.js';
import ChemistryQuiz from '../Quiz/ChemistryQuiz.js';
import AdminQuestionForm from '../AdminQuestionForm/AdminQuestionForm.js';

const Landing = () => {
  return (
    <>
      <div className="welcome-banner">
        <div className="banner-content">
          <h1>Welcome to Tango</h1>
          <p>Your journey to mastery begins here</p>
          <Link to="/profile" className="get-started-btn">Get Started</Link>
        </div>
      </div>

      <div className="practice-message">
        <h3>Dashboard</h3>
      </div>
      <Questions />
      
      <div className='chemistry-quiz-msg'>
        <h3>Take a Chemistry Quiz</h3>
      </div>
      <ChemistryQuiz/>  
      <br></br>
      <AdminQuestionForm/>
    </>
  );
};

export default Landing;

