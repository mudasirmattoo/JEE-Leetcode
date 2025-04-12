import React, { useState } from "react";
import { Link } from "react-router-dom";
import questionsData from "../Assets/quesionsData.js";

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

    const toggleDifficulty = () => {
        const currentIndex = difficultyLevels.indexOf(difficulty);
        const nextIndex = (currentIndex + 1) % difficultyLevels.length;
        setDifficulty(difficultyLevels[nextIndex]);
    };

    const filteredQuestions = questionsData.filter((question) => {
        const matchesDifficulty = difficulty === "All" || question.difficulty === difficulty;
        const matchesTopic = topic === "" || question.topic.toLowerCase().includes(topic.toLowerCase());
        return matchesDifficulty && matchesTopic;
    });

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

    const getButtonClass = () => {
        switch (difficulty.toLowerCase()) {
            case "easy":
                return "bg-green-600";
            case "medium":
                return "bg-yellow-700 text-white";
            case "hard":
                return "bg-red-900";
            default:
                return "bg-gray-500";
        }
    };

    const getTextColor = (level) => {
        switch (level.toLowerCase()) {
            case "easy":
                return "text-green-600";
            case "medium":
                return "text-yellow-500";
            case "hard":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-5 px-6 py-8 bg-gray-100 shadow-md pb-0">
                <div className="flex items-center">
                    <button
                        onClick={toggleDifficulty}
                        className={`px-6 py-2 text-white font-medium text-lg transition-transform duration-200 transform hover:-translate-y-1 rounded ${getButtonClass()}`}
                    >
                        {difficulty}
                    </button>
                </div>

                <div className="relative w-72">
                    <input
                        type="text"
                        placeholder="Search topic..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 font-[Quicksand]"
                    />
                    {topic && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md max-h-40 overflow-y-auto z-10 font-[Quicksand]">
                            {topics
                                .filter(t => t.toLowerCase().includes(topic.toLowerCase()))
                                .map((t, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => setTopic(t)}
                                    >
                                        {t}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full mx-auto py-4 px-5 bg-gray-100 font-[Quicksand] text-center">
                <ul className="list-none p-0 m-0">
                    {currentQuestions.map((question) => (
                        <li
                            key={question.id}
                            className="flex justify-between items-center p-4 mb-3 bg-white shadow-sm transition-all duration-200 rounded-xl w-[98%] mx-auto"
                        >
                            <Link
                                to={`/Solve/${question.id}`}
                                className="no-underline text-red-900 text-base hover:text-black"
                            >
                                <h6>{question.title}</h6>
                            </Link>
                            <div className="text-right">
                                <p className="text-gray-600 text-base m-0">{question.topic}</p>
                                <p className={`font-[Quicksand] ${getTextColor(question.difficulty)} m-0`}>
                                    {question.difficulty}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center items-center gap-5 mt-6">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 text-white text-sm rounded font-[Quicksand] ${
                            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-red-900 hover:bg-red-800"
                        }`}
                    >
                        &lt;
                    </button>

                    <span className="text-gray-700 text-base font-[Quicksand]">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 text-white text-sm rounded font-[Quicksand] ${
                            currentPage === totalPages
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-red-900 hover:bg-red-800"
                        }`}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </>
    );
};

export default Questions;
