import React from 'react';
import ChemistrySyllabus from '../Components/Syllabus/ChemistrySyllabus.js';
import ChemistryQuiz from '../Components/Quiz/ChemistryQuiz.js';
import ChemistryExam from '../Components/Exam/ChemistryExam.js';
import ChemistryTest from '../Components/Test/ChemistryTest.js';

const Chemistry = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center text-center py-5 mt-[170px] font-[Quicksand]">
                <h1 className="text-3xl font-semibold">Welcome to Chemistry</h1>
                <h2 className="text-xl text-gray-600 mt-2">Pick your Chemistry challenge for the day</h2>
            </div>

            <ChemistryQuiz />

            <div className="flex flex-col justify-center items-center text-center py-5 mt-[140px] font-[Quicksand]">
                <h2 className="text-2xl font-medium">Learn through Sections</h2>
            </div>

            <ChemistrySyllabus />

            <div className="flex flex-col items-center mt-[185px] font-[Quicksand]">
                <h4 className="text-lg font-semibold">Test Yourself</h4>
            </div>

            <ChemistryTest />
            <ChemistryExam />
        </>
    );
};

export default Chemistry;
