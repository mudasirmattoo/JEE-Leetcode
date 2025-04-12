import React from 'react'
import './ChemistryQuiz.css'
import { Link } from 'react-router-dom'

const ChemistryQuiz = () => {
  return (
    <div className="chemistry-quiz-grid">

        <div className="chemistry-quiz-box">
          <h3>Physical Chemistry</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to={"/Quiz/Physical Chemistry"} 
            className="chemistry-quiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        <div className="chemistry-quiz-box">
          <h3>Organic Chemistry</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to="/Quiz/Organic Chemistry"
            className="chemistry-quiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        <div className="chemistry-quiz-box">
          <h3>Inorganic Chemistry</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to="/Quiz/Inorganic Chemistry" 
            className="chemistry-quiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        

        </div>
  )
}

export default ChemistryQuiz
