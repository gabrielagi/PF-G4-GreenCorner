import {
  POST_PRODUCT,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  GET_ALL_PRODUCT,
  RESET_ALL_FAVORITES,
  GET_PRODUCT_CART,
  GET_PRODUCT_TRENDING,
  GET_PRODUCT_BY_NAME,
  POST_CATEGORY,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FROM_EDIT,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  FILTER_CATEGORY,
  FILTER_FAV__CATEGORY,
  GET_CATEGORIES_SHOP,
  GET_PRODUCT_BY_ID,
  ORDER_BY_NAME,
  ORDER_FAV_BY_NAME,
  ORDER_BY_PRICE,
  ORDER_FAV_BY_PRICE,
  ORDER_USER_BY_NAME,
  ORDER_USER_BY_ROLE,
  ORDER_USER_BY_STATUS,
  ORDER_CATEGORY,
  RESET_ALL_PRODUCT,
  GET_ALL_USER,
  GET_USER_BY_NAME,
  GET_USER_BY_ROL,
  GET_USER_BY_ID,
  DELETE_USER,
  POST_USER,
  GET_USER_BY_EMAIL,
  UPDATE_USER,
  UPDATE_USER_FROM_EDIT,
  SET_CURRENT_PAGE,
  GET_FAVORITES,
  POST_PRODUCT_CART,
  DELETE_PRODUCT_CART,
  UPDATE_PRODUCT_CART,
  FIND_FAV_BY_NAME,
  GET_ORDER_DETAIL, 
  GET_ALL_ORDERS,
  DELETE_FAV_BY_ID_BD
} from "./actions/action-types";

const initialState = {
  allProducts: [],
  favorites: [],
  product: [],
  productCart: [],
  productTrending: [],
  categories: [],
  updateCategory: {},
  searchProduct: [],
  searchByName: [],
  productDetail: [],
  allUsers: [],
  userDetail: [],
  orderDetail: [],
  allOrders: [],
  pagination: {
    currentPage: 1,
  },
  allFavorites: [],
};

function updater(product, id, updatedProductData) {
  const index = product.findIndex((item) => item.id === id);

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

let categoriesSorted = [];
let allCategories = [];
let usersStatus = [];
let statusSorted = [];
let usersSorted = [];
let users = [];
let roleSorted = [];
let usersRole = [];
let productSorted = [];
let favoritesSorted = [];
let products = [];
let favorites = [];
//Para filtro en favorites
let productMatch = [];
let availableProducts = [];
let availableSearchbar = [];

/* Edit */
let updatedProductId;
let updatedProductData;
let updatedAllProducts;

//action.payload === allFavorites
// paso 1= filtrar todos los productos por el action.payload( voy a tener de resultado todos ls productos con sus categorias pero que sean de favoritos)
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      availableProducts = action.payload.filter(
        (product) => product.available === true
      );
      // console.log (availableProducts)
      return {
        ...state,
        allProducts: action.payload,
        product: state.product.length ? state.product : availableProducts,
      };

    case RESET_ALL_PRODUCT:
      return {
        ...state,
        product: availableProducts,
      };
    case RESET_ALL_FAVORITES:
      return {
        ...state,
        favorites: state.allFavorites,
      };
    case GET_PRODUCT_BY_NAME:
      availableSearchbar = action.payload.filter(
        (product) => product.available === true
      );
      return {
        ...state,
        product: availableSearchbar,
        allProducts: action.payload,
      };

    case GET_PRODUCT_CART:
      return {
        ...state,
        productCart: action.payload,
      };

    case POST_PRODUCT_CART:
      console.log("Llegue al reducer con los cart: ", action.payload);
      if (typeof action.payload === "string") {
        return {
          ...state,
          productCart: [...state.productCart],
        };
      } else {
        return {
          ...state,
          productCart: [...state.productCart, action.payload],
        };
      }

    case UPDATE_PRODUCT_CART:
      const { productId, newAmount } = action.payload;

      const updatedProductIndex = state.productCart.find(
        (product) => product.product_id === productId
      );
      if (updatedProductIndex !== -1) {
        const updatedProduct = {
          ...state.productCart[updatedProductIndex],
          amount: newAmount,
        };

        const updatedCart = [...state.productCart];
        updatedCart[updatedProductIndex] = updatedProduct;

        return {
          ...state,
          productCart: updatedCart,
        };
      } else {
        return state;
      }

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
      };

    case UPDATE_PRODUCT_BY_ID:
      updatedProductId = action.payload.id;
      updatedProductData = action.payload.updatedProductData;
      updatedAllProducts = state.allProducts.map((product) => {
        if (product.product_id === updatedProductId) {
          return { ...product, ...updatedProductData };
        } else {
          return product;
        }
      });
      return {
        ...state,
        allProducts: updatedAllProducts,
      };
    case GET_PRODUCT_TRENDING:
      return {
        ...state,
        productTrending: state.allProducts.filter(
          (product) => product.isTrending === true
        ),
      };

    case POST_PRODUCT:
      console.log("Product a crear en el Reducer: ", action.payload);
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

    // Post de Category
    case POST_CATEGORY:
      console.log(
        "La nueva categoria a agregar en reducer es: ",
        action.payload
      );
      return {
        ...state,
        categories: [...categories, action.payload],
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        updateCategory: action.payload,
      };

    case UPDATE_CATEGORY_FROM_EDIT:
      return {
        ...state,
      };

    case DELETE_CATEGORY:
      console.log(
        "Llegue al reducer de delete category con data: ",
        action.payload
      );
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };

    case FIND_FAV_BY_NAME:
      favorites = state.allFavorites.find((fav) => {
        if (fav.Product) {
          return fav.Product.name === action.payload;
        } else {
          return fav.name === action.payload;
        }
      });
      favorites ? console.log("sii") : console.log("noo");
      return {
        ...state,
        favorites: favorites,
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
    case FILTER_FAV__CATEGORY:
      productMatch = state.allProducts.filter((p) =>
        state.allFavorites.some((fav) =>
          fav.Product
            ? fav.Product.product_id === p.product_id
            : fav.product_id === p.product_id
        )
      );
      console.log(productMatch);
      return {
        ...state,
        favorites: productMatch.filter((pm) => {
          return pm.categories.some(
            (category) => category.name === action.payload
          );
        }),
      };

    case DELETE_PRODUCT_BY_ID:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          (product) => product.id !== action.payload.id
          
        ),
        
        favorites:state.allFavorites.filter((f)=> f.Product.product_id !== action.payload.id)
      };

    /*       case UPDATE_PRODUCT_BY_ID:

                  const { id, updatedProductData } = action.payload;
                  const newProducts = [...state.product]
      
                  updater(newProducts, id, updatedProductData)
                  return {
                      ...state,
                      product: newProducts
      
                  } */

    case ORDER_FAV_BY_NAME:
      favorites = [...state.favorites];

      favoritesSorted = favorites.sort(function (a, b) {
        if (a.Product) {
          if (a.Product.name > b.Product.name) {
            return action.payload === "asc" ? 1 : -1;
          }
          if (a.Product.name < b.Product.name) {
            return action.payload === "asc" ? -1 : 1;
          }
        }
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
        favorites: favoritesSorted,
      };

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

    case ORDER_USER_BY_NAME:
      users = [...state.allUsers];
      usersSorted = users.sort(function (a, b) {
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
        allUsers: usersSorted,
      };

    case ORDER_USER_BY_ROLE:
      usersRole = [...state.allUsers];
      roleSorted = usersRole.sort(function (a, b) {
        console.log(usersRole);
        if (a.role > b.role) {
          return action.payload === "admin" ? 1 : -1;
        }
        if (a.role < b.role) {
          return action.payload === "admin" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        allUsers: roleSorted,
      };
    case ORDER_USER_BY_STATUS:
      usersStatus = [...state.allUsers];
      statusSorted = usersStatus.sort(function (a, b) {
        if (a.status > b.status) {
          return action.payload === "Active" ? 1 : -1;
        }
        if (a.status < b.status) {
          return action.payload === "Active" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        allUsers: statusSorted,
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

    case ORDER_FAV_BY_PRICE:
      favorites = [...state.favorites];

      favoritesSorted = favorites[0].Product
        ? action.payload === "low"
          ? favorites.sort((a, b) => a.Product.price - b.Product.price)
          : favorites.sort((a, b) => b.Product.price - a.Product.price)
        : action.payload === "low"
        ? favorites.sort((a, b) => a.price - b.price)
        : favorites.sort((a, b) => b.price - a.price);

      console.log(favoritesSorted);
      return {
        ...state,
        favorites: favoritesSorted,
      };

    //case GET_ALL_USER:
    //return {
    // ...state,
    // user: state.user,
    // };

    case GET_USER_BY_NAME:
      return {
        ...state,
        userDetail: action.payload,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        userDetail: action.payload,
        userDetail: action.payload,
      };

    case ORDER_CATEGORY:
      allCategories = [...state.categories];
      categoriesSorted = allCategories.sort(function (a, b) {
        if (a.name > b.name) {
          return action.payload === "asc" ? 1 : -1;
        }
        if (a.name < b.name) {
          return action.payload === "asc" ? -1 : 1;
        }
        return 0;
      });
      console.log(categoriesSorted);
      return {
        ...state,
        categories: categoriesSorted,
      };

    case GET_USER_BY_ROL:
      return {
        ...state,
        userDetail: action.payload,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        userDetail: action.payload,
      };

    case GET_USER_BY_EMAIL:
      return {
        ...state,
        userDetail: action.payload,
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

    case UPDATE_USER_FROM_EDIT:
      return {
        ...state,
      };

    case DELETE_USER:
      console.log("Llegue al reducer con data: ", action.payload);
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user.id !== action.payload),
      };
    case DELETE_FAV_BY_ID_BD:
    return{
      ...state
    }


    case SET_CURRENT_PAGE: // Nuevo caso para manejar la acción de paginación
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload,
        },
      };

    case GET_FAVORITES:
      console.log(action.payload);
      return {
        ...state,
        allFavorites: action.payload,
        favorites: action.payload,
      };
    case DELETE_PRODUCT_CART:
      console.log(
        "Lo que voy a borrar en reducer de delete en cart es: ",
        action.payload
      );
      return {
        ...state,
        productCart: state.productCart.filter(
          (product) => product.id !== action.payload
        ),
      };

    case GET_ALL_USER:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return {
        ...state,
      };

    
    case GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };
    case GET_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: action.payload,
      };
    }
}

export default rootReducer;
