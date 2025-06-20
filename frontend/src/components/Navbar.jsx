import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Gestion App</div>
        <div className="navbar-links">
          <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Produits
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Utilisateurs
          </NavLink>

          {!user ? (
            <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Connexion
            </NavLink>
          ) : (
            <button onClick={handleLogout} className="nav-link logout-button" style={{background: 'none', border: 'none', cursor: 'pointer', color: 'white'}}>
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
