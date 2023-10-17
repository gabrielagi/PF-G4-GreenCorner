import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../../../Redux/actions/order/order-actions';
import styles from './OrderAdmin.module.css';
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from 'react-icons/bs';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { FiRefreshCcw } from 'react-icons/fi';
import OrderPopup from '../../../../components/OrderPopup/OrderPopup';

function OrderAdmin() {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.allOrders);
  const [sortColumn, setSortColumn] = useState('date'); 
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchEmail, setSearchEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderDetailsPopupOpen, setOrderDetailsPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const ordersWithIndex = allOrders.map((order, index) => ({
    ...order,
    orderIndex: index + 1,
  }));

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedOrders = ordersWithIndex.slice().sort((a, b) => {
    const compareValue = sortDirection === 'asc' ? 1 : -1;
    switch (sortColumn) {
      case 'orders':
        return (a.orderIndex - b.orderIndex) * compareValue;
      case 'email':
        return a.email.localeCompare(b.email) * compareValue;
      case 'status':
        return a.status.localeCompare(b.status) * compareValue;
      case 'shippingAddress':
        return a.shippingAddress.localeCompare(b.shippingAddress) * compareValue;
      case 'total':
        return (a.total - b.total) * compareValue;
      case 'date':
        return  a.date.localeCompare(b.date) * compareValue;
      default:
        return 0;
    }
  });

  const filteredOrders = sortedOrders
    .filter((order) =>
      (statusFilter === 'all' || order.status === statusFilter) &&
      order.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const totalOrders = filteredOrders.length;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getSortArrow = (column) => {
    if (column === sortColumn) {
      return sortDirection === 'asc' ? <BsArrowDownCircleFill /> : <BsArrowUpCircleFill />;
    }
    return null;
  };

  const getStatusCircleClassName = (status) => {
    switch (status) {
      case 'Finish':
        return `${styles.statusCircle} ${styles.statusCircleGreen}`;
      case 'Pending':
        return `${styles.statusCircle} ${styles.statusCircleOrange}`;
      case 'Rejected':
        return `${styles.statusCircle} ${styles.statusCircleRed}`;
      default:
        return styles.statusCircle;
    }
  };

  const handleSearchChange = (e) => {
    setSearchEmail(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setSearchEmail('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handleOpenOrderDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailsPopupOpen(true);
  };

  return (
    <div className={styles.orderAdmin}>
      <h1 className={styles.orderListTitle}>Order List</h1>
      <div className={styles.filters}>
        <FiRefreshCcw className={styles.refreshOrder} onClick={handleRefresh}/>
        <FormControl
          sx={{
            border: "none",
            minWidth: 100,
            "& label": {
              fontSize: "18px",
              color: "rgb(0,0,255)",
            },
            
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-input": {
              fontSize: "15px",
              color: "black",
            },
            "& .MuiSelect-icon": {
              color: "rgb(0,0,255)",
            },
          }}
        >
          <InputLabel htmlFor="statusFilter">Status</InputLabel>
          <Select
            id="statusFilter"
            name="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilter}
            label="Status"
          >
            <MenuItem value="all" style={{ fontSize: '15px' }}>
              All
            </MenuItem>
            <MenuItem value="Finish" style={{ fontSize: '15px' }}>
              Finish
            </MenuItem>
            <MenuItem value="Pending" style={{ fontSize: '15px' }}>
              Pending
            </MenuItem>
            <MenuItem value="Rejected" style={{ fontSize: '15px' }}>
              Rejected
            </MenuItem>
          </Select>
        </FormControl>  
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by Email..."
            value={searchEmail}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.orderTableWrapper}>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort('orders')}>
              <div className={styles.divArrow}>Orders {getSortArrow('orders')}</div>
            </th>
            <th onClick={() => handleSort('email')}>
              <div className={styles.divArrow}>Email {getSortArrow('email')}</div>
            </th>
            <th onClick={() => handleSort('date')}>
              <div className={styles.divArrow}>Date {getSortArrow('date')}</div>
            </th>
            <th onClick={() => handleSort('status')}>
              <div className={styles.divArrow}>Status {getSortArrow('status')}</div>
            </th>
            <th onClick={() => handleSort('shippingAddress')}>
              <div className={styles.divArrow}>Shipping Address {getSortArrow('shippingAddress')}</div>
            </th>
            <th onClick={() => handleSort('total')}>
              <div className={styles.divArrow}>Total {getSortArrow('total')}</div>
            </th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderIndex}</td>
             
              <td>{order.email}</td>
              <td>{order.date}</td>
              <td>
                <div className={getStatusCircleClassName(order.status)} /> {order.status}
              </td>
              <td>{order.shippingAddress}</td>
              <td>$ {order.total}</td>
             
              <td>
                <button
                  className={styles.viewDetailsButton}
                  onClick={() => handleOpenOrderDetails(order)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {selectedOrder && (
        <OrderPopup
          isOpen={orderDetailsPopupOpen}
          onRequestClose={() => {
            setOrderDetailsPopupOpen(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
          
        />
      )}
      <Pagination
        count={Math.ceil(totalOrders / ordersPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        size="large"
        sx={{
          '& .Mui-selected': {
            fontSize: '20px',
          },
          '& .MuiPaginationItem-root': {
            fontSize: '15px',
          },
        }}
      />
    </div>
  );
}

export default OrderAdmin;
