import React, { useState } from "react";
import axios from "axios";

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
        }

        updatedOptions[index].isCorrect = !updatedOptions[index].isCorrect;
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
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Question</h2>
            <form onSubmit={handleSubmit}>
                <label className="block font-semibold">Question:</label>
                <textarea name="question" value={formData.question} onChange={handleInputChange} required className="w-full p-2 border rounded-md mb-4" />

                <label className="block font-semibold">Difficulty:</label>
                <input type="text" name="difficulty" value={formData.difficulty} onChange={handleInputChange} required className="w-full p-2 border rounded-md mb-4" />

                <label className="block font-semibold">Subject:</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full p-2 border rounded-md mb-4" />

                <label className="block font-semibold">Marks:</label>
                <input type="number" name="marks" value={formData.marks} onChange={handleInputChange} required className="w-full p-2 border rounded-md mb-4" />

                <label className="block font-semibold">Negative Marks:</label>
                <input type="number" name="negativeMarks" value={formData.negativeMarks} onChange={handleInputChange} className="w-full p-2 border rounded-md mb-4" />

                <label className="block font-semibold">Upload Image (Optional):</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />

                <label className="block font-semibold">Options:</label>
                {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input type="text" value={option.text} onChange={(e) => updateOptionText(index, e.target.value)} required className="w-full p-2 border rounded-md" />
                        <button type="button" onClick={() => toggleCorrectOption(index)} className={`ml-2 px-4 py-2 rounded-md text-white ${option.isCorrect ? "bg-green-600" : "bg-gray-400"}`}>
                            ✅
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addOption} className="mt-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">+ Add Option</button>

                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md mt-4">Submit Question</button>
            </form>
        </div>
    );
};

export default QuestionForm;
