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
    if (!user.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!user.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!user.username.trim()) newErrors.username = 'Username is required';
    if (!user.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = 'Invalid email format';
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
      title: 'Success',
      text: 'User added successfully',
      confirmButtonText: 'OK'
    }).then(() => navigate('/users'));
  })
  .catch(() => Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Error adding user'
  }));
};
  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
          {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        </div>

        <div>
          <input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
          {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        </div>

        <div>
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
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

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddUser;
