import React, { useState } from 'react';

const ChemistryTest = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [time, setTime] = useState('');

  const handleStartTest = () => {
    return;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg font-sans">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Chemistry Test</h2>

      <div className="mb-4">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Topic:</label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="">-- All --</option>
          <option value="Mechanics">Mechanics</option>
          <option value="Waves">Waves</option>
          <option value="Electromagnetism">Electromagnetism</option>
          <option value="Optics">Optics</option>
          <option value="Modern Physics">Modern Physics</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="">-- All --</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 mb-1">Number of Questions:</label>
        <input
          type="number"
          id="numQuestions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          placeholder="Enter number of questions"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time (minutes):</label>
        <input
          type="number"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter time in minutes"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400"
        />
      </div>

      <button
        onClick={handleStartTest}
        className="w-full py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200 transform hover:scale-105"
      >
        Start Test
      </button>
    </div>
  );
};

export default ChemistryTest;
