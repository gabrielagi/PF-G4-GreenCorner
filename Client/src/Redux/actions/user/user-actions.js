import {
    GET_ALL_USER,
    GET_USER_BY_NAME,
    GET_USER_BY_ROL,
    GET_USER_BY_ID,
    DELETE_USER,
    POST_FAVORITE,
    POST_USER
} from "../action-types"

import axios from "axios"

const endpoint = "https://localhost:3001/user"

export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            dispatch({
                type: GET_ALL_USER,
                payload: data
            })
        } catch (error) {
            console.log(error.mesage);
            return(error.mesage);

        }
    }
}
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
            return(error.mesage);
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
            return(error.mesage);
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
            return(error.mesage);

        }
    };
}


export function postUser ( {name,
    lastName,
    email,
    password,
    role,
    image,
    rating}) {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, {name,
                lastName,
                email,
                password,
                role,
                image,
                rating})
            dispatch({
                type: POST_USER,
                payload: data
            })
        } catch (error) {
            console.log(error);
            return(error.mesage);
        }
    }
}

export function postFavorites(userData) {
    return async (dispatch) => {
        
        try {
            const { data } = await axios.post(`${endpoint}/favorites`, userData)
            
            dispatch({
                type: POST_FAVORITE,
                payload: data
            })
        } catch (error) {
            console.log(error.message); // Corregido aquí
            return error.message;
        }
    }
}


export function deleteUser ( id ) {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`${endpoint}/${id}`)
            dispatch({
                type: DELETE_USER,
                payload: data
            })
        } catch (error) {
            console.log(error);
            return(error.mesage);
        }
    }
}