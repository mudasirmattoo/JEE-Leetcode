import React from 'react'
import './CSS/Explore.css'
import Questions from '../Components/Questions/Questions.js'
import SearchQuestions from '../Components/SearchQuestions/SearchQuestions.js'

const Explore = () => {
  return (
    <div>
        <SearchQuestions/>
            <Questions/>
        
    </div>
  )
}

export default Explore
