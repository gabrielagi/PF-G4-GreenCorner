import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './OrderPopup.module.css';
import { useDispatch } from 'react-redux';
import { getOrderDetail } from '../../Redux/actions/order/order-actions';

Modal.setAppElement("#root");

function OrderPopup({ order, isOpen, onRequestClose }) {
    const dispatch = useDispatch();
    const [orderDetails, setOrderDetails] = useState([]);

    let circleColor = "";
    let statusText = "";
    if (order.status === "Finish") {
        circleColor = "green";
        statusText = "Finish";
    } else if (order.status === "Pending") {
        circleColor = "orange";
        statusText = "Pending";
    } else if (order.status === "Rejected") {
        circleColor = "red";
        statusText = "Rejected";
    }

    useEffect(() => {
        dispatch(getOrderDetail(order.id)).then((res) => {
            setOrderDetails(res);
        });
    }, [dispatch]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Order Details"
            className={styles['order-modal-content']}
            overlayClassName={styles['order-modal-overlay']}
        >
            <div className={styles['order-header']}>
                <h2 className={styles['order-modal-title']}>Order Details</h2>
                <div className={styles['status-content']}>
                    <div className={styles['status-indicator']}>
                        <div className={styles['status-circle']} style={{ background: circleColor }}></div>
                        <span className={styles['status-text']} style={{ color: circleColor, fontWeight: 'bold' }}>{statusText}</span>
                    </div>
                    <div className={styles['status-date']}>{order.date}</div>
                </div>
            </div>
            <div className={styles['order-modal-content-container']}>
                <div className={styles['order-modal-section']}>
                    <strong>ID:</strong> {order.id}
                </div>
                <div className={styles['order-modal-section']}>
                    <strong>Email:</strong> {order.email}
                </div>
                <div className={styles['order-modal-section']}>
                    <strong>Shipping Address:</strong> {order.shippingAddress}
                </div>
                
            
            <div className={styles['order-modal-section2']}>
                <strong>Products:</strong>
            </div>
            <div className='grid grid-cols-4 text-center'>
                <p className='py-2'></p>
                <p className='py-2'>Name</p>
                <p className='py-2'>Amount</p>
                <p className='py-2'>Price</p>
                </div>
                <div className={styles['product-list-container']}>
                {orderDetails && orderDetails.length > 0 ? (
                    orderDetails.map((detail) => (
                    <div key={detail.id} className="grid grid-cols-4 rounded-lg shadow-md border border-gray-300 my-2">
                        <div className='w-[80px] h-[80px] '>
                        <img className='w-full h-full rounded-[5px]' src={detail.Product.images[0]} alt={detail.Product.name} />
                        </div>
                        <div className='break-words text-center py-4'>
                        <div className='mx-auto'>{detail.Product.name}</div>
                        </div>
                        <div className='flex items-center justify-center py-4'>
                        {detail.quantity}
                        </div>
                        <div className='flex items-center justify-center py-4'>
                        $ {detail.unit_price}
                        </div>
                    </div>
                    ))
                ) : (
                    <div>No order details available.</div>
                )}
                </div>
                <div className={styles['order-modal-section3']}>
                    <strong>Total:</strong> $ {order.total}
                </div>
                </div>
            <button
                className={styles['order-modal-close-button']}
                onClick={onRequestClose}
            >
                Close
            </button>
        </Modal>
    );
}

export default OrderPopup;