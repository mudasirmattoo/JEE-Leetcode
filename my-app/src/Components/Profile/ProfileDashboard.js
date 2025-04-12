import React from 'react';
import SolvedQuestions from '../SolvedQuestions/SolvedQuestions.js';
import { useUser } from '../../context/UserContext.js';

const ProfileDashboard = ({ onLogout }) => {
  const { userProfile, loading, error } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalSolved = 112;
  const solvedDays = [2, 5, 7, 11, 15, 22, 27, 32, 35, 37, 41, 45, 52, 57, 62, 67, 72, 77, 82, 87, 92, 97, 102, 107, 112];

  const isDaySolved = (day) => solvedDays.includes(day);
  const daysArray = Array.from({ length: 180 }, (_, index) => (
    <div
      key={index}
      className={`w-[10px] h-[10px] rounded-sm ${isDaySolved(index + 1) ? 'bg-green-500' : 'bg-gray-200'}`}
    ></div>
  ));

  return (
    <>
      <div className="flex justify-center items-start mt-10">
        <div className="bg-gray-100 shadow-md p-6 max-w-5xl w-full flex-grow ml-0 mr-[350px] font-quicksand">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center ml-24 mr-36">
              <img
                src="../Assets/Screenshot 2025-02-05 at 11.14.48 AM.png"
                alt="Profile"
                className="w-12 h-12 rounded-full mr-10"
              />
              <div>
                <h3 className="text-lg font-semibold">{userProfile.name}</h3>
                <p className="text-sm">Rank: {userProfile.rank}</p>
                <p className="text-sm">Email: {userProfile.email}</p>
                <p className="text-sm">Role: {userProfile.role}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-5">
              <div className="text-sm">Total Questions solved: <strong>{totalSolved}</strong></div>
              <div className="grid grid-cols-[repeat(30,_10px)] gap-[3px]">
                {daysArray}
              </div>
            </div>

            <div className="flex flex-col items-center bg-gray-100 shadow-md p-6 ml-64">
              <button className="mb-2 px-4 py-2 bg-white text-black hover:text-[#830202] transition font-medium">
                Edit Profile
              </button>
              <button className="mb-2 px-4 py-2 bg-white text-black hover:text-[#830202] transition font-medium">
                Subscribe
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-white text-black hover:text-[#830202] transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center font-quicksand">
        <SolvedQuestions />
      </div>
    </>
  );
};

export default ProfileDashboard;
