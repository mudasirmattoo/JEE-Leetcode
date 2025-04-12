import React, { useState } from "react";
import axios from "axios";
import './AdminQuestionForm.css'

const QuestionForm = () => {
    const [formData, setFormData] = useState({
        question: "",
        difficulty: "",
        subject: "",
        marks: "",
        negativeMarks: "",
        questionType: "single", // single or multiple 
        options: [{ text: "", isCorrect: false }],
        explanation: "",
        solved: false,
    });

    const [image, setImage] = useState(null);

    // Handles input change for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handles image file selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Adds a new option dynamically
    const addOption = () => {
        setFormData({
            ...formData,
            options: [...formData.options, { text: "", isCorrect: false }],
        });
    };

    // Updates an option's text
    const updateOptionText = (index, value) => {
        const updatedOptions = [...formData.options];
        updatedOptions[index].text = value;
        setFormData({ ...formData, options: updatedOptions });
    };

    // Toggles correct answer marking
    const toggleCorrectOption = (index) => {
        const updatedOptions = [...formData.options];

        if (formData.questionType === "single") {
            updatedOptions.forEach((option) => (option.isCorrect = false));
            updatedOptions[index].isCorrect = true;
        } else {
            updatedOptions[index].isCorrect = !updatedOptions[index].isCorrect;
        }

        setFormData({ ...formData, options: updatedOptions });
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("question", formData.question);
        data.append("difficulty", formData.difficulty);
        data.append("subject", formData.subject);
        data.append("marks", formData.marks);
        data.append("negativeMarks", formData.negativeMarks);
        data.append("questionType", formData.questionType);
        data.append("options", JSON.stringify(formData.options));
        data.append("correctAnswers", JSON.stringify(formData.options.filter(o => o.isCorrect)));
        data.append("explanation", formData.explanation);
        data.append("solved", formData.solved);

        if (image) {
            data.append("image", image);
        }

        try {
            const response = await axios.post("http://localhost:9080/add-question", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Question Added:", response.data);
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    return (
        <div className="question-form-container">
            <div className="question-form">
                <form onSubmit={handleSubmit}>
                    <label>Question:</label>
                    <textarea 
                        name="question" 
                        value={formData.question} 
                        onChange={handleInputChange} 
                        required 
                        style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none" }}

                    />
                    <label>Upload Image (Optional):</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                    />
                    <label>Subject:</label>
                    <input 
                        type="text" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleInputChange} 
                        required 
                    />
                    <div className="row">
                <div className="column">
                    <label>Difficulty:</label>
                    <input 
                        type="text" 
                        name="difficulty" 
                        value={formData.difficulty} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="column">
                    <label>Type:</label>
                    <select 
                        name="questionType" 
                        value={formData.questionType} 
                        onChange={handleInputChange}
                        style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none" }}
                    >
                        <option value="single">Single Correct</option>
                        <option value="multiple">Multiple Correct</option>
                    </select>
                </div>
            </div>
            
        <div className="row">
            <div className="column">
                
                <label>Marks:</label>
                <input 
                    type="number" 
                    name="marks" 
                    value={formData.marks} 
                    onChange={handleInputChange} 
                    required 
                />
            </div>
            <div className="column">
                
                <label>Negative Marks:</label>
                <input 
                    type="number" 
                    name="negativeMarks" 
                    value={formData.negativeMarks} 
                    onChange={handleInputChange} 
                />
            </div>
        </div>

                    

                    <label>Options:</label>
                    <div className="options-container">
                        {formData.options.map((option, index) => (
                            <div key={index} className="option-item">
                                <input 
                                    type="text" 
                                    value={option.text} 
                                    onChange={(e) => updateOptionText(index, e.target.value)} 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="correct-option-btn"
                                    onClick={() => toggleCorrectOption(index)}
                                >
                                    {option.isCorrect ? '✓' : '×'}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button 
                        type="button" 
                        className="add-option-btn" 
                        onClick={addOption}
                    >
                        Add Option
                    </button>
                    
                        <br></br>
                        <br></br>
                        
                    <button type="submit" className="submit-btn">
                        Submit 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestionForm;
