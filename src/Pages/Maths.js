import React from 'react'
import MathsQuiz from '../Components/Quiz/MathsQuiz.js'
import './CSS/Maths.css'
import MathsTest from '../Components/Test/MathsTest.js'
import MathsSyllabus from '../Components/Syllabus/MathsSyllabus.js'
import MathsExam from '../Components/Exam/MathsExam.js'

const Maths = () => {
  return (
    <div>
      <div className='maths-container'>
        <div className='maths-test-msg'>
          <h1>Welcome to Mathematics</h1>
          <h2>Pick your Maths challenge for the day</h2>
          <MathsQuiz/>
          <h4>Test Yourself</h4>
          
        </div>
        <MathsTest/>        

        <div className="syllabus-msg">
            <h3>Learn through Sections</h3>
        </div>
        <MathsSyllabus/>
        <MathsExam/>
      </div>
    </div>
  )
}

export default Maths
