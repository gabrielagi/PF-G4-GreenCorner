import { GET_ALL_ORDERS, GET_ORDER_DETAIL } from "../action-types";

import axios from "axios";

const endpoint = `https://greencorner.onrender.com/order`;
// const endpoint = `http://localhost:3001/order`;

export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_ALL_ORDERS,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
};

export const getOrderByEmail = (email) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${endpoint}?email=${email}`);
      dispatch({
        type: GET_ALL_ORDERS,
        payload: data,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
};

export const getOrderDetail = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${endpoint}/Detail/?id=${orderId}`);
      dispatch({
        type: GET_ORDER_DETAIL,
        payload: data,
      });
      return data;
    } catch (error) {
      console.error("Error al obtener detalles de la orden:", error);
    }
  };
};
