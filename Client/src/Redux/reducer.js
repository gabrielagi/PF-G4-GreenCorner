import {
  POST_PRODUCT,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  GET_ALL_PRODUCT,
  GET_PRODUCT_CART,
  GET_PRODUCT_TRENDING,
  GET_PRODUCT_BY_NAME,
  GET_CATEGORIES,
  FILTER_CATEGORY,
  GET_PRODUCT_BY_ID,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  RESET_ALL_PRODUCT,
  GET_ALL_USER,
  GET_USER_BY_NAME,
  GET_USER_BY_ROL,
  GET_USER_BY_ID,
  DELETE_USER,
  POST_USER,
  GET_CATEGORIES_SHOP,
  GET_USER_BY_EMAIL,
  UPDATE_USER,
  GET_FAVORITES,
} from "./actions/action-types";

const initialState = {
  allProducts: [],
  product: [],
  productCart: [],
  productTrending: [],
  categories: [],
  searchProduct: [],
  searchByName: [],
  productDetail: [],
  AllUsers: [],
  userDetail: [],
  allFavorites:[]
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

let productSorted = [];
let products = [];

function rootReducer(state = initialState, action) {

  switch (action.type) {
    case GET_ALL_PRODUCT:
      return {
        ...state,
        allProducts: action.payload,
        product: state.product.length ? state.product : action.payload,
      };

    case RESET_ALL_PRODUCT:
      return {
        ...state,
        product: state.allProducts,
      };

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        product: action.payload,
      };
      
       case GET_PRODUCT_CART:

            return {
                ...state,
                productCart: action.payload
            }


    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
      };
    case GET_PRODUCT_TRENDING:
      return {
        ...state,
        productTrending: state.allProducts.filter(
          (product) => product.isTrending === true
        ),
      };

    case POST_PRODUCT:
      return {
        ...state,
        product: [...state.product, action.payload],
      };

    //Por ahora no va
    case GET_CATEGORIES:
      // const categories = [];

      // state.product.forEach((product) => {
      //   product.categories.forEach((category) => {
      //     categories.push(category);
      //   });
      // });

      // const Category = Array.from(new Set(categories.map(JSON.stringify))).map(JSON.parse);

      return {
        ...state,
        categories: action.payload,
      };

    case GET_CATEGORIES_SHOP:
      const categories = [];

      state.product.forEach((product) => {
        product.categories.forEach((category) => {
          categories.push(category);
        });
      });

      const Category = Array.from(new Set(categories.map(JSON.stringify))).map(
        JSON.parse
      );

      return {
        ...state,
        categories: Category,
      };

    case FILTER_CATEGORY:
      return {
        ...state,
        product: state.allProducts.filter((products) => {
          return products.categories.some(
            (category) => category.name === action.payload
          );
        }),
      };

    case DELETE_PRODUCT_BY_ID:
      return {
        ...state,
        product: state.product.filter(
          (product) => product.id !== action.payload.id
        ),
      };

    /*       case UPDATE_PRODUCT_BY_ID:

                  const { id, updatedProductData } = action.payload;
                  const newProducts = [...state.product]
      
                  updater(newProducts, id, updatedProductData)
                  return {
                      ...state,
                      product: newProducts
      
                  } */

    case ORDER_BY_NAME:
      products = [...state.product];
      productSorted = products.sort(function (a, b) {
        if (a.name > b.name) {
          return action.payload === "asc" ? 1 : -1;
        }
        if (a.name < b.name) {
          return action.payload === "asc" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        product: productSorted,
      };

    case ORDER_BY_PRICE:
      products = [...state.product];
      productSorted =
        action.payload === "low"
          ? products.sort((a, b) => a.price - b.price)
          : products.sort((a, b) => b.price - a.price);

      return {
        ...state,
        product: productSorted,
      };

    case GET_ALL_USER:
      return {
        ...state,
        user: state.user,
      };

    case GET_USER_BY_NAME:
      return {
        ...state,
        userDetail: payload,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        userDetail: payload,
      };

    case GET_USER_BY_ROL:
      return {
        ...state,
        userDetail: payload,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        userDetail: payload,
      };

    case GET_USER_BY_EMAIL:
      return {
        ...state,
        userDetail: payload,
      };

    case POST_USER:
      return {
        ...state,
        userDetail: action.payload,
      };
    
      case UPDATE_USER:
        return {
          ...state,
          userDetail: action.payload,
        };
      case GET_FAVORITES:
        return{
          ...state,
          allFavorites:action.payload
        }
    default:
      return {
        ...state,
      };


  }
}

export default rootReducer;

