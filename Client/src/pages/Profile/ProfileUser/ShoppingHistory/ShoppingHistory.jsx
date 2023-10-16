// ShoppingHistory.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByEmail } from '../../../../Redux/actions/order/order-actions'; 
import styles from './ShoppingHistory.module.css';
import OrderPopup from '../../../../components/OrderPopup/OrderPopup'; 
import { useAuth0 } from "@auth0/auth0-react"; 

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
        setOrders(response);
      });
    }
  }, [dispatch, email, isAuthenticated]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailsPopupOpen(true);
  };

  return (
    <div className={styles.orderHistory}>
      <h1 className={styles.orderHistoryTitle}>Order History</h1>
      {orders.length > 0 ? (
        <div className={styles.orderList}>
          {orders.map((order) => (
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
    </div>
  );
}

export default ShoppingHistory;
