import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [line, setLine] = useState("Home");

  const navItems = [
    { label: "Tango", path: "/", key: "Home", custom: "mr-auto" },
    { label: "Physics", path: "/Physics", key: "Physics" },
    { label: "Chemistry", path: "/Chemistry", key: "Chemistry" },
    { label: "Maths", path: "/Maths", key: "Maths" },
    { label: "Biology", path: "/Biology", key: "Biology" },
    { label: "Profile", path: "/Profile", key: "Profile", custom: "ml-auto mr-5" },
  ];

  return (
    <nav className="flex items-center justify-between bg-gray-300 px-5 py-6 shadow-md font-quicksand">
      <ul className="flex flex-grow justify-center gap-[50px] list-none m-0 p-0">
        {navItems.map(({ label, path, key, custom = "" }) => (
          <li
            key={key}
            className={`relative px-3 cursor-pointer transition-all duration-300 font-bold hover:-translate-y-1 ${custom}`}
            onClick={() => setLine(key)}
          >
            <Link to={path} className="text-[#830202] text-[20px] no-underline hover:text-[#830202]">
              {label}
            </Link>
            {line === key && (
              <hr className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-black rounded-md" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
