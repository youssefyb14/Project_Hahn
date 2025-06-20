import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [user, setUser] = useState({ firstName: '', lastName: '', username: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/users', user)
      .then(() => navigate('/users'))
      .catch(() => alert("Erreur lors de l'ajout"));
  };

  return (
    <div>
      <h2>Ajouter un utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" value={user.firstName} onChange={handleChange} placeholder="Prénom" required />
        <input name="lastName" value={user.lastName} onChange={handleChange} placeholder="Nom" required />
        <input name="username" value={user.username} onChange={handleChange} placeholder="Username" required />
        <input name="email" type="email" value={user.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddUser;
