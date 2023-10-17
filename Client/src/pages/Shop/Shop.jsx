import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import styles from "./Shop.module.css";
import Cards from "../../components/Cards/Cards";
import { setCurrentPage } from "../../Redux/actions/product/action";
import Category from "../../components/Categories/Categorie";
import ProductsTrending from "../../components/ProductsTrending/ProductsTrending";
import plantgif from "../../assets/plantgif.gif";
import {
  getAllProducts,
  resetAllProducts,
  getAllCategoriesShop,
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
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const productsPerPage = 8;

  const dispatch = useDispatch();

  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value)); // Actualiza la página actual en el estado de Redux
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategoriesShop());
    dispatch(getProductsTrending());
  }, [dispatch]);

  function handleOrder(e) {
    const selectedValue = e ? e.target.value : e;

    if (selectedValue === "asc" || selectedValue === "desc") {
      setNameOrder(selectedValue);
      setPriceOrder("");
      dispatch(filterByName(selectedValue));
      dispatch(setCurrentPage(1));
    } else if (selectedValue === "high" || selectedValue === "low") {
      setNameOrder("");
      setPriceOrder(selectedValue);
      dispatch(filterByPrice(selectedValue));
      dispatch(setCurrentPage(1));
    } else {
      setNameOrder("");
      setPriceOrder("");
      setSelectedCategory(true);
      dispatch(setCurrentPage(1));
      dispatch(resetAllProducts());
    }
  }

  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
    setNameOrder("");
    setPriceOrder("");
    dispatch(setCurrentPage(1));
  };

  const handleClear = () => {
    setSelectedCategory(true);
    dispatch(resetAllProducts());
  };

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
        <div className="mb-10 md:mr-4 bg-gray-100 mx-[40px] px-10 h-85 w-90">
          <div>
            <div className="grid items-center text-start ml-4">
              <h1 className="text-4xl font-bold px-10 font-poppins mt-4 text-green-700 ">
              Categories
              </h1>
              <br />

              <div className=" mb-2 px-10">
                {allCategories ? (
                  allCategories.map((p, i) => (
                    <div key={i} className="font-semibold hover:scale-110 hover:font-bold hover:text-green-500"> <Category
                      
                      name={p.name}
                      id={p.id}
                      selected={p.name === selectedCategory}
                      onSelect={handleCategorySelect}
                    /> </div>
                   
                  ))
                ) : (
                  <div>
                    <img src={plantgif} alt="loading" />
                  </div>
                )}
                <button
                  className="font-bold hover:scale-110 hover:text-green-500"
                  onClick={handleClear}
                >
                  All categories
                </button>
              </div>
            </div>
          </div>
          <div className="grid items-center text-start   px-10">
            <h1 className="text-4xl font-poppins font-bold text-green-700 mt-4 mb-2">
              Featured Products
            </h1>
            <ProductsTrending productTrending={productTrending} />
          </div>
        </div>

        <div className="mx-auto md:px-40 ">
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
            backgroundColor: "#50a100",
          },
        }}
      />

      {/* <button onClick={handleCheckout}>Checkout</button> */}
    </div>
  );
};

export default Shop;
