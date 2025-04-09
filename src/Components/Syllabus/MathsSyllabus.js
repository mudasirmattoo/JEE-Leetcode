import React from 'react'
import './MathsSyllabus.css'
 import { Link } from 'react-router-dom'

const MathsSyllabus = () => {
    
  return (
    <div className="mathsSyllabus">
                
                <div className="maths-section">
                    <ul>
                        <li><Link to="/quiz/inorganic/periodic-table">Algebra</Link></li>
                        <li><Link to="/quiz/inorganic/coordination-compounds">Trigonometry</Link></li>
                        <li><Link to="/quiz/inorganic/bonding">Calculus</Link></li>
                        <li><Link to="/quiz/inorganic/bonding">Coordinate Geometry</Link></li>
                        <li><Link to="/quiz/inorganic/bonding">Vetcor 3D</Link></li>
                    </ul>
                </div>
                

        </div>
  )
}

export default MathsSyllabus
