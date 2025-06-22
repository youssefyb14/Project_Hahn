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
        title: 'Error',
        text: 'User not found'
      }));
  }, [id]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation frontend stricte
    if (!user.firstName.trim() || !user.lastName.trim() || !user.username.trim() || !user.email.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation error',
        text: 'All fields are required.'
      });
      return;
    }
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Validation error',
        text: 'Email is not valid.'
      });
      return;
    }
    axios.put(`http://localhost:8080/api/users/${id}`, user)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User updated successfully',
          confirmButtonText: 'OK'
        }).then(() => navigate('/users'));
      })
      .catch(() => Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Update failed'
      }));
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" value={user.firstName} onChange={handleChange} required placeholder="First name" />
        <input name="lastName" value={user.lastName} onChange={handleChange} required placeholder="Last name" />
        <input name="username" value={user.username} onChange={handleChange} required placeholder="Username" />
        <input name="email" type="email" value={user.email} onChange={handleChange} required placeholder="Email" />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
}

export default EditUser;
