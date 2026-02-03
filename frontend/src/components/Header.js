import React from 'react';
import '../styles/Header.css';

const Header = ({ user, handleLogout }) => {
  return (
    <header className="app-header">
      <h1>Task Management System</h1>
      <div className="user-info">
        <span>Welcome, {user.name} ({user.role})</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </header>
  );
};

export default Header;
