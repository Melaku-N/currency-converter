import React from "react";
import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";

const StatusBar = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="status-bar">
      <Link to="/" className="logo">
        <span className="logo-text">CC</span>
      </Link>
      <div>
        <Link to="/favorites" className="favorites-link">
          Favorites
        </Link>
        <button className="theme-toggle" onClick={toggleTheme}>
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
