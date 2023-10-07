import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import styles from "./Shop.module.css";
import Cards from "../../components/Cards/Cards";
import Category from "../../components/Categories/Categories";
import ProductsTrending from "../../components/ProductsTrending/ProductsTrending";
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
  const [page, setPage] = useState(1);
  const productsPerPage = 6;

  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setPage(value);
  };

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

  const startIndex = (page - 1) * productsPerPage;
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
        <div className="lg:w-1/3 mr-4"></div>

        <div className="lg:w-2/3 ml-4">
          <Cards allProducts={displayedProducts} />
        </div>
      </div>
      <div className={styles.cardsDiv}></div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        className={styles.pagination}
        size="large"
        color="primary"
        sx={{
          '& .Mui-selected': {
            backgroundColor: '#50a050',
            fontSize: '20px',
            
          },
          "& .MuiPaginationItem-root": {
            fontSize: "15px",
          },
        }}
        //classes={{ selected: "selected-button" }} // Aplica la clase CSS personalizada al botón seleccionado
      />
      <div className="sm:w[10px]">
        <Category allCategories={allCategories} />
      </div>
      <br />
      <br />
      <br />

      <div>
        <strong className="relative ml-[90px] sm:ml-[90px] sm:text-[20px]">
          Featured Products
        </strong>
        <ProductsTrending productTrending={productTrending} />
      </div>

      {/* <button onClick={handleCheckout}>Checkout</button> */}
    </div>
  );
};

export default Shop;
