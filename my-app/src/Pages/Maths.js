import React from 'react'
import MathsQuiz from '../Components/Quiz/MathsQuiz.js'
import MathsTest from '../Components/Test/MathsTest.js'
import MathsSyllabus from '../Components/Syllabus/MathsSyllabus.js'
import MathsExam from '../Components/Exam/MathsExam.js'

const Maths = () => {
  return (
    <div>
      <div className="font-quicksand mt-40 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold">Welcome to Mathematics</h1>
        <h2 className="text-xl mt-2">Pick your Maths challenge for the day</h2>
        <MathsQuiz />
        <h4 className="text-lg mt-6">Test Yourself</h4>
      </div>

      <MathsTest />

      <div className="flex flex-col justify-center items-center text-center px-5 py-6 font-quicksand">
        <h3 className="text-xl font-semibold">Learn through Sections</h3>
      </div>

      <MathsSyllabus />
      <MathsExam />
    </div>
  )
}

export default Maths
