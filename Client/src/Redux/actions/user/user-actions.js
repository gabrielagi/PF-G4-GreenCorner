import {
  GET_FAVORITE_BY_NAME,
  GET_ALL_USER,
  GET_USER_BY_NAME,
  GET_USER_BY_ROL,
  GET_USER_BY_ID,
  DELETE_USER,
  POST_FAVORITE,
  POST_USER,
  GET_USER_BY_EMAIL,
  UPDATE_USER,
  UPDATE_USER_FROM_EDIT,
  GET_FAVORITES,
  ORDER_USER_BY_NAME,
  ORDER_USER_BY_ROLE,
  ORDER_USER_BY_STATUS,
  SEARCH_USERS,
  DELETE_FAV_BY_ID_BD
} from "../action-types";

import axios from "axios";

/* const link= import.meta.env.VITE_ENDPOINT
const endpoint = `${link}/user`;  */
const endpoint = `https://greencorner.onrender.com/user`;

// const endpoint = `http://localhost:3001/user`;

export const getFavorites = (email) => {
  console.log('aver');
  console.log(email);
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}/getfavorites?email=${email}`
      );
     
      dispatch({
        type: GET_FAVORITES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };
};

export const getOneFavorites = (email, id) => {

  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}/getOnefavorites?email=${email}&id=${id}`
      );
     return data;

    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_ALL_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error.mesage);
      return error.mesage;
    }
  };
};

export function getUserByName(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${endpoint}/find/${name}`);
      dispatch({
        type: GET_USER_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error.mesage);
      return error.mesage;
    }
  };
}

export function getUserById(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${endpoint}/${id}`);
      dispatch({
        type: GET_USER_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error.mesage);
      return error.mesage;
    }
  };
}

export function getUserByEmail(email) {
  return async function (dispatch) {
    try {
      //console.log("Llego un email a buscar a la action", email);
      //console.log(`${endpoint}/find/${email}`);
      // El error esta en la URL
      const { data } = await axios.get(`${endpoint}/find?email=${email}`);

      console.log("Esta es la data que guardo en Reducer", data);
      dispatch({
        type: GET_USER_BY_EMAIL,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
      return error.mesage;
    }
  };
}

export function getUserByRol(rol) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${endpoint}/rol/${rol}`);
      dispatch({
        type: GET_USER_BY_ROL,
        payload: data,
      });
    } catch (error) {
      console.log(error.mesage);
      return error.mesage;
    }
  };
}

export function orderUserByName(payload) {
  return {
    type: ORDER_USER_BY_NAME,
    payload,
  };
}

export function orderUserByRole(payload) {
  return { type: ORDER_USER_BY_ROLE, payload };
}

export function orderUserByStatus(payload) {
  return { type: ORDER_USER_BY_STATUS, payload };
}

export function postUser(userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, userData);
      dispatch({
        type: POST_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };
}

export function postFavorites(userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${endpoint}/favorites`, userData);

      return data;
    } catch (error) {
      console.log(error.message); // Corregido aquí
      return error.message;
    }
  };
}

export function deleteFavorite(id, email) {
  return async (dispatch) => {
    try {
  

      const { data } = await axios.delete(
        `${endpoint}/favorites/${email}/${id}`
      );
        
      /*dispatch({
        type: DELETE_USER,
        payload: data,
      });
*/
      return data;

    } catch (error) {
      console.log(error);
      return error.mesage;
    }
  };
}

export function deleteFavoriteBD(id) {
  console.log('en el action')
  console.log(id)
  return async (dispatch) => {
    try {
  
      console.log('llegó al action')
      const { data } = await axios.delete(
        `${endpoint}/favorites/${id}`
      );
      console.log(data)
      dispatch({
        type: DELETE_FAV_BY_ID_BD,
        payload: data,
      });

   
    } catch (error) {
      console.log(error);
      return error.mesage;
    }
  };
}

export function deleteUser(id) {
  return async (dispatch) => {
    try {
      console.log("llego a la action delete");
      const { data } = await axios.delete(`${endpoint}/${id}`);
      console.log("respuesta del delete en la action que va al reducer" + data);
      dispatch({
        type: DELETE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      return error.mesage;
    }
  };
}

export function updateUser(id, userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${endpoint}/${id}`, userData);
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };
}

export function updateUserFromEdit(id, userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${endpoint}/${id}`, userData);
      dispatch({
        type: UPDATE_USER_FROM_EDIT,
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };
}

export const searchUsers = (searchTerm) => {
  return (dispatch, getState) => {
    // Obtén la lista de todos los usuarios del estado de Redux
    const allUsers = getState().allUsers;

    // Filtra los usuarios que coinciden con el término de búsqueda
    const filteredUsers = allUsers.filter((user) => {
      const name = user.name.toLowerCase();
      const email = user.email.toLowerCase();
      searchTerm = searchTerm.toLowerCase();

      // Comprueba si el nombre comienza con el término de búsqueda
      if (name.startsWith(searchTerm)) {
        return true;
      }

      // Si no se encontró ninguna coincidencia por nombre, busca por correo electrónico
      if (email.includes(searchTerm)) {
        return true;
      }

      return false;
    });

    // Despacha una acción para actualizar la lista de usuarios con los resultados de búsqueda
    dispatch({
      type: SEARCH_USERS,
      payload: filteredUsers,
    });
  };
};




