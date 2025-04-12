import React from 'react'
import './MathsQuiz.css'
import { Link } from 'react-router-dom'

const MathsQuiz = () => {
  return (
    <div className="maths-quiz-grid">

        <div className="maths-quiz-box">
          <h3>Algebra</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to={"/Quiz/Physical Chemistry"} 
            className="maths-quiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        <div className="maths-quiz-box">
          <h3>Calculus</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to="/Quiz/Organic Chemistry"
            className="maths-quiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        <div className="maths-quiz-box">
          <h3>Trigonometry</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to="/Quiz/Inorganic Chemistry" 
            className="maths-quiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        

        </div>
  )
}

export default MathsQuiz
