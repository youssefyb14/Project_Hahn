import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditUser() {
  const [user, setUser] = useState({ firstName: '', lastName: '', username: '', email: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${id}`)
      .then(response => setUser(response.data))
      .catch(() => Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Utilisateur introuvable'
      }));
  }, [id]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/users/${id}`, user)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Utilisateur modifié avec succès',
          confirmButtonText: 'OK'
        }).then(() => navigate('/users'));
      })
      .catch(() => Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur de mise à jour'
      }));
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div>
      <h2>Modifier l'utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" value={user.firstName} onChange={handleChange} required />
        <input name="lastName" value={user.lastName} onChange={handleChange} required />
        <input name="username" value={user.username} onChange={handleChange} required />
        <input name="email" type="email" value={user.email} onChange={handleChange} required />
        <button type="submit">Sauvegarder</button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Annuler</button>
      </form>
    </div>
  );
}

export default EditUser;
