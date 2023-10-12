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
  GET_FAVORITES,
  ORDER_USER_BY_NAME,
  ORDER_USER_BY_ROLE,
  ORDER_USER_BY_STATUS
} from "../action-types";

import axios from "axios";

/* const link= import.meta.env.VITE_ENDPOINT
const endpoint = `${link}/user`;  */
// const endpoint = `https://greencorner.onrender.com/user`;
const endpoint = `http://localhost:3001/user/`;




export const getFavorites = (email) => {
  console.log(email);
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${endpoint}/getfavorites?email=${email}`
      );
      console.log(data);
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

export function orderUserByName(payload){
  return {
    type: ORDER_USER_BY_NAME,
    payload,
  }
}

export function orderUserByRole(payload){
  return {type: ORDER_USER_BY_ROLE,
  payload,
}
}

export function orderUserByStatus(payload){
  return {type: ORDER_USER_BY_STATUS,
    payload,
  }
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

export function deleteUser(id) {
  return async (dispatch) => {
    try {
      console.log("llego a la action delete")
      const { data } = await axios.delete(`${endpoint}/${id}`);
      console.log("respuesta del delete en data" + data)
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
