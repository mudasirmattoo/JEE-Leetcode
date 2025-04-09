import React, { useState } from "react";
import "./SearchQuestions.css";
import questionsData from "../Assets/quesionsData.js"; 
const SearchQuestions = () => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredQuestions = questionsData.filter(
      (question) =>
        searchTerm.trim().length > 0 &&
        question.title &&
        question.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="explore-questions-container"> 
        {/* Search Box */}
        <div className="explore-search-box">
          <input
            type="text"
            placeholder="Search for over two thousand questions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="explore-search-input"
            style={{ textAlign: 'center' }} // Center the placeholder text
          />
        </div>
  
        {/* Display Questions Only If Search Term Exists */}
        {searchTerm.trim().length > 0 && (
          <div className="explore-questions-list">
            {filteredQuestions.slice(0, 9).length > 0 ? (
              filteredQuestions.slice(0, 9).map((question, index) => (
                <div key={index} className="explore-question-item">
                  <h3 className="explore-question-title">{question.title}</h3>
                  <div className="explore-meta">
                    <span className="explore-topic">{question.topic}</span>
                    <span className={`explore-difficulty ${question.difficulty.toLowerCase()}`}>{question.difficulty}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="explore-no-results">Sorry, Nothing here</p>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default SearchQuestions;