import React from 'react';
import './CSS/Home.css';
import Questions from '../Components/Questions/Questions.js';
import PracticeNavbar from '../Components/Navbar/PracticeNavbar.js';
import AllQuiz from '../Components/Quiz/AllQuiz.js';

const Home = () => {
  return (
    <>
      <div className='welcomemsg'>
        <h4>Welcome </h4>
        <h1>Muhsin!</h1>
      </div>
      
      <PracticeNavbar/>
      

      <div className='chemistry-quiz-msg'>
        <h3>Take your Quiz for the day</h3>
      </div>
      <AllQuiz/>
      <br></br>
      <br></br>
      
      <div className="practice-message">
        <h5>Explore over two thousand problems!</h5>
      </div>
      <Questions />
     
      <br></br>
    </>
    
  );
};

export default Home;