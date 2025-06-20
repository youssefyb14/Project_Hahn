import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = () => {
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      axios.delete(`http://localhost:8080/api/users/${id}`)
        .then(() => fetchUsers())
        .catch(err => alert("Erreur de suppression"));
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  return (
    <div className="table-container">
      <h2>Liste des utilisateurs</h2>
      <button onClick={() => navigate('/add-user')}>Ajouter</button>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nom</th><th>Prénom</th><th>Username</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="6">Aucun utilisateur trouvé</td></tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td><td>{user.lastName}</td><td>{user.firstName}</td>
                <td>{user.username}</td><td>{user.email}</td>
                <td>
                  <button onClick={() => navigate(`/edit-user/${user.id}`)}>Modifier</button>
                  <button onClick={() => handleDelete(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
