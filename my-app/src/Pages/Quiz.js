import React, { useState } from "react";
import { useParams } from "react-router-dom";
import questionsData from "../Components/Assets/quesionsData.js";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const { topic } = useParams();

  const filteredQuestions = questionsData.filter((q) => q.topic === topic);

  if (filteredQuestions.length === 0) {
    return <div className="text-center mt-40 text-xl text-gray-600">No questions found for this topic.</div>;
  }

  const question = filteredQuestions[index];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption === question.answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (index < filteredQuestions.length - 1) {
      setIndex(index + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleBackClick = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedOption(null);
    }
  };

  if (quizCompleted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-100 rounded-lg shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Complete!</h2>
          <p className="text-lg text-gray-700">Your score: {score}/{filteredQuestions.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto mt-52 p-8 bg-gray-100 shadow-md rounded-md w-full max-w-4xl gap-6 font-[Quicksand] animate-fade-in">
      <h4 className="text-xl font-semibold text-gray-700">{question.title}</h4>
      <ul className="w-1/3 space-y-3">
        {question.options.map((option, i) => (
          <li
            key={i}
            className={`py-2 px-4 text-center border rounded cursor-pointer transition-all duration-300 ${
              selectedOption === option
                ? "bg-green-600 text-white"
                : "hover:bg-blue-100 hover:border-red-800"
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        <button
          onClick={handleBackClick}
          disabled={index === 0}
          className="px-5 py-2 rounded bg-red-800 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-700 transition"
        >
          Back
        </button>
        <button
          onClick={handleNextClick}
          disabled={selectedOption === null}
          className="px-5 py-2 rounded bg-red-800 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-700 transition"
        >
          Next
        </button>
      </div>
      <p className="text-sm text-gray-600">Question {index + 1} of {filteredQuestions.length}</p>
    </div>
  );
};

export default Quiz;
