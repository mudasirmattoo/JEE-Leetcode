import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./CSS/Quiz.css";
import questionsData from "../Components/Assets/quesionsData.js";

const Quiz = () => { 
    const [index, setIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const { topic } = useParams();  // Get topic from the URL

    // Filter the questions based on the topic
    const filteredQuestions = questionsData.filter((q) => q.topic === topic); 

    if (filteredQuestions.length === 0) {
        return <div>No questions found for this topic.</div>;
    }

    const question = filteredQuestions[index]; // Get the current question

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
            setSelectedOption(null); // Optionally reset selected option when going back
        }
    };

    if (quizCompleted) {
        return (
            <div className="quiz-complete">
                <h2>Quiz Complete!</h2>
                <p>Your score: {score}/{filteredQuestions.length}</p>
            </div>
        );
    }

    return (
        <div className="quiz">
            <h4>{question.title}</h4>
            <ul>
                {question.options.map((option, i) => (
                    <li
                        key={i}
                        className={selectedOption === option ? "active" : ""}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
            <div className="Buttons">
                <button onClick={handleBackClick} disabled={index === 0}>
                    Back
                </button>
                <button onClick={handleNextClick} disabled={selectedOption === null}>
                    Next
                </button>
            </div>
            <div className="question-info">
                <p>Question {index + 1} of {filteredQuestions.length}</p>
            </div>
        </div>
    );
};

export default Quiz;