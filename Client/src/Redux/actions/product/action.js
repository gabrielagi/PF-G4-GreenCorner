import {
  GET_ALL_PRODUCT,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_CART,
  POST_PRODUCT,
  POST_PRODUCT_CART,
  GET_PRODUCT_TRENDING,
  GET_CATEGORIES,
  POST_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORIES_SHOP,
  FILTER_CATEGORY,
  FILTER_FAV__CATEGORY,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  ORDER_BY_NAME,
  ORDER_FAV_BY_NAME,
  ORDER_BY_PRICE,
  ORDER_FAV_BY_PRICE,
  ORDER_CATEGORY,
  RESET_ALL_PRODUCT,
  SET_CURRENT_PAGE,
  DELETE_PRODUCT_CART,
  UPDATE_PRODUCT_CART,
  RESET_ALL_FAVORITES,
  FIND_FAV_BY_NAME,
} from "../action-types";
import Swal from "sweetalert2";
import axios from "axios";

/* const link= import.meta.env.VITE_ENDPOINT
const endpoint = `${link}/product`;
const categories =`${link}/category`

 */

const endpoint = `https://greencorner.onrender.com/product`;
 const categories = `https://greencorner.onrender.com/category`;

// const endpoint = `http://localhost:3001/product`;
// const categories = `http://localhost:3001/category`;

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

export const resetAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({
        type: RESET_ALL_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const resetAllFavorites = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({
        type: RESET_ALL_FAVORITES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function getProductByName(name) {
  return async function (dispatch) {
    const response = await axios.get(endpoint + "?name=" + name);
    dispatch({
      type: GET_PRODUCT_BY_NAME,
      payload: response.data,
    });
    return response.data;
  };
}

export const getProductById = (id) => {
   return async (dispatch) => {
    try {
      const { data } = await axios.get(`${endpoint}/${id}`);
      dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Product not found!",
      });
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
      console.log(error.message);
    }
  };
};

// Update amount in productCart
export const updateProductCart = ({ email, productId, amount }) => {
  return async (dispatch) => {
    try {
      console.log("Llego a update con email: ", email);
      console.log("Llego a update con productid: ", productId);
      console.log("Llego a update con quantity: ", amount);
      // Realiza una solicitud PUT a la ruta de actualización en el servidor
      const response = await axios.put(
        `${endpoint}/cart/${email}/${productId}`,
        {
          quantity: amount,
        }
      );
      console.log(
        "Volvi del put en action updateProductCart con data: ",
        response
      );
      dispatch({
        type: UPDATE_PRODUCT_CART,
        payload: {
          email,
          productId,
          quantity: amount,
        },
      });
    } catch (error) {
      console.error("Error en la acción updateProductCart:", error);
    }
  };
};



export const addProduct = (productdata) => {
  return async (dispatch) => {
    try {
      const data = await axios.post(endpoint, productdata);
      dispatch({
        type: POST_PRODUCT,
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Problem creating product!",
      });
    }
  };
};


export const deleteProductCart = (product_id, email) => {
  return async (dispatch) => {
    try {
      console.log("El id que quiero borrar en action es: ", product_id);
      const { data } = await axios.delete(
        `${endpoint}/cart/${email}/${product_id}`
      );
      console.log("La respuesta del delete en la action es: ", data);
      dispatch({
        type: DELETE_PRODUCT_CART,
        payload: product_id,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Problem deleting product!",
      });
    }
  };
};

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Problem getting trending products!",
      });
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

// DELETE_CATEGORY

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${categories}/${id}`);
      console.log("Se elimino la categoria: ", data);
      dispatch({
        type: DELETE_CATEGORY,
        payload: id,
      });
      console.log("Categoria eliminada con éxito");
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Problem deleting category!",
      });
    }
  };
};

// UPDATE_CATEGORY
export const updateCategory = (id, updatedCategoryData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${categories}/${id}`,
        updatedCategoryData
      );
      dispatch({
        type: UPDATE_CATEGORY,
        payload: {
          data: data,
          id: id,
          updatedProductData: updatedCategoryData,
        },
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Problem updating category!",
      });
    }
  };
};

// UPDATE CATEGORY FROM MODAL EDIT
export function updateUserFromEdit(id, categoryData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${categories}/${id}`, categoryData);
      console.log("Se actualizo la categoria con los datos del Modal: ", data);
      dispatch({
        type: UPDATE_CATEGORY_FROM_EDIT,
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };
}

// POST_CATEGORY
export function postCategory(categoryData) {
  return async (dispatch) => {
    try {
      console.log("Category nueva entra a la action");
      const { data } = await axios.post(`${categories}/`, categoryData);
      console.log("Category post devuelve a la action el data: ", data);
      dispatch({
        type: POST_CATEGORY,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };
}

export function orderCategory(payload) {
  return {
    type: ORDER_CATEGORY,
    payload,
  };
}

export const filterCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_CATEGORY,
        payload: category,
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Problem filtering category!",
      });
    }
  };
};

export const filterFavByCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_FAV__CATEGORY,
        payload: category,
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Problem filtering Favorites by category!",
      });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${endpoint}/${id}`);
      dispatch({
        type: DELETE_PRODUCT_BY_ID,
        payload: {
          data: data,
          id: id,
        },
      });
      console.log("Producto eliminado con éxito");
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Problem deleting product!",
      });
    }
  };
};

export const updateProduct = (id, updatedProductData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${endpoint}/${id}`, updatedProductData);
      dispatch({
        type: UPDATE_PRODUCT_BY_ID,
        payload: {
          data: data,
          id: id,
          updatedProductData: updatedProductData,
        },
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Problem updating product!",
      });
    }
  };
};

export function postProductCart(userData) {
  return async (dispatch) => {
    try {
      console.log("Cart enrta a la action");
      const { data } = await axios.post(`${endpoint}/cart`, userData);
      console.log("Cart post devuelve a la action el data: ", data);
      dispatch({
        type: POST_PRODUCT_CART,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };
}

export function filterByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function findFavByName(payload) {
  return {
    type: FIND_FAV_BY_NAME,
    payload,
  };
}
export function filterFavByName(payload) {
  return {
    type: ORDER_FAV_BY_NAME,
    payload,
  };
}

export function filterByPrice(payload) {
  return {
    type: ORDER_BY_PRICE,
    payload,
  };
}
export function filterFavByPrice(payload) {
  console.log("llegó al action" + payload);
  return {
    type: ORDER_FAV_BY_PRICE,
    payload,
  };
}
export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};
