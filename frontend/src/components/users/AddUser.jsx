import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function AddUser() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!user.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!user.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!user.username.trim()) newErrors.username = "Le nom d'utilisateur est requis";
    if (!user.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Format de l'email invalide";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // effacer erreur en cours
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios.post('http://localhost:8080/api/users', user)
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: 'Utilisateur ajouté avec succès',
      confirmButtonText: 'OK'
    }).then(() => navigate('/users'));
  })
  .catch(() => Swal.fire({
    icon: 'error',
    title: 'Erreur',
    text: "Erreur lors de l'ajout"
  }));
};
  return (
    <div>
      <h2>Ajouter un utilisateur</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="Prénom"
          />
          {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        </div>

        <div>
          <input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Nom"
          />
          {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        </div>

        <div>
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Nom d'utilisateur"
          />
          {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
        </div>

        <div>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddUser;
