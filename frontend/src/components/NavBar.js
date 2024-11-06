import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className={`navbar ${isActive ? 'active' : ''}`}>
      <div className="logo">Disaster Management Hub</div>
      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className="nav-links">
        <li className="nav-item"><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li className="nav-item"><Link to="/MessageBoard" onClick={toggleMenu}>Message Board</Link></li>
        <li className="nav-item"><Link to="/resources" onClick={toggleMenu}>Resources</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
