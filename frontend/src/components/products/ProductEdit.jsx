import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductEdit({ product, onCancel, onSave }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation améliorée
    if (name.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Validation error',
        text: 'Name is required.'
      });
      return;
    }
    if (isNaN(price) || price <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation error',
        text: 'Price must be a positive number.'
      });
      return;
    }

    axios.put(`http://localhost:8080/api/products/${product.id}`, { name, price })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product updated successfully',
          confirmButtonText: 'OK'
        }).then(() => {
          onSave();
        });
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error updating product: ' + (err.response?.data?.message || err.message || '')
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="edit-name">Name:</label>
        <input
          id="edit-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Product name"
        />
      </div>
      <div>
        <label htmlFor="edit-price">Price:</label>
        <input
          id="edit-price"
          type="number"
          step="0.01"
          min="0.01"
          value={price}
          onChange={e => setPrice(parseFloat(e.target.value) || 0)}
          required
          placeholder="Price"
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default ProductEdit;
