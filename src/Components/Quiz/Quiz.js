import React, { useState, useEffect } from 'react';
import { getQuestionsByTopic } from '../../services/api.js';
import './Quiz.css';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const fetchedQuestions = await getQuestionsByTopic(topic);
        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (err) {
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]); 

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  if (loading) {
    return <div className="quiz-container">Loading questions...</div>;
  }

  if (error) {
    return <div className="quiz-container">{error}</div>;
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Completed!</h2>
          <p>You scored {score} out of {questions.length}</p>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            {questions.map((question, index) => (
              <div key={index} className="question-text">
                <div className="question-count">
                  <span>Question {index + 1}</span>/{questions.length}
                </div>
                <div>{question.question}</div>
                <div className="answer-section">
                  {question.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerClick(option)}
                      className="answer-button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz; 