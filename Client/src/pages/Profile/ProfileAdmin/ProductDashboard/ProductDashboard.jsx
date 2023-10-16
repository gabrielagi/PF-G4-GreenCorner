import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, deleteProduct, updateProduct, getAllCategories } from '../../../../Redux/actions/product/action';
import styles from './ProductDashboard.module.css';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import EditProductPopup from './EditProductPopup';
import Pagination from "@mui/material/Pagination";
import { FiRefreshCcw } from 'react-icons/fi';
import { deleteFavoriteBD } from '../../../../Redux/actions/user/user-actions';

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
  const [searchValue, setSearchValue] = useState("");
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [refreshTable, setRefreshTable] = useState(false); 

  useEffect(() => {
    if (refreshTable) {
      setCurrentPage(1);
      setSortColumn('name');
      setSortDirection('asc');
      setRefreshTable(false);
      
    }
  }, [refreshTable]);

  const handleOpenEditPopup = (product) => {
    setSelectedProduct(product);
    setEditPopupOpen(true);
  };

  const handleSaveEditedProduct = (editedProduct) => {
    dispatch(updateProduct(editedProduct.product_id, editedProduct))
      .then(() => {
        setRefreshTable(true); 
        dispatch(getAllProducts());
      })
      .catch((error) => {
        console.error("Error al editar el producto: ", error);
      });
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
      iconColor: '#d33',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) { 
        dispatch(deleteFavoriteBD(productId))
        dispatch(deleteProduct(productId))
       .then(() => {
            setRefreshTable(true); 
            dispatch(getAllProducts());
          })
          .catch((error) => {
            console.error("Error al eliminar el producto: ", error);
          });
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = allProducts
    .filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()));

  const totalProducts = filteredProducts.length;

  const sortedProducts = filteredProducts.slice()
    .sort((a, b) => {
      const compareValue = sortDirection === 'asc' ? 1 : -1;
      return a[sortColumn] > b[sortColumn] ? compareValue : -compareValue;
    });

  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleHeaderClick = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortArrow = (column) => {
    if (column === sortColumn) {
      return sortDirection === 'asc' ? <BsArrowDownCircleFill /> : <BsArrowUpCircleFill />;
    }
    return null;
  };

  const handleRefreshTable = () => {
    setSearchValue(""); 
    setSortColumn('name'); 
    setSortDirection('asc'); 
    setRefreshTable(true); 
  };


  return (
    <div className={styles.productDashboard}>
    <h1 className={styles.productListTitle}>Product List</h1>
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchValue}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      <button onClick={handleRefreshTable} className={styles.refreshButton}>
        <FiRefreshCcw />
      </button>
    </div>
    <div className={styles.tableWrapper}>
      <table className={styles.productTable}>
      <thead>
    <tr>
      <th onClick={() => handleHeaderClick('image')}>Image</th>
      <th onClick={() => handleHeaderClick('name')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:"space-between"}}>
          Name {getSortArrow('name')}
        </div>
      </th>
      <th onClick={() => handleHeaderClick('price')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:"space-between"}}>
          Price {getSortArrow('price')}
        </div>
      </th>
      <th onClick={() => handleHeaderClick('stock')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:"space-between"}}>
          Stock {getSortArrow('stock')}
        </div>
      </th>
      <th onClick={() => handleHeaderClick('available')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:"space-between"}}>
          Available {getSortArrow('available')}
        </div>
      </th>
      <th onClick={() => handleHeaderClick('isTrending')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:"space-between"}}>
          Trending {getSortArrow('isTrending')}
        </div>
      </th>
      <th>Actions</th>
    </tr>
  </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.product_id}>
              <td className={styles.imageColumn}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={styles.productImage}
                />
              </td>
              <td className={styles.nameColumn}>{product.name}</td>
              <td className={styles.priceColumn}>${product.price}</td>
              <td className={styles.stockColumn}>{product.stock}</td>
              <td className={styles.availableColumn}>{product.available ? 'Yes' : 'No'}</td>
              <td className={styles.trendingColumn}>{product.isTrending ? 'Yes' : 'No'}</td>
              <td className={styles.actionsColumn}>
                <div className={styles.actions}>
                  <button
                    onClick={() => handleOpenEditPopup(product)}
                    className={styles.editButton}
                  >
                    <MdEdit /> Edit
                  </button>
                  <button
                    onClick={() => confirmDeleteProduct(product.product_id)}
                    className={styles.deleteButton}
                  >
                    <MdDeleteForever /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

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

      <Pagination
        count={Math.ceil(totalProducts / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="success"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        size="large"
        sx={{
          "& .Mui-selected": {
            fontSize: "20px",
          },
          "& .MuiPaginationItem-root": {
            fontSize: "15px",
          },
        }}
      />
    </div>
  );
}

export default ProductDashboard
