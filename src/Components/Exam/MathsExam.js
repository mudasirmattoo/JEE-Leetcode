import React from 'react'
import "./MathsExam.css"
import { Link } from 'react-router-dom'
const MathsExam = () => {
  return (
    <div className="mathsExam">
    <div className="maths-exam-msg">
    <h4>Want to test yoursef?</h4>
    <h2>Take a full comprehensive exam</h2>
        </div>
    <div className="maths-Exam-box">
    <h5>Level</h5>
    <h2>1</h2>
    <p>50 Questions - 30min</p>
      <Link 
        to={"/Exam/Physical Chemistry"} 
        className="maths-Exam-link"
        style={{ textDecoration: "none" }}>
        Start
      </Link>
    </div>
    <div className="maths-Exam-box">
    <h5>Level</h5>
    <h2>2</h2>
    <p>50 Questions - 30min</p>
      <Link 
        to="/Exam/Organic Chemistry"
        className="maths-Exam-link"
        style={{ textDecoration: "none" }}>
        Start
      </Link>
    </div>
    <div className="maths-Exam-box">
    <h5>Level</h5>
    <h2>3</h2>
    <p>50 Questions - 30min</p>
      <Link 
        to="/Exam/Inorganic Chemistry" 
        className="maths-Exam-link"
        style={{ textDecoration: "none" }}>
        Start
      </Link>
    </div>
        
    </div>
  )
}

export default MathsExam
