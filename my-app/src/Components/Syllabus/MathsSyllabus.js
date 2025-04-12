import React from 'react'
import { Link } from 'react-router-dom'

const MathsSyllabus = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto my-4 p-8 bg-gray-100 font-quicksand text-center shadow-md gap-20 rounded-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Maths Topics</h3>
      <div className="flex flex-col items-center max-w-xs">
        <ul className="list-none flex flex-col items-center gap-5 p-0 m-0">
          <li><Link to="/quiz/maths/algebra" className="text-red-800 text-lg hover:text-black hover:scale-105 transition-all font-semibold">Algebra</Link></li>
          <li><Link to="/quiz/maths/trigonometry" className="text-red-800 text-lg hover:text-black hover:scale-105 transition-all font-semibold">Trigonometry</Link></li>
          <li><Link to="/quiz/maths/calculus" className="text-red-800 text-lg hover:text-black hover:scale-105 transition-all font-semibold">Calculus</Link></li>
          <li><Link to="/quiz/maths/coordinate-geometry" className="text-red-800 text-lg hover:text-black hover:scale-105 transition-all font-semibold">Coordinate Geometry</Link></li>
          <li><Link to="/quiz/maths/vector-3d" className="text-red-800 text-lg hover:text-black hover:scale-105 transition-all font-semibold">Vector 3D</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default MathsSyllabus
