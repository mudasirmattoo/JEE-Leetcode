import React, { useState } from "react";
import './Navbar.css'
import { Link } from "react-router-dom";


const Navbar = () => {
  const [line, setLine] = useState("Home");
  return (
    <nav className="Navbar">
      <ul className="Links">
        {/* Home Button */}
        <li className="Home" onClick={() => setLine("Home")}>
          <Link to="/" className="link">Tango</Link>
          {line === "Home" && <hr />}
        </li>

        {/* Physics Button */}
        <li onClick={() => setLine("Physics")}>
          <Link to="/Physics" className="link">Physics</Link>
          {line === "Physics" && <hr />}
        </li>

        {/* Chemistry Button */}
        <li onClick={() => setLine("Chemistry")}>
          <Link to="/Chemistry" className="link">Chemistry</Link>
          {line === "Chemistry" && <hr />}
        </li>

        {/* SeaMathsrch Button */}
        <li onClick={() => setLine("Maths")}>
          <Link to="/Maths" className="link">Maths</Link>
          {line === "Maths" && <hr />}
        </li>
        <li onClick={() => setLine("Biology")}>
          <Link to="/Biology" className="link">Biology</Link>
          {line === "Biology" && <hr />}
        </li>

        {/* Profile Button */}
        <li className="Profile" onClick={() => setLine("Profile")}>
          <Link to="/Profile" className="link">Profile</Link>
          {line === "Profile" && <hr />}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;