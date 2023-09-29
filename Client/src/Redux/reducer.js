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
function updater(product, id, updatedProductData) {
    const index = product.findIndex(item => item.id === id);

    if (index !== -1) {
        const currentProduct = product[index];

        for (const property in updatedProductData) {
            if (updatedProductData.hasOwnProperty(property)) {
                if (currentProduct.hasOwnProperty(property)) {
                    currentProduct[property] = updatedProductData[property];
                }
            }
        }

        product[index] = currentProduct;
    }
}



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

        case GET_ALL_PRODUCT:
            return {
                ...state,
                allProducts: action.payload
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
                product: state.product.filter((product) => product.id !== action.payload.id)
            }
        case UPDATE_PRODUCT_BY_ID:
            const { id, updatedProductData } = action.payload;
            const newProducts = [...state.product]

            updater(newProducts, id, updatedProductData)
            return {
                ...state,
                product: newProducts

            }

        default:
            return { ...state };
    }
};

export default rootReducer; 