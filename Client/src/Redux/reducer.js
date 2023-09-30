import {
    POST_PRODUCT,
    DELETE_PRODUCT_BY_ID,
    UPDATE_PRODUCT_BY_ID,
    GET_ALL_PRODUCT,
    GET_PRODUCT_BY_NAME,
    GET_CATEGORIES,
    GET_PRODUCT_BY_ID,
    ORDER_BY_NAME,
    ORDER_BY_PRICE

} from "./actions/action-types"

const initialState = {
    allProducts : [],
    product: [],
    categories: [],
    searchProduct:[],
    searchByName: [],
    productDetail: [],
};

/* 
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
} */



let productSorted = []
let products = []

function rootReducer (state = initialState, action){
    switch (action.type) {
    
    
        case GET_ALL_PRODUCT:
            return {
                ...state,
                allProducts: action.payload
            }

        case GET_PRODUCT_BY_NAME:
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

  /*       case UPDATE_PRODUCT_BY_ID:
            const { id, updatedProductData } = action.payload;
            const newProducts = [...state.product]

            updater(newProducts, id, updatedProductData)
            return {
                ...state,
                product: newProducts

            } */

        case ORDER_BY_NAME:
            products = [...state.allProducts]
            productSorted = products.sort(function (a, b) {
                if (a.name > b.name) {
                    return action.payload === 'asc' ? 1 : -1
                }
                if (a.name < b.name) {
                    return action.payload === 'asc' ? -1 : 1
                }
                return 0;
            })
            return {
                ...state,
                allProducts: productSorted
            }

            case ORDER_BY_PRICE:
            products = [...state.allProducts]; 
            productSorted = action.payload === 'low' ? 
            products.sort((a, b) => a.price - b.price) :   
            products.sort((a, b) => b.price - a.price);

  return {
    ...state,
    allProducts: productSorted
  }
           
        default:
            return { ...state };


        


    }
};

export default rootReducer; 