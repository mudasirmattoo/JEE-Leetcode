import React from 'react'
import { Link } from 'react-router-dom'

const ChemistrySyllabus = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto p-20 bg-gray-100 font-quicksand text-center mb-10 shadow-md rounded-lg gap-20">
      <div className="flex justify-evenly w-full mb-10 flex-wrap gap-10">
        <div className="flex flex-col items-center max-w-[200px] text-center">
          <h5 className="text-[20px] font-bold mb-5 text-gray-800">Physical Chemistry</h5>
          <ul className="flex flex-col items-center gap-2">
            <li><Link to="/quiz/physical/thermodynamics" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">States of Matter</Link></li>
            <li><Link to="/quiz/physical/electrochemistry" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Atomic Structure</Link></li>
            <li><Link to="/quiz/physical/kinetics" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Chemical Equilibrium</Link></li>
            <li><Link to="/quiz/physical/thermodynamics" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Thermodynamics</Link></li>
            <li><Link to="/quiz/physical/electrochemistry" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Electrochemistry</Link></li>
            <li><Link to="/quiz/physical/kinetics" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Chemical Kinetics</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center max-w-[200px] text-center">
          <h5 className="text-[20px] font-bold mb-5 text-gray-800">Inorganic Chemistry</h5>
          <ul className="flex flex-col items-center gap-2">
            <li><Link to="/quiz/inorganic/periodic-table" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Periodic Table</Link></li>
            <li><Link to="/quiz/inorganic/coordination-compounds" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Coordination Compounds</Link></li>
            <li><Link to="/quiz/inorganic/bonding" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Hydrogen</Link></li>
            <li><Link to="/quiz/inorganic/bonding" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">S block elements</Link></li>
            <li><Link to="/quiz/inorganic/bonding" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">P block elements</Link></li>
            <li><Link to="/quiz/inorganic/bonding" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">d and f block elements</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center max-w-[200px] text-center">
          <h5 className="text-[20px] font-bold mb-5 text-gray-800">Organic Chemistry</h5>
          <ul className="flex flex-col items-center gap-2">
            <li><Link to="/quiz/organic/hydrocarbons" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Hydrocarbons</Link></li>
            <li><Link to="/quiz/organic/alcohols" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Haloalkane and Haloarene</Link></li>
            <li><Link to="/quiz/organic/alcohols" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Alcohol, Phenol and Ether</Link></li>
            <li><Link to="/quiz/organic/alcohols" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Aldehyde, Ketones and Acid</Link></li>
            <li><Link to="/quiz/organic/alcohols" className="text-[#830202] hover:text-black transition-transform duration-300 hover:scale-105">Amines</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChemistrySyllabus;
