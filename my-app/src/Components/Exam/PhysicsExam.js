import React from 'react'
import "./PhysicsExam.css"
import { Link } from 'react-router-dom'
const PhysicsExam = () => {
  return (
    <div className="physicsExam">
    <div className="physics-exam-msg">
    <h4>Want to test yoursef?</h4>
    <h2>Take a full comprehensive exam</h2>
        </div>
    <div className="physics-Exam-box">
    <h5>Level</h5>
    <h2>1</h2>
    <p>50 Questions - 30min</p>
      <Link 
        to={"/Exam/Physical Chemistry"} 
        className="physics-Exam-link"
        style={{ textDecoration: "none" }}>
        Start
      </Link>
    </div>
    <div className="physics-Exam-box">
    <h5>Level</h5>
    <h2>2</h2>
    <p>50 Questions - 30min</p>
      <Link 
        to="/Exam/Organic Chemistry"
        className="physics-Exam-link"
        style={{ textDecoration: "none" }}>
        Start
      </Link>
    </div>
    <div className="physics-Exam-box">
    <h5>Level</h5>
    <h2>3</h2>
    <p>50 Questions - 30min</p>
      <Link 
        to="/Exam/Inorganic Chemistry" 
        className="physics-Exam-link"
        style={{ textDecoration: "none" }}>
        Start
      </Link>
    </div>
        
    </div>
  )
}

export default PhysicsExam
