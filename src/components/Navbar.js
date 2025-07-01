import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ userName, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = (tab) => {
    onSelect(tab);
    setIsOpen(false); // close menu on mobile when clicked
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Welcome, {userName}</div>

      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <button onClick={() => handleMenuClick("mcq")}>MCQ Practice</button>
        <button onClick={() => handleMenuClick("pyq")}>PYQ</button>
        <button onClick={() => handleMenuClick("material")}>Material</button>
        <button onClick={() => handleMenuClick("mindmap")}>Mind Map</button>
      </div>

      <div
        className={`navbar-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
