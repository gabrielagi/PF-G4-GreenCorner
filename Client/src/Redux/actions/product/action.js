import { 
  GET_ALL_PRODUCT,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_ID,
  POST_PRODUCT,
  GET_CATEGORIES,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  RESET_ALL_PRODUCT,
} from "../action-types";

import axios from "axios";

const endpoint = "http://localhost:3001/product";
const categories = "http://localhost:3001/category"

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

export const resetAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      
      dispatch({
        type: RESET_ALL_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error.message );
    }
  };
};

export function getProductByName(name){
  return async function (dispatch) {
    const response = await axios.get(endpoint +"?name=" + name);
    dispatch({
      type: GET_PRODUCT_BY_NAME,
      payload: response.data,
    });
    return response.data;
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

export const addProduct = (productdata) => {
  return async (dispatch) => {

    try {
      const { data } = await axios.post( endpoint, productdata)
      dispatch({
        type: POST_PRODUCT,
        payload: data

      })
    } catch (error) {
      alert ("Hubo un problema al crear el producto")
    }

  }

}

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(categories);
      dispatch({
        type: GET_CATEGORIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${endpoint}/${id}`);
      dispatch( {
        type: DELETE_PRODUCT_BY_ID,
        payload: {
          data: data,
          id: id
        },
      })
    } catch (error) {
      console.log(error.message);
      alert("Hubo un problema eliminando el producto")
    }
    }
} 
export const updateProduct = (id, updatedProductData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${endpoint}/${id}`, updatedProductData);
      dispatch( {
        type: UPDATE_PRODUCT_BY_ID,
        payload: {
          data: data,
          id: id,
          updatedProductData: updatedProductData
        }
      })
    } catch (error) {
      console.log(error.message);
      alert("Hubo un problema actualizando el producto")
    }
    }
} 

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
