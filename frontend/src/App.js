import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ProductList from './components/products/ProductList';
import AddProduct from './components/products/AddProduct';
import UserList from './components/users/UserList';

function App() {
  return (
    <Router>
      <nav className="main-navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Gestion App</div>
          <div className="navbar-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
              Produits
            </NavLink>
            <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Ajouter
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Utilisateurs
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
