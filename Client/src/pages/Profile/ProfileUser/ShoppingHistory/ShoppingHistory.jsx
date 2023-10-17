import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { Pagination } from '@mui/material';
import OrderPopup from '../../../../components/OrderPopup/OrderPopup';
import { getOrderByEmail } from '../../../../Redux/actions/order/order-actions';
import styles from './ShoppingHistory.module.css';

function getStatusColor(status) {
  switch (status) {
    case 'Finish':
      return 'green';
    case 'Pending':
      return 'orange';
    case 'Rejected':
      return 'red';
    default:
      return 'gray';
  }
}

function ShoppingHistory() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailsPopupOpen, setOrderDetailsPopupOpen] = useState(false);
  const email = user.email.toString();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getOrderByEmail(email)).then((response) => {
        response ? setOrders(response) : setOrders([]);
      });
    }
  }, [dispatch, email, isAuthenticated]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailsPopupOpen(true);
  };

  return (
    <div className={styles.orderHistory}>
      <h1 className={styles.orderHistoryTitle}>Order History</h1>
      <div className={styles.orderListContainer}>
        {currentOrders && currentOrders.length > 0 ? (
          <div className={styles.orderList}>
            {currentOrders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderDate}>
                    {order.date}
                  </div>
                  <div className={styles.statusCircle} style={{ backgroundColor: getStatusColor(order.status) }}></div>
                  <div className={styles.statusText} style ={{color: getStatusColor(order.status)}}>
                    {order.status}
                  </div>
                </div>
                <div className={styles.orderFlex}>
                  <div className={styles.orderTitle}>Order #{order.id.slice(0, 12)}...</div>
                  <div className={styles.viewDetailsButton}>
                    <button onClick={() => handleViewDetails(order)}>View Details</button>
                  </div>
                </div>
                <div className={styles.orderTotal}>
                  <strong>Total:</strong> ${order.total}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noOrdersMessage}>
            No orders to show.
          </div>
        )}
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
        count={Math.ceil(orders.length / ordersPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        disabled={currentOrders.length === 0} 
        color="success"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
}

export default ShoppingHistory;
