import React from 'react';
// import "./PhysicsExam.css";
import { Link } from 'react-router-dom';

const levels = [
  { level: 1, subject: "Mechanics" },
  { level: 2, subject: "Electrodynamics" },
  { level: 3, subject: "Modern Physics" },
];

const PhysicsExam = () => {
  return (
    <div className="physicsExam">
      <div className="physics-exam-msg">
        <h4>Want to test yourself?</h4>
        <h2>Take a full comprehensive exam</h2>
      </div>

      {levels.map(({ level, subject }) => (
        <div className="physics-Exam-box" key={level}>
          <h5>Level</h5>
          <h2>{level}</h2>
          <p>50 Questions - 30min</p>
          <Link
            to={`/Exam/${subject}`}
            className="physics-Exam-link"
            style={{ textDecoration: "none" }}
          >
            Start
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PhysicsExam;
