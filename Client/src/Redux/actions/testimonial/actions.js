import {
    GET_ALL_TESTIMONIAL,
    GET_TESTIMONIAL_BY_ID,
    DELETE_TESTIMONIAL,
    UPDATE_TESTIMONIAL,
    CREATE_TESTIMONIAL
} from "../action-types"


import axios from "axios";


const endpoint = "http://localhost:3001/testimonial"

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


