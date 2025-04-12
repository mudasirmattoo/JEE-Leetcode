import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import questionsData from "../Components/Assets/quesionsData.js";

const Exam = ({ initialMinutes = 30 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [ExamCompleted, setExamCompleted] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert("Time's up! Submit your quiz.");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const filteredQuestions = questionsData.filter((q) => q.topic === topic);

  if (filteredQuestions.length === 0) {
    return <div className="text-center mt-40 text-lg text-red-600">No questions found for this topic.</div>;
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
      setExamCompleted(true);
    }
  };

  const handleBackClick = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedOption(null);
    }
  };

  if (ExamCompleted) {
    return (
      <div className="mt-96 mx-auto text-center p-10 bg-gray-100 rounded-lg shadow-md w-[90%] max-w-xl font-[Quicksand]">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Exam Complete!</h2>
        <p className="text-lg text-gray-600">Your score: {score}/{filteredQuestions.length}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto mt-40 p-10 bg-gray-50 shadow-md gap-6 max-w-4xl w-full font-[Quicksand]">
      <div className="text-xl font-semibold text-[#830202]">
        Time Left: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <h4 className="text-lg font-medium text-center">{question.title}</h4>

      <ul className="w-2/5 space-y-3">
        {question.options.map((option, i) => (
          <li
            key={i}
            className={`p-3 rounded border text-center cursor-pointer transition 
              ${selectedOption === option 
                ? "bg-green-600 text-white"
                : "bg-white hover:bg-blue-50 border-gray-300 hover:border-[#830202]"}`}
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
          className="px-5 py-2 bg-[#830202] text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleNextClick}
          disabled={selectedOption === null}
          className="px-5 py-2 bg-[#830202] text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="text-sm text-gray-500">
        Question {index + 1} of {filteredQuestions.length}
      </div>
    </div>
  );
};

export default Exam;
