import {GET_ALL_PRODUCT, GET_PRODUCT_BY_SEARCHBAR, GET_PRODUCT_BY_ID,ORDER_BY_NAME, ORDER_BY_PRICE} from './actions/action-types'

const initialState = {
    allProducts:[],
    searchProduct:[]
};

let productSorted = []
let products = []

function rootReducer (state = initialState, action){
    switch (action.type) {
        
        case GET_ALL_PRODUCT:
            return {
                ...state,
                allProducts: action.payload
            }

        case GET_PRODUCT_BY_ID:
            console.log('llegó al reducer')
            console.log(action.payload)
            return{
                
                ...state, searchProduct:action.payload
            }
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