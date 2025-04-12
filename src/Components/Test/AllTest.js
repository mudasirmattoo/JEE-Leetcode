import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllTest.css';

const AllTest = () => {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [numQuestions, setNumQuestions] = useState('');
    const [time, setTime] = useState('');
    
    const navigate = useNavigate();

    const handleStartTest = () => {
        if (!topic || !difficulty || !numQuestions || !time) {
            alert("Please fill all fields before starting the test.");
            return;
        }

        // Navigate to TestPage with state
        navigate('/test', {
            state: {
                topic,
                difficulty,
                numQuestions: parseInt(numQuestions),
                time: parseInt(time)
            }
        });
    };

    return (
        <>
            <div className="AllTest-test-container">

                <div className="form-group">
                    <label htmlFor="topic">Topic</label>
                    <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} style={{ textAlign: 'center' }}>
                        <option value="">All</option>
                        <option value="Mechanics">Mechanics</option>
                        <option value="Waves">Waves</option>
                        <option value="Electromagnetism">Electromagnetism</option>
                        <option value="Organic Chemistry">Organic Chemistry</option>
                        <option value="Biochemistry">Biochemistry</option>
                        <option value="Algebra">Algebra</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="difficulty">Difficulty</label>
                    <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{ textAlign: 'center' }}>
                        <option value="">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="numQuestions">Number of Questions</label>
                    <input
                        type="number"
                        id="numQuestions"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                        placeholder="Choose for yourself"
                        style={{ textAlign: 'center' }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                        type="number"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="Enter time in minutes"
                        style={{ textAlign: 'center' }}
                    />
                </div>
            </div>

            <button className="AllTest-start-test-button" onClick={handleStartTest}>
                Start Test
            </button>
        </>
    );
};

export default AllTest;