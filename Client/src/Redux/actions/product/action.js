import { deleteProduct } from "../../../../../Server/src/Controller/product.controller";
import { 
  GET_ALL_PRODUCT,
  GET_PRODUCT_BY_SEARCHBAR,
  GET_PRODUCT_BY_ID,
  POST_PRODUCT,
  GET_CATEGORIES,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID
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
      alert ("Hubo un problema trayendo las categorías")
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