import React from 'react'
import './SolvedQuestions.css'
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
    <h3 className='heading'> Solved Questions </h3>
        <div className="solved-questions">
          
          <ul>
            {solvedQuestions.map(question => (
              <li key={question.id} className="solved-question-item">
                <span>{question.title}</span>
                <span className="solved-date">{question.date}</span>
              </li>
            ))}
          </ul>
        </div>
    </>
    
  )
}

export default SolvedQuestions
