import React from 'react';
import './CSS/Home.css';
import QuestionForm from '../Components/QuestionForm/QuestionForm.js'
import Questions from '../Components/Questions/Questions.js';
import ChemistryQuiz from '../Components/Quiz/ChemistryQuiz.js';

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
      <QuestionForm/>  

      
    </>
    
  );
};

export default Home;