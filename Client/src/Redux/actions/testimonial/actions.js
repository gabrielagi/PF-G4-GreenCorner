import {
    GET_ALL_TESTIMONIAL,
    GET_TESTIMONIAL_BY_ID,
    DELETE_TESTIMONIAL,
    UPDATE_TESTIMONIAL,
    CREATE_TESTIMONIAL
} from "../action-types"


import axios from "axios";


const endpoint = `https://greencorner.onrender.com/testimonial`;
/* const endpoint = `http://localhost:3001/testimonial`; */

export const getTestimonial = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            dispatch({
                type: GET_ALL_TESTIMONIAL,
                payload: data
            })

        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
}

export const createTestimonial = (testimonialData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, testimonialData);

            dispatch({
                type: CREATE_TESTIMONIAL,
                payload: data
            })

        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
}


export const testimonialById = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${endpoint}/${id}`);

            dispatch({
                type: GET_TESTIMONIAL_BY_ID,
                payload: data
            })

        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
}

export const deleteTestimonial = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.delete(`${endpoint}/${id}`)

            dispatch({
                type: DELETE_TESTIMONIAL,
                payload: data
            })

        } catch (error) {
            console.log(error.message);
            return error.message
        }
    }
}

export const updateTestimonial = ( id, testimonialData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`${endpoint}/${id}`, testimonialData);
            dispatch({
                type: UPDATE_TESTIMONIAL,
                payload: data
            })
        } catch (error) {
            console.log(error.message);
            return error.message
        }
    }
}