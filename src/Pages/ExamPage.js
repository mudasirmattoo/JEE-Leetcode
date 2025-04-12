import React, { useState, useEffect } from 'react';
import { getRandomQuestionsByTopic } from '../services/api.js';
import '../CSS/ExamPage.css';

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // Fetch 5 random questions from each topic
        const topics = [
          'Inorganic Chemistry',
          'Organic Chemistry',
          'Physical Chemistry',
          'Physics and Mathematics'
        ];
        
        const allQuestions = await Promise.all(
          topics.map(topic => getRandomQuestionsByTopic(topic, 5))
        );
        
        setQuestions(allQuestions.flat());
        setLoading(false);
      } catch (err) {
        setError('Failed to load exam questions. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(question => {
      if (userAnswers[question.id] === question.answer) {
        score++;
      }
    });
    return score;
  };

  if (loading) {
    return <div className="exam-container">Loading exam questions...</div>;
  }

  if (error) {
    return <div className="exam-container">{error}</div>;
  }

  return (
    <div className="exam-container">
      {showResults ? (
        <div className="results-section">
          <h2>Exam Results</h2>
          <p>Your score: {calculateScore()} out of {questions.length}</p>
          {questions.map((question, index) => (
            <div key={question.id} className="question-review">
              <p>Question {index + 1}: {question.question}</p>
              <p>Your answer: {userAnswers[question.id] || 'Not answered'}</p>
              <p>Correct answer: {question.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="question-section">
            <h2>Question {currentQuestion + 1} of {questions.length}</h2>
            <p>{questions[currentQuestion]?.question}</p>
            <div className="options-section">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(questions[currentQuestion].id, option)}
                  className={`option-button ${
                    userAnswers[questions[currentQuestion].id] === option ? 'selected' : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="navigation-section">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
            {currentQuestion === questions.length - 1 && (
              <button onClick={handleSubmit} className="submit-button">
                Submit Exam
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ExamPage; 