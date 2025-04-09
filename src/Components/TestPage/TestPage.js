import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import allQuestions from "../Assets/quesionsData.js";

import './TestPage.css';



const TestPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { topic, difficulty, numQuestions, time } = location.state || {};

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);

    // Filter questions based on topic and difficulty
    const filteredQuestions = allQuestions
        .filter(q => 
            (topic === "All" || q.topic === topic) && 
            (difficulty === "All" || q.difficulty === difficulty)
        )
        .slice(0, numQuestions);

    useEffect(() => {
        if (filteredQuestions.length === 0) {
            alert("No questions available for the selected criteria.");
            navigate('/');
        }
    }, [filteredQuestions, navigate]);

    useEffect(() => {
        // Initialize answers array based on the actual number of filtered questions
        setAnswers(Array(filteredQuestions.length).fill(null));
    }, [filteredQuestions]);

    const handleAnswer = (answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = answer;
        setAnswers(updatedAnswers);
    };

    const nextQuestion = () => {
        if (currentQuestion < filteredQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const finishTest = () => {
        setShowScore(true);
    };

    const restartTest = () => {
        setCurrentQuestion(0);
        setAnswers(Array(filteredQuestions.length).fill(null));
        setShowScore(false);
    };

    // Guard against undefined question access
    const currentQ = filteredQuestions[currentQuestion] || {};

    // Score Calculation with a safety check
    const score = answers.filter((answer, i) => 
        filteredQuestions[i] && answer === filteredQuestions[i].answer
    ).length;

    return (
        <div className="test-container">
            <h1 className="test-title">{topic} Test - {difficulty}</h1>
            <p>Time: {time} minutes</p>

            {showScore ? (
                <div className="score-summary">
                    <h2>Test Completed!</h2>
                    <p>You scored {score} out of {filteredQuestions.length}</p>
                    
                    <button onClick={restartTest} className="restart-btn">Restart Test</button>
                </div>
            ) : (
                <>
                    {currentQ && (
                        <div className="question-card">
                            <h2>Question {currentQuestion + 1} of {filteredQuestions.length}</h2>
                            <p className="question-text">{currentQ.title}</p>
                            
                            <div className="options-container">
                                {currentQ.options?.map((option, i) => (
                                    <button
                                        key={i}
                                        className={`option-btn ${answers[currentQuestion] === option ? "selected" : ""}`}
                                        onClick={() => handleAnswer(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="navigator">
                        <button onClick={prevQuestion} disabled={currentQuestion === 0} className="nav-btn">
                            Previous
                        </button>

                        <span className="question-counter">
                            {currentQuestion + 1} / {filteredQuestions.length}
                        </span>

                        {currentQuestion < filteredQuestions.length - 1 ? (
                            <button onClick={nextQuestion} className="nav-btn">Next</button>
                        ) : (
                            <button onClick={finishTest} className="finish-btn">Finish Test</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default TestPage;