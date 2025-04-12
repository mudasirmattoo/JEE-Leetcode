import React from 'react';
import './CSS/Chemistry.css';
import ChemistrySyllabus from '../Components/Syllabus/ChemistrySyllabus.js';
import ChemistryQuiz from '../Components/Quiz/ChemistryQuiz.js';
import ChemistryExam from '../Components/Exam/ChemistryExam.js';
import ChemistryTest from '../Components/Test/ChemistryTest.js';
const Chemistry = () => {
    return (
    <>
        <div className="Welcome-message">
                <h1>Welcome to Chemistry</h1>
                <h2>Pick your Chemistry challenge for the day</h2>
        </div>

        <ChemistryQuiz/>

        <div className="syllabus-msg">
            <h2>Learn through Sections</h2>
        </div>

        <ChemistrySyllabus/>
        <div className='chemistry-test-msg'>
          <h4>Test Yourself</h4>
        </div>
        <ChemistryTest/>
        <ChemistryExam/>
        
    
        
    </>
    );
};

export default Chemistry;