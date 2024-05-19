// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/admin/home">Admin Home</Link></li>
          <li><Link to="/">Client Home</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
