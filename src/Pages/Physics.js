import React from 'react';
import './CSS/Physics.css';
import PhysicsTest from '../Components/Test/PhysicsTest.js';
import PhysicsSyllabus from '../Components/Syllabus/PhysicsSyllabus.js';
import PhysicsExam from '../Components/Exam/PhysicsExam.js';
import PhysicsQuiz from '../Components/Quiz/PhysicsQuiz.js';

const Physics = () => {


    return (
      <div className='physics-container'>
        <div className='physics-test-msg'>
          <h1>Welcome to Physics</h1>
          <h2>Pick your Physics challenge for the day</h2>
          <PhysicsQuiz/>
          <h4>Test Yourself</h4>
        </div>
        <PhysicsTest/>
        <div className="syllabus-msg">
            <h3>Learn through Sections</h3>
        </div>
        <PhysicsSyllabus/>
        <PhysicsExam/>
      </div>
  );
};

export default Physics;