import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [line, setLine] = useState("Home");

  const navItems = [
    { name: "Home", to: "/", customClass: "mr-auto font-bold" },
    { name: "Physics", to: "/Physics" },
    { name: "Chemistry", to: "/Chemistry" },
    { name: "Maths", to: "/Maths" },
    { name: "Biology", to: "/Biology" },
    { name: "Profile", to: "/Profile", customClass: "ml-auto font-bold mr-5" }
  ];

  return (
    <nav className="flex justify-between items-center bg-[#f8f9fa] px-5 py-6 shadow font-quicksand">
      <ul className="flex gap-12 list-none p-0 m-auto flex-grow justify-center">
        {navItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setLine(item.name)}
            className={`relative cursor-pointer transition-all duration-300 hover:-translate-y-1 px-3 ${
              item.customClass || ""
            }`}
          >
            <Link
              to={item.to}
              className="no-underline text-[#830202] text-[20px] font-medium transition-colors duration-300"
            >
              {item.name}
            </Link>
            {line === item.name && (
              <hr className="w-full h-[3px] rounded bg-black absolute bottom-[-5px] left-0" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
