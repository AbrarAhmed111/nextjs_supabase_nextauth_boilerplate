"use client";
import React from "react";

const Header = ({ isMenuOpen, toggleMenu }) => {
  return (
    <header className={`bg-gray-100 shadow ${isMenuOpen ? "fixed w-full z-50" : "relative"}`}>
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <h1 className="text-2xl font-bold">v_hd</h1>
        <button onClick={toggleMenu} className="px-4 py-2 text-xl border rounded">
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute left-0 w-full h-screen text-white bg-black">
          <ul className="flex flex-col items-start p-6 space-y-4">
            <li>
              <a href="#" className="text-xl underline">Kezdőlap</a>
            </li>
            <li>
              <a href="#" className="text-xl">Rólam</a>
            </li>
            <li>
              <a href="#" className="text-xl underline">Munkáim</a>
            </li>
            <li>
              <a href="#" className="text-xl">Kapcsolat</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
