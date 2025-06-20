import React, { useState } from 'react';
import axios from 'axios';

function ProductEdit({ product, onCancel, onSave }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation simple
    if (name.trim() === '' || isNaN(price) || price < 0) {
      alert("Veuillez saisir un nom valide et un prix positif.");
      return;
    }

    axios.put(`http://localhost:8080/api/products/${product.id}`, { name, price })
      .then(() => {
        onSave();  // Notifier la sauvegarde réussie
      })
      .catch(err => {
        alert('Erreur lors de la mise à jour : ' + (err.response?.data?.message || err.message || ''));
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="edit-name">Nom :</label>
        <input
          id="edit-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Nom du produit"
        />
      </div>
      <div>
        <label htmlFor="edit-price">Prix :</label>
        <input
          id="edit-price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={e => setPrice(parseFloat(e.target.value) || 0)}
          required
          placeholder="Prix"
        />
      </div>
      <button type="submit">Sauvegarder</button>
      <button type="button" onClick={onCancel}>Annuler</button>
    </form>
  );
}

export default ProductEdit;
