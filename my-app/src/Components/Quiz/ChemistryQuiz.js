import React from 'react'
import { Link } from 'react-router-dom'

const ChemistryQuiz = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center w-full max-w-[1200px] mx-auto my-10 px-4">

      <div className="flex flex-col justify-center items-center bg-gray-100 p-10 shadow-md min-w-[300px] min-h-[300px] text-center font-[Quicksand] transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg">
        <h3 className="text-xl font-semibold">Physical Chemistry</h3>
        <p className="mt-2 text-gray-600">50 Questions - 30min</p>
        <Link
          to="/Quiz/Physical Chemistry"
          className="mt-10 bg-red-900 text-white py-2 px-6 text-base rounded transition-all duration-200 hover:scale-110 hover:bg-red-800"
        >
          Start
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center bg-gray-100 p-10 shadow-md min-w-[300px] min-h-[300px] text-center font-[Quicksand] transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg">
        <h3 className="text-xl font-semibold">Organic Chemistry</h3>
        <p className="mt-2 text-gray-600">50 Questions - 30min</p>
        <Link
          to="/Quiz/Organic Chemistry"
          className="mt-10 bg-red-900 text-white py-2 px-6 text-base rounded transition-all duration-200 hover:scale-110 hover:bg-red-800"
        >
          Start
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center bg-gray-100 p-10 shadow-md min-w-[300px] min-h-[300px] text-center font-[Quicksand] transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg">
        <h3 className="text-xl font-semibold">Inorganic Chemistry</h3>
        <p className="mt-2 text-gray-600">50 Questions - 30min</p>
        <Link
          to="/Quiz/Inorganic Chemistry"
          className="mt-10 bg-red-900 text-white py-2 px-6 text-base rounded transition-all duration-200 hover:scale-110 hover:bg-red-800"
        >
          Start
        </Link>
      </div>

    </div>
  )
}

export default ChemistryQuiz
