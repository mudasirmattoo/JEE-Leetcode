import React from 'react'
import './PhysicsQuiz.css'
import { Link } from 'react-router-dom'

const PhysicsQuiz = () => {
  return (
    <div className="physics-quiz-grid">

        <div className="physics-quiz-box">
          <h3>Mechanics</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to={"/Quiz/Physical Chemistry"} 
            className="physics-quiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        <div className="physics-quiz-box">
          <h3>Electromagnetism</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to="/Quiz/Organic Chemistry"
            className="physics-quiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        <div className="physics-quiz-box">
          <h3>Waves</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to="/Quiz/Inorganic Chemistry" 
            className="physics-quiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        

        </div>
  )
}

export default PhysicsQuiz
