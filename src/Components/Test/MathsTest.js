import React, { useState } from 'react';
import './MathsTest.css';

const MathsTest = () => {
  
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [numQuestions, setNumQuestions] = useState('');
    const [time, setTime] = useState('');

    const handleStartTest = () => {
      return;
    };

    return (
      <div className="maths-test-container">

        <div className="form-group">
          <label htmlFor="topic">Topic:</label>
          <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">-- All --</option>
            <option value="Mechanics">Mechanics</option>
            <option value="Waves">Waves</option>
            <option value="Electromagnetism">Electromagnetism</option>
            <option value="Optics">Optics</option>
            <option value="Modern maths">Modern maths</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">-- All --</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numQuestions">Number of Questions:</label>
          <input
            type="number"
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            placeholder="Enter number of questions"
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time (minutes):</label>
          <input
            type="number"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time in minutes"
          />
        </div>

        <button className="start-test-button" onClick={handleStartTest}>
          Start Test
        </button>
      </div>
  );
};

export default MathsTest;