import React from 'react';
import './CSS/Home.css';
import Questions from '../Components/Questions/Questions.js';
import ChemistryQuiz from '../Components/Quiz/ChemistryQuiz.js';
import AdminQuestionForm from '../Components/AdminQuestionForm/AdminQuestionForm.js'

const Home = () => {
  return (
    <>
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

export default Home;