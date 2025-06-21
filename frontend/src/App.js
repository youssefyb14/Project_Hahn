import React from 'react';
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
