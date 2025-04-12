import React from 'react';
import { Link } from 'react-router-dom';
import Questions from '../Questions/Questions.js';
import ChemistryQuiz from '../Quiz/ChemistryQuiz.js';
import AdminQuestionForm from '../AdminQuestionForm/AdminQuestionForm.js';

const Landing = () => {
  return (
    <>
      <header className="w-full bg-[#830202] text-white py-16 text-center font-[Quicksand] mb-10">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="text-4xl mb-4">Welcome to Tango</h1>
          <p className="text-lg mb-6 opacity-90">Your journey to mastery begins here</p>
          <Link
            to="/profile"
            className="bg-white text-[#830202] font-bold py-3 px-6 text-lg rounded transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 inline-block"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="flex flex-col items-center my-10 font-[Quicksand]">
        <h3 className="text-xl mb-6">Dashboard</h3>
        <Questions />
      </section>

      <section className="flex flex-col items-center mt-40 font-[Quicksand]">
        <h3 className="text-xl mb-6">Take a Chemistry Quiz</h3>
        <ChemistryQuiz />
      </section>

      <section className="flex justify-center mt-10 font-[Quicksand]">
        <AdminQuestionForm />
      </section>
    </>
  );
};

export default Landing;
