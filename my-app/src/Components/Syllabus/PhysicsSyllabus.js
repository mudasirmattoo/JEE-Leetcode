import React from 'react'
import { Link } from 'react-router-dom'

const PhysicsSyllabus = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto my-4 p-8 bg-gray-100 font-quicksand text-center shadow-md gap-20 rounded-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Physics Topics</h3>
      <div className="flex flex-col items-center max-w-xs">
        <ul className="list-none flex flex-col items-center gap-5 p-0 m-0">
          <li><Link to="/quiz/physics/mechanics" className="text-red-800 text-lg hover:text-black hover:scale-105 transition-all font-semibold">Mechanics</Link></li>
          <li><Link to="/quiz/physics/waves" className="text-red-800 text-lg hover:text-black hover:scale-105 transition-all font-semibold">Waves</Link></li>
          <li><Link to="/quiz/physics/electro-magnetism" className="text-red-800 text-lg hover:text-black hover:scale-105 transition-all font-semibold">Electro Magnetism</Link></li>
          <li><Link to="/quiz/physics/optics" className="text-red-800 text-lg hover:text-black hover:scale-105 transition-all font-semibold">Optics</Link></li>
          <li><Link to="/quiz/physics/modern-physics" className="text-red-800 text-lg hover:text-black hover:scale-105 transition-all font-semibold">Modern Physics</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default PhysicsSyllabus
