import { 
  GET_ALL_PRODUCT,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_CART,
  POST_PRODUCT,
  POST_PRODUCT_CART,
  GET_PRODUCT_TRENDING,
  GET_CATEGORIES,
  GET_CATEGORIES_SHOP,
  FILTER_CATEGORY,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  RESET_ALL_PRODUCT,
  SET_CURRENT_PAGE,
  DELETE_PRODUCT_CART,
} from "../action-types";

import axios from "axios";

/* const link= import.meta.env.VITE_ENDPOINT
const endpoint = `${link}/product`;
const categories =`${link}/category`

 */

//const endpoint = `https://greencorner.onrender.com/product`;
//const categories =`https://greencorner.onrender.com/category`

const endpoint = "http://localhost:3001/product";
const categories ="http://localhost:3001/category"
 


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
}

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

//Action
export const getProductCart = (email) => {
  return async (dispatch) => {
    try {

      //const encodedEmail = encodeURIComponent(email);
      
      const { data } = await axios.get(`${endpoint}/cart?email=${email}`);
      
      dispatch({
        type: GET_PRODUCT_CART,
        payload: data,
      });
    } catch (error) {
      console.log(error.message );
    }
  };
};

export const addProduct = (productdata) => {
  return async (dispatch) => {
    try {
      const  data  = await axios.post( endpoint, productdata)
      dispatch({
        type: POST_PRODUCT,
        payload: data
      })
    } catch (error) {
      alert ("Hubo un problema al crear el producto")
    }
  }
}
/* ca */
export const deleteProductCart = (product_id, email) => {
  return async (dispatch) => {

    try {

      const { data } = await axios.delete(`${endpoint}/cart/${email}/${product_id}`);

     /* dispatch({
        type: DELETE_PRODUCT_CART,
        payload: {
          data: data
        },
      })
*/

    } catch (error) {
      alert ("Hubo un problema al eliminar el producto")
    }
  }
}

export const getProductsTrending = () => {
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    try {
      dispatch({
        type: GET_PRODUCT_TRENDING,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
      alert ("Hubo un problema trayendo las categorías")
    }
  };
};

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

export const getAllCategoriesShop = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(categories);
      dispatch({
        type: GET_CATEGORIES_SHOP,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filterCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_CATEGORY,
        payload: category,
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

export function postProductCart(userData) {
  return async (dispatch) => {
      
      try {
          const { data } = await axios.post(`${endpoint}/cart`, userData)
          
          return data
          /*dispatch({
              type: POST_PRODUCT_CART,
              payload: data
          })*/
      } catch (error) {
          console.log(error.message); 
          return error.message;
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

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};