import React, { useState } from "react";
import questionsData from "../Components/Assets/quesionsData.js";
import { useParams } from "react-router-dom";

const Solve = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { id } = useParams();
  const question = questionsData.find((q) => q.id === parseInt(id));

  if (!question) {
    return <div className="text-center mt-20 text-lg text-red-500">Question not found!</div>;
  }

  const handleOptionChange = (option) => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setIsCorrect(selectedOption === question.answer);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center mt-40 mx-auto px-8 py-10 max-w-2xl bg-gray-100 font-sans shadow-lg space-y-6">

      <div className="w-full text-center bg-gray-100 p-4">
        <h5 className="text-xl font-semibold text-gray-800">{question.title}</h5>
      </div>

      <div className="w-full md:w-1/2">
        <ul className="space-y-2">
          {question.options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionChange(option)}
              className={`px-4 py-2 border rounded text-center cursor-pointer transition-all
                ${selectedOption === option ? "bg-green-700 text-white" : "hover:bg-blue-100 border-gray-300"}
                ${isSubmitted && option === question.answer ? "bg-green-500 text-white" : ""}
              `}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center gap-4">
        {!isSubmitted && (
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className="px-5 py-2 bg-red-800 text-white rounded hover:bg-red-900 disabled:bg-gray-400"
          >
            Submit
          </button>
        )}
      </div>

      {isSubmitted && (
        <div className="text-center text-sm mt-4 space-y-2">
          <p className={`${isCorrect ? "text-green-600" : "text-red-600"} font-medium`}>
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
          {!isCorrect && (
            <p className="text-gray-700">The correct answer is: <span className="font-semibold">{question.answer}</span></p>
          )}
        </div>
      )}
    </div>
  );
};

export default Solve;
