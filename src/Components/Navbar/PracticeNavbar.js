import React from 'react'
import './PracticeNavbar.css'

const PracticeNavbar = () => {
  return (
    <div className='PracticeNavbar'>
      <div className="half">
        <p className="inaugural-text">Practice self paced tests</p>
        <li className="PracticeNavbar-li">
          <a href="/Practice" style={{ color: "white", textDecoration: "none" }}>
            Practice
          </a>
        </li>
      </div>

      <div className="separator"></div>

      <div className="half">
        <p className="inaugural-text">Find more than two thousand questions</p>
        <li className="PracticeNavbar-li">
          <a href="/Explore" style={{ color: "white", textDecoration: "none" }}>
            Explore
          </a>
        </li>
      </div>
    </div>
  )
}

export default PracticeNavbar