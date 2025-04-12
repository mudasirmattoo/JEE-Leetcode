import React from 'react';
import Questions from '../Components/Questions/Questions.js';
import PracticeNavbar from '../Components/Navbar/PracticeNavbar.js';
import AllQuiz from '../Components/Quiz/AllQuiz.js';

const Home = () => {
  return (
    <>
      <div className="mt-5 flex justify-center items-center text-center px-5 gap-2 font-quicksand animate-fadeIn">
        <h4 className="text-lg font-light m-0">Welcome</h4>
        <h1 className="text-xl font-bold m-0">Muhsin!</h1>
      </div>

      <PracticeNavbar />

      <div className="flex flex-col items-center mt-48 font-quicksand">
        <h3 className="text-xl">Take your Quiz for the day</h3>
      </div>

      <AllQuiz />

      <div className="font-quicksand flex flex-col items-center mt-10 mb-10">
        <h5 className="text-base">Explore over two thousand problems!</h5>
      </div>

      <Questions />
    </>
  );
};

export default Home;
