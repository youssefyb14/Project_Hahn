import React, { useState } from 'react';
import axios from 'axios';

function AddProduct({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/products', {
        name,
        price: parseFloat(price),
      });
      setName('');
      setPrice('');
      if (onProductAdded) {
        onProductAdded(); // pour rafraîchir la liste
      }
    } catch (error) {
      alert('Erreur lors de l\'ajout du produit');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un produit</h2>
      <div>
        <label htmlFor="name">Nom :</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Prix :</label>
        <input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AddProduct;
