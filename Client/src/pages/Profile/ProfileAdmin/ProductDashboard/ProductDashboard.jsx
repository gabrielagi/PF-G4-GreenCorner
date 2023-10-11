import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, deleteProduct, updateProduct,getAllCategories } from '../../../../Redux/actions/product/action';
import styles from './ProductDashboard.module.css';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

import Swal from 'sweetalert2';
import EditProductPopup from './EditProductPopup';

function ProductDashboard() {
  const allProducts = useSelector((state) => state.allProducts);
const allCategories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    
  }, [dispatch]);

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenEditPopup = (product) => {
    setSelectedProduct(product);
    setEditPopupOpen(true);
  };    

  const handleSaveEditedProduct = (editedProduct) => {
    dispatch(updateProduct(editedProduct.product_id, editedProduct));
    setEditPopupOpen(false);
  };

  const confirmDeleteProduct = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: '600px',
      customClass: {
        content: styles['custom-swal-content'],
        confirmButton: styles['custom-swal-button'],
        cancelButton: styles['custom-swal-button'],
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(productId));
        dispatch(getAllProducts())
      }
    });
  };

  return (
    <div>
      <h2>Product List</h2>
      <table className={styles['product-table']}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Available</th>
            <th>Trending</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product) => (
            <tr key={product.product_id}>
              <td className={styles['image-column']}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={styles['product-image']}
                />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.available ? 'Yes' : 'No'}</td>
              <td>{product.isTrending ? 'Yes' : 'No'}</td>
              <td className={styles['actions-column']}>
                <div className={styles.actions}>
                  <button
                    onClick={() => handleOpenEditPopup(product)}
                    className={styles['edit-button']}
                  >
                    <MdEdit /> Edit
                  </button>
                  <button
                    onClick={() => confirmDeleteProduct(product.product_id)}
                    className={styles['delete-button']}
                  >
                    <MdDeleteForever /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pop-up de edición */}
      {selectedProduct && (
        <EditProductPopup
          isOpen={editPopupOpen}
          onRequestClose={() => {
            setEditPopupOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onSave={handleSaveEditedProduct}
          allCategories={allCategories}
        />
      )}
    </div>
  );
}

export default ProductDashboard;