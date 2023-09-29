import { GET_ALL_PRODUCT, GET_PRODUCT_BY_SEARCHBAR, GET_PRODUCT_BY_ID,ORDER_BY_NAME, ORDER_BY_PRICE} from "../action-types";

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
      console.log(error.message );
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
  console.log ('llegó al action')

  return async (dispatch) => {
console.log('está por entrar al try')
    try {
      console.log('entró al try')
      const { data } = await axios.get(`${endpoint}/${id}`);
      console.log(data)
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


export function filterByName(payload){
  return{
      type: ORDER_BY_NAME,
      payload
  }
}


export function filterByPrice(payload){
  return{
      type: ORDER_BY_PRICE,
      payload
  }
}