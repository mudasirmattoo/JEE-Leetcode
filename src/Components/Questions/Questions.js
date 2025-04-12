import React, { useState } from "react";
import { Link } from "react-router-dom";
import questionsData from "../Assets/quesionsData.js";
import "./Questions.css";

const Questions = () => {
    const [difficulty, setDifficulty] = useState("All");
    const [topic, setTopic] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    const topics = [
        "Physical Chemistry",
        "Inorganic Chemistry",
        "Organic Chemistry",
        "Analytical Chemistry",
        "Biochemistry",
        "Theoretical Chemistry"
    ];

    const difficultyLevels = ["All", "Easy", "Medium", "Hard"];

    // Toggle difficulty logic
    const toggleDifficulty = () => {
        const currentIndex = difficultyLevels.indexOf(difficulty);
        const nextIndex = (currentIndex + 1) % difficultyLevels.length;
        setDifficulty(difficultyLevels[nextIndex]);
    };

    // Filter logic
    const filteredQuestions = questionsData.filter((question) => {
        const matchesDifficulty = difficulty === "All" || question.difficulty === difficulty;
        const matchesTopic = topic === "" || question.topic.toLowerCase().includes(topic.toLowerCase());
        return matchesDifficulty && matchesTopic;
    });

    // Pagination Logic
    const questionsPerPage = 10;
    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
    const startIndex = (currentPage - 1) * questionsPerPage;
    const currentQuestions = filteredQuestions.slice(startIndex, startIndex + questionsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="filter-container">
                {/* Single Toggle Button */}
                <div className="toggle-button-container">
                    <button 
                        onClick={toggleDifficulty} 
                        className={`toggle-btn ${difficulty.toLowerCase()}`}
                    >
                        {difficulty}
                    </button>
                </div>

                {/* Topic Search */}
                <div className="topic-search">
                    <input
                        type="text"
                        placeholder="Search topic..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="search-box"
                    />
                    {topic && (
                        <div className="suggestions">
                            {topics
                                .filter(t => t.toLowerCase().includes(topic.toLowerCase()))
                                .map((t, index) => (
                                    <div 
                                        key={index} 
                                        className="suggestion-item" 
                                        onClick={() => setTopic(t)}
                                    >
                                        {t}
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>

            <div className="questions-section">
                <ul className="questions-list">
                    {currentQuestions.map((question) => (
                        <li key={question.id} className="question-item">
                            <Link 
                                to={`/Solve/${question.id}`} 
                                className="question-link" 
                                style={{ textDecoration: "none" }}
                            >
                                <h6>{question.title}</h6>
                            </Link>

                            <div className="question-info">
                                <p>{question.topic}</p>
                                <p className={`difficulty ${question.difficulty.toLowerCase()}`}>
                                    {question.difficulty}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Pagination Controls */}
                <div className="pagination-container">
                    <button 
                        onClick={goToPreviousPage} 
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                    &lt;
                    </button>

                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button 
                        onClick={goToNextPage} 
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </>
    );
};

export default Questions;