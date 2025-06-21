import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProductList from './components/products/ProductList';
import AddProduct from './components/products/AddProduct';
import UserList from './components/users/UserList';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
import LoginPage from './components/Auth/LoginPage';
import GitHubCallbackPage from './components/Auth/GitHubCallbackPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/Auth/PrivateRoute';

function AppContent() {
  const location = useLocation();

  // Expiration de session après 30 minutes
  useEffect(() => {
    const SESSION_DURATION_MINUTES = 30;
    const user = localStorage.getItem('user');
    const loginTime = localStorage.getItem('login_time');
    if (user && loginTime) {
      const now = Date.now();
      const elapsed = (now - parseInt(loginTime, 10)) / 1000 / 60; // minutes
      if (elapsed > SESSION_DURATION_MINUTES) {
        localStorage.removeItem('user');
        localStorage.removeItem('github_token');
        localStorage.removeItem('login_time');
        window.location.href = '/login';
      }
    }
  }, [location]);

  // Déconnexion automatique à la fermeture ou au changement d'onglet
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('github_token');
      localStorage.removeItem('login_time');
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  // Ne pas afficher Navbar sur la page /login et /github/callback
  const hideNavbar = location.pathname === '/login' || location.pathname === '/github/callback';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/github/callback" element={<GitHubCallbackPage />} />

        <Route 
          path="/products" 
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add-product" 
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add-user" 
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit-user/:id" 
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
