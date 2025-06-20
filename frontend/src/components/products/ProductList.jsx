import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ AJOUTER CETTE LIGNE
import ProductEdit from './ProductEdit';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate(); // ✅ AJOUTER CETTE LIGNE

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
      <h2>Liste des produits</h2>
      <button onClick={() => navigate('/add-product')}>Ajouter</button>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="4">Aucun produit trouvé</td></tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toFixed(2)} €</td>
                  <td>
                    <button onClick={() => setEditingProduct(product)}>Modifier</button>{' '}
                    <button onClick={() => handleDelete(product.id)}>Supprimer</button>
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
