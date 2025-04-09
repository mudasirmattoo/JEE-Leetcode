import React, { useState } from "react";
import "./CSS/Solve.css";
import questionsData from "../Components/Assets/quesionsData.js";
import { useParams } from "react-router-dom";

const Solve = () => {

     
    const [selectedOption, setSelectedOption] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
  
    const { id } = useParams(); 
    const question = questionsData.find((q) => q.id === parseInt(id));
  
    const handleOptionChange = (option) => {
      setSelectedOption(option);
    };
  
    const handleSubmit = () => {
      if (selectedOption) {
        setIsCorrect(selectedOption === question.answer);
        setIsSubmitted(true);
      }
    };
  
    return (
      
      <div className="solve">
        
        <div className="question-title">
        <h5>{question.title}</h5>
        </div>
        
        
        <div className="options-container">

          <ul>
            {question.options.map((option) => (
              
              <li

                key={option}
                className={selectedOption === option ? "active" : ""}
                onClick={() => handleOptionChange(option)}>

                {option}

              </li>

            ))}
          </ul>

        </div>

        <div className="Buttons">

          {!isSubmitted && <button className="submit-btn" onClick={handleSubmit} disabled={isSubmitted}>
            Submit
          </button>}

        </div>
  
        {isSubmitted && (

        <div className="solve-complete">
        <div className="result-container">
          <p className={isCorrect ? "correct" : "incorrect"}>
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
                
          {!isCorrect && <p className="correct-answer">The correct answer is : {question.answer}</p>}
        </div>
        </div>
        
        )}

      </div>

  );
};

export default Solve;