import React from 'react';
import PhysicsTest from '../Components/Test/PhysicsTest.js';
import PhysicsSyllabus from '../Components/Syllabus/PhysicsSyllabus.js';
import PhysicsExam from '../Components/Exam/PhysicsExam.js';
import PhysicsQuiz from '../Components/Quiz/PhysicsQuiz.js';

const Physics = () => {
  return (
    <div className="font-quicksand">
      <div className="flex flex-col items-center mt-40 text-center">
        <h1 className="text-3xl font-bold">Welcome to Physics</h1>
        <h2 className="text-xl mt-2">Pick your Physics challenge for the day</h2>
        <PhysicsQuiz />
        <h4 className="text-lg mt-6">Test Yourself</h4>
      </div>

      <PhysicsTest />

      <div className="flex flex-col justify-center items-center text-center px-5 py-6">
        <h3 className="text-xl font-semibold">Learn through Sections</h3>
      </div>

      <PhysicsSyllabus />
      <PhysicsExam />
    </div>
  );
};

export default Physics;
