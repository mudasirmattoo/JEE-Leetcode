import React from 'react'
import './ChemistrySyllabus.css'
import { Link } from 'react-router-dom'

const ChemistrySyllabus = () => {
    
  return (
    
    <div className="chemistrySyllabus">
            <div className="headings">
                <div className="chemistry-section">
                    <h5>Physical Chemistry</h5>
                    <ul>
                        <li><Link to="/quiz/physical/thermodynamics">States of Matter</Link></li>
                        <li><Link to="/quiz/physical/electrochemistry">Atomic Structure</Link></li>
                        <li><Link to="/quiz/physical/kinetics">Chemical Equilibrium</Link></li>
                        <li><Link to="/quiz/physical/thermodynamics">Thermodynamics</Link></li>
                        <li><Link to="/quiz/physical/electrochemistry">Electrochemistry</Link></li>
                        <li><Link to="/quiz/physical/kinetics">Chemical Kinetics</Link></li>
                        
                    </ul>
                </div>
                <div className="chemistry-section">
                    <h5>Inorganic Chemistry</h5>
                    <ul>
                        <li><Link to="/quiz/inorganic/periodic-table">Periodic Table</Link></li>
                        <li><Link to="/quiz/inorganic/coordination-compounds">Coordination Compounds</Link></li>
                        <li><Link to="/quiz/inorganic/bonding">Hydrogen</Link></li>
                        <li><Link to="/quiz/inorganic/bonding">S block elements</Link></li>
                        <li><Link to="/quiz/inorganic/bonding">P block elements</Link></li>
                        <li><Link to="/quiz/inorganic/bonding">d and f block elements</Link></li>
                    </ul>
                </div>
                <div className="chemistry-section">
                    <h5>Organic Chemistry</h5>
                    <ul>
                        <li><Link to="/quiz/organic/hydrocarbons">Hydrocarbons</Link></li>
                        <li><Link to="/quiz/organic/alcohols">Haloalkane and Haloarene.</Link></li>
                        <li><Link to="/quiz/organic/alcohols">Alcohol, Phenol and Ether</Link></li>
                        <li><Link to="/quiz/organic/alcohols">Aldehyde, Ketones and Acid.</Link></li>
                        <li><Link to="/quiz/organic/alcohols">Amines</Link></li>
                   </ul>
                    
                </div>
            </div>
        </div>
        
  )
}

export default ChemistrySyllabus
