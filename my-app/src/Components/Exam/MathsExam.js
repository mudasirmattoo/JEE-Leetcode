import React from 'react'
import { Link } from 'react-router-dom'

const MathsExam = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto text-center gap-[60px] py-5 font-['Quicksand']">
      <div className="flex flex-col justify-center items-center text-center mt-[100px] mb-[50px]">
        <h4 className="text-[1.2rem] text-[#555] mb-[10px]">Want to test yoursef?</h4>
        <h2 className="text-[1.8rem] text-[#333]">Take a full comprehensive exam</h2>
      </div>

      <div className="flex flex-col justify-center items-center bg-[#f9f9f9] shadow-md w-[80%] min-w-[250px] min-h-[180px] text-center transition duration-300 ease-in-out transform hover:scale-[1.05] hover:shadow-lg p-10 font-['Quicksand']">
        <h5>Level</h5>
        <h2>1</h2>
        <p className="mb-5 text-[1rem] text-[#666]">50 Questions - 30min</p>
        <Link
          to="/Exam/Physical Chemistry"
          className="mt-[10px] inline-block bg-[#830202] text-white py-2 px-5 text-[1rem] no-underline transition duration-300 ease-in-out hover:scale-110"
        >
          Start
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center bg-[#f9f9f9] shadow-md w-[80%] min-w-[250px] min-h-[180px] text-center transition duration-300 ease-in-out transform hover:scale-[1.05] hover:shadow-lg p-10 font-['Quicksand']">
        <h5>Level</h5>
        <h2>2</h2>
        <p className="mb-5 text-[1rem] text-[#666]">50 Questions - 30min</p>
        <Link
          to="/Exam/Organic Chemistry"
          className="mt-[10px] inline-block bg-[#830202] text-white py-2 px-5 text-[1rem] no-underline transition duration-300 ease-in-out hover:scale-110"
        >
          Start
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center bg-[#f9f9f9] shadow-md w-[80%] min-w-[250px] min-h-[180px] text-center transition duration-300 ease-in-out transform hover:scale-[1.05] hover:shadow-lg p-10 font-['Quicksand']">
        <h5>Level</h5>
        <h2>3</h2>
        <p className="mb-5 text-[1rem] text-[#666]">50 Questions - 30min</p>
        <Link
          to="/Exam/Inorganic Chemistry"
          className="mt-[10px] inline-block bg-[#830202] text-white py-2 px-5 text-[1rem] no-underline transition duration-300 ease-in-out hover:scale-110"
        >
          Start
        </Link>
      </div>
    </div>
  )
}

export default MathsExam
