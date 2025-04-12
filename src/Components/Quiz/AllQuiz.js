import React from 'react'
import './AllQuiz.css'
import { Link } from 'react-router-dom'

const AllQuiz = () => {
  return (
    <div className="AllQuiz-grid">

        <div className="AllQuiz-box">
          <h3>Physics</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to={"/Quiz/Physical Chemistry"} 
            className="AllQuiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        <div className="AllQuiz-box">
          <h3>Chemistry</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to="/Quiz/Organic Chemistry"
            className="AllQuiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>

        <div className="AllQuiz-box">
          <h3>Mathematics</h3>
          <p>50 Questions - 30min</p>
          <Link 
            to="/Quiz/Inorganic Chemistry" 
            className="AllQuiz-link"
            style={{ textDecoration: "none" }}>
            Start
          </Link>
        </div>
        


        

        </div>
  )
}

export default AllQuiz
