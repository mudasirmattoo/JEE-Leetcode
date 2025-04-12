import React, { useState, useEffect } from 'react'
import { getQuestionsByTopic } from '../../services/api.js';
import { useParams } from 'react-router-dom'

const Quiz = () => {
  const { topic } = useParams()
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const fetchedQuestions = await getQuestionsByTopic(topic)
        setQuestions(fetchedQuestions)
        setLoading(false)
      } catch (err) {
        setError('Failed to load questions. Please try again later.')
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [topic])

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
  }

  if (loading) {
    return <div className="text-center text-lg mt-40">Loading questions...</div>
  }

  if (error) {
    return <div className="text-center text-red-600 mt-40">{error}</div>
  }

  return (
    <div className="max-w-3xl mx-auto mt-32 p-6 bg-white shadow-lg rounded-lg">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-6">You scored {score} out of {questions.length}</p>
          <button 
            onClick={handleRestartQuiz}
            className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-800 transition-all"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-xl font-medium">
            <span>Question {currentQuestion + 1}</span> / {questions.length}
          </div>
          <div className="text-lg font-semibold">
            {questions[currentQuestion].question}
          </div>
          <div className="flex flex-col gap-4">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerClick(option)}
                className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
