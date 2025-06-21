import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdPerson, MdLogout } from 'react-icons/md';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    Swal.fire({
      title: 'Déconnexion',
      text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, se déconnecter',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprimer les tokens et données utilisateur
        localStorage.removeItem('user');
        localStorage.removeItem('github_token');
        
        Swal.fire({
          icon: 'success',
          title: 'Déconnexion réussie',
          text: 'Vous avez été déconnecté avec succès.',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/login');
        });
      }
    });
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getProviderIcon = (provider) => {
    switch (provider) {
      case 'google':
        return <FaGoogle size={12} style={{ marginLeft: '4px' }} />;
      case 'github':
        return <FaGithub size={12} style={{ marginLeft: '4px' }} />;
      default:
        return null;
    }
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
            <>
              <div className="user-info">
                <div className="user-avatar">
                  {user.picture ? (
                    <img 
                      src={user.picture} 
                      alt="Avatar" 
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <MdPerson size={18} />
                  )}
                </div>
                <span className="user-name">
                  {user.name || user.given_name || 'Utilisateur'}
                  {getProviderIcon(user.provider)}
                </span>
              </div>
              <button onClick={handleLogout} className="logout-button">
                <MdLogout size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
