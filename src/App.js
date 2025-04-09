import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './Pages/Home.js';
import Profile from './Pages/Profile.js';
import Chemistry from './Pages/Chemistry.js';
import Physics from './Pages/Physics.js';
import Solve from './Pages/Solve.js';
import Quiz from './Components/Quiz/Quiz.js';
import Exam from './Pages/Exam.js';
//import Footer from './Components/Footer/Footer';
import Practice from './Pages/Practice.js';
import Maths from './Pages/Maths.js';
import { UserProvider } from './context/UserContext.js';
import ProfileDashboard from './Components/Profile/ProfileDashboard.js';
import Landing from './Components/Landing/Landing.js';
//import SearchNavbar from './Components/Navbar/SearchNavbar.js';
import Explore from './Pages/Explore.js';
import TestPage from './Components/TestPage/TestPage.js';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check auth
  return isAuthenticated ? element : <Navigate to="/profile" replace />;
};

function App() {
  
  return (
    <UserProvider>
      <Router>
        
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/solve/:id" element={<Solve />} />
          <Route path="/Chemistry" element={<Chemistry />} />
          <Route path="/Quiz/:topic" element={<Quiz />} />
          <Route path="/Exam/:topic" element={<Exam />} />
          <Route path="/Physics" element={<Physics />} />
          <Route path="/Maths" element={<Maths />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Practice" element={<Practice />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/test" element={<TestPage />} />
          {/* Hello Mude Laanch */}
          <Route path="/profile/ProfileDashboard" element={<PrivateRoute element={<ProfileDashboard />} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

















/*
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';

function App() {
  const [mode, setMode] = useState('light');  // Set initial mode to 'light'

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  return (
    <>
      <Navbar mode={mode} toggleMode={toggleMode} />
      <div className="container my-3">
        <TextForm mode={mode} heading="Give me your text" />
      </div>
    </>
  );
}

export default App;
*/ 