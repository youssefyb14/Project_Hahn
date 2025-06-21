import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import ProductEdit from './ProductEdit';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate(); 

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Erreur lors du chargement');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      axios.delete(`http://localhost:8080/api/products/${id}`)
        .then(() => fetchProducts())
        .catch(err => alert("Erreur lors de la suppression : " + (err.message || '')));
    }
  };

  if (editingProduct) {
    return (
      <div>
        <h2>Modifier le produit</h2>
        <ProductEdit
          product={editingProduct}
          onCancel={() => setEditingProduct(null)}
          onSave={() => {
            setEditingProduct(null);
            fetchProducts();
          }}
        />
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2>Product List</h2>
      <button onClick={() => navigate('/add-product')}><MdAdd style={{verticalAlign:'middle'}} /> Add</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="4">No products found</td></tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toFixed(2)} €</td>
                  <td>
                    <button onClick={() => setEditingProduct(product)}><MdEdit style={{verticalAlign:'middle'}} /> Edit</button>{' '}
                    <button onClick={() => handleDelete(product.id)}><MdDelete style={{verticalAlign:'middle'}} /> Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
