import { GET_ALL_PRODUCT, GET_PRODUCT_BY_SEARCHBAR, GET_PRODUCT_BY_ID } from "../action-types";

import axios from "axios";

const endpoint = "http://localhost:3001/product";

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_ALL_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getProductByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${endpoint}/?name=${name}`);
      if (Array.isArray(data) && data.length > 0) {
        dispatch({
          type: GET_PRODUCT_BY_SEARCHBAR,
          payload: data,
        });
      } else {
        alert("El Producto no se encuentra en la lista");
      }
    } catch (error) {
      alert("Hubo un error al buscar el Producto por el name");
    }
  };
};

export const getProductById = (id) => {
  console.log(id) 
  return async (dispatch) => {
    
    try {
      const { data } = await axios.get(`${endpoint}/${id}`);
      console.log(id)
      dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: data,
      });
      console.log(id)
    } catch (error) {
      alert("El Producto no se encuentra en la lista");
    }
  };
};
