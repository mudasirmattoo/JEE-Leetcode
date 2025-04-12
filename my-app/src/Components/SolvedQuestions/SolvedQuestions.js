import React from 'react';

const solvedQuestions = [
  { id: 1, title: "Question 1: What is React?", date: "2023-01-01" },
  { id: 2, title: "Question 2: Explain useState.", date: "2023-01-05" },
  { id: 3, title: "Question 3: What is a component?", date: "2023-01-10" },
  { id: 4, title: "Question 4: How to manage state?", date: "2023-01-15" },
  { id: 5, title: "Question 5: What is JSX?", date: "2023-01-20" },
];

const SolvedQuestions = () => {
  return (
    <>
      <h3 className="mt-12 mb-8 text-center font-quicksand text-2xl font-semibold text-[#830202]">
        Solved Questions
      </h3>
      <div className="w-4/5 mx-auto p-4 bg-gray-100 rounded-md font-quicksand">
        <ul>
          {solvedQuestions.map((question) => (
            <li
              key={question.id}
              className="flex justify-between items-center py-2 border-b border-gray-300 last:border-b-0"
            >
              <span className="text-base text-gray-800">{question.title}</span>
              <span className="text-sm text-gray-500">{question.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SolvedQuestions;
