import {
    POST_PRODUCT,
    DELETE_PRODUCT_BY_ID,
    UPDATE_PRODUCT_BY_ID,
    GET_ALL_PRODUCT,
    GET_PRODUCT_BY_SEARCHBAR,
    GET_CATEGORIES,
    GET_PRODUCT_BY_ID,
    
} from "./actions/action-types"

const initialState = {
    product: [],
    categories: [],
    searchResults: [],
    productDetail: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                product: action.payload
            }

        case GET_PRODUCT_BY_SEARCHBAR: 
        return {
            ...state,
            searchResults: action.payload
        }
        
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                productDetail: action.payload

            }
        case POST_PRODUCT: 
            return {
                ...state,
                product: [...state.product, action.payload]
            }   
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case DELETE_PRODUCT_BY_ID:
            return {
                ...state,
                product: state.product.filter((product) => product.id !== action.payload)
            }
        case UPDATE_PRODUCT_BY_ID:
            return {
                ...state,
                product: s
            }

        default:
            return { ...state };
    }
};
                
export default rootReducer; 