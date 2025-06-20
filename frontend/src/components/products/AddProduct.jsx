import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

function AddProduct({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation côté client
    if (!name.trim() || !price.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Champs requis',
        text: 'Tous les champs sont obligatoires.'
      });
      return;
    }
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Prix invalide',
        text: 'Le prix doit être un nombre positif.'
      });
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/products', {
        name,
        price: priceValue,
      });
      setName('');
      setPrice('');
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Produit ajouté avec succès',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/products');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Erreur lors de l'ajout du produit"
      });
    }
  };

  return (
    <>
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
        <button type="submit"><MdAdd style={{verticalAlign:'middle'}} /> Ajouter</button>
      </form>
    </>
  );
}

export default AddProduct;
