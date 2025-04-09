import React from 'react'
import './PhysicsSyllabus.css'
 import { Link } from 'react-router-dom'

const PhysicsSyllabus = () => {
    
  return (
    <div className="PhysicsSyllabus">
                
                <div className="physics-section">
                    <ul>
                        <li><Link to="/quiz/inorganic/periodic-table">Mechanics</Link></li>
                        <li><Link to="/quiz/inorganic/coordination-compounds">Waves</Link></li>
                        <li><Link to="/quiz/inorganic/bonding">Electro Magnetism</Link></li>
                        <li><Link to="/quiz/inorganic/bonding">Optics</Link></li>
                        <li><Link to="/quiz/inorganic/bonding">Modern Physics</Link></li>
                    </ul>
                </div>
                

        </div>
  )
}

export default PhysicsSyllabus
