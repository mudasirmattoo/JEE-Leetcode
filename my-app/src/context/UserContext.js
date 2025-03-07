import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProgress, setUserProgress] = useState({
    totalQuestionsSolved: 0,
    streakDays: 0,
    lastLoginDate: null,
    subjectProgress: {
      physics: { solved: 0, total: 0 },
      chemistry: { solved: 0, total: 0 },
      maths: { solved: 0, total: 0 }
    }
  });

  const login = (userData) => {
    setUser(userData);
    // Update last login date
    const today = new Date().toISOString();
    updateLoginStreak(today);
  };

  const logout = () => {
    setUser(null);
    setUserProgress({
      totalQuestionsSolved: 0,
      streakDays: 0,
      lastLoginDate: null,
      subjectProgress: {
        physics: { solved: 0, total: 0 },
        chemistry: { solved: 0, total: 0 },
        maths: { solved: 0, total: 0 }
      }
    });
  };

  const updateLoginStreak = (currentDate) => {
    if (!userProgress.lastLoginDate) {
      setUserProgress(prev => ({
        ...prev,
        streakDays: 1,
        lastLoginDate: currentDate
      }));
      return;
    }

    const lastLogin = new Date(userProgress.lastLoginDate);
    const today = new Date(currentDate);
    const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      setUserProgress(prev => ({
        ...prev,
        streakDays: prev.streakDays + 1,
        lastLoginDate: currentDate
      }));
    } else if (diffDays > 1) {
      setUserProgress(prev => ({
        ...prev,
        streakDays: 1,
        lastLoginDate: currentDate
      }));
    }
  };

  const updateQuestionsSolved = (subject) => {
    setUserProgress(prev => ({
      ...prev,
      totalQuestionsSolved: prev.totalQuestionsSolved + 1,
      subjectProgress: {
        ...prev.subjectProgress,
        [subject]: {
          ...prev.subjectProgress[subject],
          solved: prev.subjectProgress[subject].solved + 1
        }
      }
    }));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      userProgress, 
      login, 
      logout,
      updateQuestionsSolved 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 