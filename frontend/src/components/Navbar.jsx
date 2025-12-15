import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('token');
    navigate('/login');
    setShowMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setShowMenu(false)}>
          <span className="logo-icon">📝</span>
          <span className="logo-text">SubmiTrack</span>
        </Link>

        <button 
          className="menu-toggle" 
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle menu"
        >
          {showMenu ? '✕' : '☰'}
        </button>

        <div className={`navbar-content ${showMenu ? 'active' : ''}`}>
          <div className="navbar-links">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setShowMenu(false)}
            >
              📚 Dashboard
            </Link>
          </div>

          <div className="navbar-user">
            <div className="user-info">
              <div className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
              <div className="user-details">
                <span className="user-name">{user?.name}</span>
                <span className="user-role">
                  {user?.role === 'teacher' ? '🏫 Instructor' : '👨‍🎓 Student'}
                </span>
              </div>
            </div>

            <button 
              onClick={handleLogout} 
              className="logout-btn"
              aria-label="Logout"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
