// Shop.js
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentPage } from "../../Redux/actions/product/action";
import "tailwindcss/tailwind.css";
import styles from "./Shop.module.css";
import Cards from "../../components/Cards/Cards";
import Category from "../../components/Categories/Categorie";
import ProductsTrending from "../../components/ProductsTrending/ProductsTrending";
import plantgif from "../../assets/plantgif.gif";
import {
  getAllProducts,
  resetAllProducts,
  getAllCategories,
  getProductsTrending,
  filterByName,
  filterByPrice,
} from "../../Redux/actions/product/action";
import { useSelector } from "react-redux";
import { FiRefreshCw } from "react-icons/fi";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";


const Shop = () => {
  const products = useSelector((state) => state.product);
  const allCategories = useSelector((state) => state.categories);
  const [nameOrder, setNameOrder] = useState("");
  const productTrending = useSelector((state) => state.productTrending);
  const [priceOrder, setPriceOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const currentPage = useSelector((state) => state.pagination.currentPage); // Obtén la página actual desde Redux
  const productsPerPage = 9;
 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    dispatch(getProductsTrending());
  }, [dispatch]);

  function handleOrder(e) {
    const selectedValue = e ? e.target.value : e;

    if (selectedValue === "asc" || selectedValue === "desc") {
      setNameOrder(selectedValue);
      setPriceOrder("");
      dispatch(filterByName(selectedValue));
    } else if (selectedValue === "high" || selectedValue === "low") {
      setNameOrder("");
      setPriceOrder(selectedValue);
      dispatch(filterByPrice(selectedValue));
    } else {
      setNameOrder("");
      setPriceOrder("");
      setSelectedCategory(true);
      dispatch(resetAllProducts());
    }
  }
 
  // // Se realiza el checkout
  // const handleCheckout = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:3001/payment/create-order",
  //       { ...product, quantity }
  //     );

  //     location.href = data.body.init_point;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value)); // Actualiza la página actual en el estado de Redux
  };
  

  
  const handleCategoryChange = (event) => {
    // Establece la página actual en 1 al cambiar de categoría
    dispatch(setCurrentPage(1)); // Actualiza la página actual en el estado de Redux
  
    // Restablece los filtros de orden
    handleOrder("");
  };

 
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <div className={styles.filtros}>
        <FiRefreshCw
          className={styles.refresh}
          value=""
          onClick={() => {
            handleOrder();
          }}
        />
        <FormControl
          sx={{
            border: "none",
            minWidth: 100,
            "& label": {
              fontSize: "18px",
              color: "rgb(0, 133, 0)",
            },
            "& label.MuiInputLabel-shrink": {
              color: "rgb(0, 133, 0)",
            },
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-input": {
              fontSize: "15px",
              color: "black",
            },
            "& .MuiSelect-icon": {
              color: "rgb(0, 133, 0)",
            },
          }}
        >
          <InputLabel htmlFor="nameOrder">Name</InputLabel>
          <Select
            id="nameOrder"
            name="nameOrder"
            value={nameOrder}
            onChange={handleOrder}
            label="Name"
          >
            <MenuItem value="asc" style={{ fontSize: "15px" }}>
              A - Z
            </MenuItem>
            <MenuItem value="desc" style={{ fontSize: "15px" }}>
              Z - A
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            border: "none",
            minWidth: 100,
            "& label": {
              fontSize: "18px",
              color: "rgb(0, 133, 0)",
            },
            "& label.MuiInputLabel-shrink": {
              color: "rgb(0, 133, 0)",
            },
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-input": {
              fontSize: "15px",
              color: "black",
            },
            "& .MuiSelect-icon": {
              color: "rgb(0, 133, 0)",
            },
          }}
        >
          <InputLabel htmlFor="priceOrder">Price</InputLabel>
          <Select
            id="priceOrder"
            name="priceOrder"
            value={priceOrder}
            onChange={handleOrder}
            label="Price"
          >
            <MenuItem value="high" style={{ fontSize: "15px" }}>
              High - Low
            </MenuItem>
            <MenuItem value="low" style={{ fontSize: "15px" }}>
              Low - High
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="mr-4 bg-gray-100 mx-[40px] px-10 h-85 w-90">
          <div>
                  <div className="grid items-center text-start ml-4">
              <h1 className="text-4xl font-poppins italic mt-4 mb-2">
                All Categories
              </h1>
              <br />

              <div className="mt-4 mb-2">
                {allCategories ? (
                  allCategories.map((p, i) => (
                    <Category
                      key={i}
                      name={p.name}
                      id={p.id}
                      selected={p.name === selectedCategory}
                      onSelect={handleCategorySelect}
                      onCategoryChange={handleCategoryChange}
                    />
                  ))
                ) : (
                  <div>
                    <img src={plantgif} alt="loading" />
                  </div>
                )}
                <button className="font-bold hover:scale-110" onClick={handleClear}>
                  All categories
                </button>
              </div>
            </div>
          </div>
          <div className="grid items-center text-start ml-4">
            <h1 className="text-4xl font-poppins italic mt-4 mb-2">Featured Products</h1>
            <ProductsTrending productTrending={productTrending} />
          </div>
        </div>

        <div className="lg:w-2/3 ml-4">
          <Cards allProducts={displayedProducts} />
        </div>
      </div>
      <div className={styles.cardsDiv}></div>
      <Pagination
        count={totalPages}
        page={currentPage} 
        onChange={handleChangePage}
        className={styles.pagination}
        size="large"
        sx={{
          "& .Mui-selected": {
            backgroundColor: "#50a050",
            fontSize: "20px",
          },
          "& .MuiPaginationItem-root": {
            fontSize: "15px",
          },
          "& .paginationButton": {
            backgroundColor: "#50a100"
          }
        }}
      />
    </div>
  );
};

export default Shop;
