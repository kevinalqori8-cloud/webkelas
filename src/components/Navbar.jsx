// src/components/Navbar.js
import React from 'react';
import './Navbar.css'; // Kita buat file CSS-nya nanti

const Navbar = ({ sections, activeSection }) => {
  // Fungsi untuk melakukan scroll halus
  const handleScroll = (event, targetId) => {
    event.preventDefault(); // Mencegah lompatan instan
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeSection === section.id ? 'active' : ''}
              onClick={(e) => handleScroll(e, section.id)}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
