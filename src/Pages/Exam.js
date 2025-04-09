import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import "./CSS/Exam.css";
import questionsData from "../Components/Assets/quesionsData.js";

const Exam = ({ initialMinutes = 30 }) => { 

    // Timer

    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

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

    const [index, setIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [ExamCompleted, setExamCompleted] = useState(false);

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
            setExamCompleted(true);
        }
    };

    const handleBackClick = () => {
        if (index > 0) {
            setIndex(index - 1);
            setSelectedOption(null); // Optionally reset selected option when going back
        }
    };

    if (ExamCompleted) {
        return (
            <div className="Exam-complete">
                <h2>Exam Complete!</h2>
                <p>Your score: {score}/{filteredQuestions.length}</p>
            </div>
        );
    }

    return (
        <div className="Exam">

            <div className="timer">
            Time Left: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

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

export default Exam;