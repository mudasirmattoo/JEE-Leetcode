import React from 'react'
import { Link } from 'react-router-dom'

const ChemistryExam = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto text-center gap-[60px] mt-[140px] py-5 font-[quicksand]">
      
      <div className="flex flex-col justify-center items-center mt-[100px] mb-[50px] text-center">
        <h4 className="text-[1.2rem] text-[#555] mb-[10px]">Want to test yoursef?</h4>
        <h2 className="text-[1.8rem] text-[#333]">Take a full comprehensive Chemistry exam</h2>
      </div>

      <div className="flex flex-col justify-center items-center bg-[#f9f9f9] shadow-md w-4/5 min-w-[250px] min-h-[180px] text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg px-10 py-10 font-[quicksand]">
        <h5 className="mb-2 text-[1rem] text-[#333]">Level</h5>
        <h2 className="text-[1.8rem] text-[#333]">1</h2>
        <p className="mb-5 text-[1rem] text-[#666]">50 Questions - 30min</p>
        <Link 
          to={"/Exam/Physical Chemistry"} 
          className="mt-2 inline-block bg-[#830202] text-white px-5 py-2 text-[1rem] transition-all duration-300 ease-in-out hover:scale-110"
        >
          Start
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center bg-[#f9f9f9] shadow-md w-4/5 min-w-[250px] min-h-[180px] text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg px-10 py-10 font-[quicksand]">
        <h5 className="mb-2 text-[1rem] text-[#333]">Level</h5>
        <h2 className="text-[1.8rem] text-[#333]">2</h2>
        <p className="mb-5 text-[1rem] text-[#666]">50 Questions - 30min</p>
        <Link 
          to="/Exam/Organic Chemistry" 
          className="mt-2 inline-block bg-[#830202] text-white px-5 py-2 text-[1rem] transition-all duration-300 ease-in-out hover:scale-110"
        >
          Start
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center bg-[#f9f9f9] shadow-md w-4/5 min-w-[250px] min-h-[180px] text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg px-10 py-10 font-[quicksand]">
        <h5 className="mb-2 text-[1rem] text-[#333]">Level</h5>
        <h2 className="text-[1.8rem] text-[#333]">3</h2>
        <p className="mb-5 text-[1rem] text-[#666]">50 Questions - 30min</p>
        <Link 
          to="/Exam/Inorganic Chemistry" 
          className="mt-2 inline-block bg-[#830202] text-white px-5 py-2 text-[1rem] transition-all duration-300 ease-in-out hover:scale-110"
        >
          Start
        </Link>
      </div>

    </div>
  )
}

export default ChemistryExam
