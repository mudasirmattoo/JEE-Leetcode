import React, { useState } from "react";
import axios from "axios";

const QuestionForm = () => {
    const [formData, setFormData] = useState({
        question: "",
        difficulty: "",
        subject: "",
        marks: "",
        negativeMarks: "",
        questionType: "single",
        options: [{ text: "", isCorrect: false }],
        explanation: "",
        solved: false,
    });

    const [image, setImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const addOption = () => {
        setFormData({
            ...formData,
            options: [...formData.options, { text: "", isCorrect: false }],
        });
    };

    const updateOptionText = (index, value) => {
        const updatedOptions = [...formData.options];
        updatedOptions[index].text = value;
        setFormData({ ...formData, options: updatedOptions });
    };

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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form 
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl space-y-5"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">Add Question</h2>

                <div>
                    <label className="block font-medium mb-1">Question</label>
                    <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Upload Image (Optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Difficulty</label>
                        <input
                            type="text"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Marks</label>
                        <input
                            type="number"
                            name="marks"
                            value={formData.marks}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Negative Marks</label>
                        <input
                            type="number"
                            name="negativeMarks"
                            value={formData.negativeMarks}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">Question Type</label>
                    <select
                        name="questionType"
                        value={formData.questionType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="single">Single Correct</option>
                        <option value="multiple">Multiple Correct</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-2">Options</label>
                    <div className="space-y-2">
                        {formData.options.map((option, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) => updateOptionText(index, e.target.value)}
                                    required
                                    className="flex-grow p-2 border border-gray-300 rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleCorrectOption(index)}
                                    className={`px-3 py-1 rounded text-white ${
                                        option.isCorrect ? "bg-green-600" : "bg-red-600"
                                    }`}
                                >
                                    {option.isCorrect ? "✓" : "×"}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={addOption}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add Option
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default QuestionForm;
