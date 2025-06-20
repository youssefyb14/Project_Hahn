import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import ProductList from './components/products/ProductList';
import AddProduct from './components/products/AddProduct';
import UserList from './components/users/UserList';
import AddUser from './components/users/AddUser';

function App() {
  return (
    <Router>
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
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
