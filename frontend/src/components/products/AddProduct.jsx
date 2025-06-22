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
   
    if (!name.trim() || !price.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Required fields',
        text: 'All fields are required.'
      });
      return;
    }
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid price',
        text: 'Price must be a positive number.'
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
        title: 'Success',
        text: 'Product added successfully',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/products');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error adding product'
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit"><MdAdd style={{verticalAlign:'middle'}} /> Add</button>
      </form>
    </>
  );
}

export default AddProduct;
