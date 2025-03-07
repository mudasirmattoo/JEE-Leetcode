import React, { useState } from "react";
import { Link } from "react-router-dom";
import questionsData from "../Assets/quesionsData.js";
import "./Questions.css";

const Questions = () => {

    const [difficultyFilter, setDifficultyFilter] = useState("All");
    const [topicFilter, setTopicFilter] = useState("All");
    const [loadMore, setLoadMore] = useState(false);


// Filter logic

    const filteredQuestions = questionsData.filter((question) => {
        
        const matchesDifficulty = difficultyFilter === "All" || question.difficulty === difficultyFilter;
        const matchesTopic = topicFilter === "All" || question.topic === topicFilter;

        return matchesDifficulty && matchesTopic;

    });

  return (

    <div className="questions-section">

{/* Header Section */}

      <div className="filter-header">
        <h6 className="diff">Difficulty</h6>
        
        <select

          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)} 

          className="filter-select">

          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>

        </select>

        <h6 className="topics"> Topics</h6>

        <select

          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)} 

          className="filter-select">

          <option value="All">All Topics</option>
          <option value="PhysicalChemistry">Physical Chemistry</option>
          <option value="Inorganic Chemistry">Inorgaic Chemistry</option>
          <option value="Organic Chemistry">Organic Chemistry</option>

        </select>

      </div>

{/* Question links*/ }
        
        <ul className="questions-list">
        
        {filteredQuestions.slice(0, 10).map((question) => (
            
          <li key={question.id} className="question-item">
            
          <Link to={`/Solve/${question.id}`} className="question-link" style={{ textDecoration: "none" }}>
          <h6>{question.title}</h6>
          </Link>
            
          <div className="question-info">
            
          <p>{question.topic}</p>
          <p className={`difficulty ${question.difficulty.toLowerCase()}`}>{question.difficulty}</p>
            
          </div>
          </li>

        ))}

        {!loadMore && <button onClick={setLoadMore} className="load-more">load more</button>}

        {loadMore 
        && filteredQuestions.slice(10, 50).map((question) => (

            <li key={question.id} className="question-item">

            <Link to={`/Solve/${question.id}`} className="question-link" style={{ textDecoration: "none" }}>
            <h6>{question.title}</h6>
            </Link>

            <div className="question-info">

              <p>{question.topic}</p>
              <p className={`difficulty ${question.difficulty.toLowerCase()}`}>{question.difficulty}</p>

            </div>
            </li>

        ))

        }

      </ul>

    </div>
  );
};

export default Questions;