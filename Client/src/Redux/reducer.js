import {
    POST_PRODUCT,
    DELETE_PRODUCT_BY_ID,
    UPDATE_PRODUCT_BY_ID,
    GET_ALL_PRODUCT,
    GET_PRODUCT_TRENDING,
    GET_PRODUCT_BY_NAME,
    GET_CATEGORIES,
    FILTER_CATEGORY,
    GET_PRODUCT_BY_ID,
    ORDER_BY_NAME,
    ORDER_BY_PRICE,
    RESET_ALL_PRODUCT

} from "./actions/action-types"

const initialState = {
    allProducts : [],
    product: [],
    productTrending: [],
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
              allProducts: action.payload,
              product: state.product.length ? state.product : action.payload,
            }

        case RESET_ALL_PRODUCT:
                return {
                    ...state,
                    product: state.allProducts
                }
            
        case GET_PRODUCT_BY_NAME:
                return {
                    ...state,
                    product: action.payload
                }
                
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                productDetail: action.payload

            }
            case GET_PRODUCT_TRENDING:

            return {
                ...state,
                productTrending: state.allProducts.filter((product) => product.isTrending === true)
            };

        case POST_PRODUCT:
            return {
                ...state,
                product: [...state.product, action.payload]
            }
    
                //Por ahora no va
            case GET_CATEGORIES:

            const categories = [];

            state.product.forEach((product) => {
              product.categories.forEach((category) => {
                categories.push(category);
              });
            }); 

            

            const Category = Array.from(new Set(categories.map(JSON.stringify))).map(JSON.parse);
            
            
            return {
              ...state,
              categories: Category
            };

                
                

        case FILTER_CATEGORY:

            return {
                ...state,
                product: state.allProducts.filter((products) => {
                    return products.categories.some((category) => category.name === action.payload);
                }),
            };


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
                product: productSorted
            }

            case ORDER_BY_PRICE:
            products = [...state.allProducts]; 
            productSorted = action.payload === 'low' ? 
            products.sort((a, b) => a.price - b.price) :   
            products.sort((a, b) => b.price - a.price);

  return {
    ...state,
    product: productSorted
  }
           
        default:
            return { ...state };


        


    }
};

export default rootReducer; 