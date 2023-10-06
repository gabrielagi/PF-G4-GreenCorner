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

const Shop = () => {
  const products = useSelector((state) => state.product);
  const allCategories = useSelector((state) => state.categories);
  const [nameOrder, setNameOrder] = useState("");
  const productTrending = useSelector((state) => state.productTrending);
  const [priceOrder, setPriceOrder] = useState("");

  const dispatch = useDispatch();

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
    border: 'none',
    minWidth: 100,
    '& label': {
      fontSize: '18px', 
      color: 'rgb(0, 133, 0)',
    },
    '& label.MuiInputLabel-shrink': {
      color: 'rgb(0, 133, 0)'
    },
    '.MuiOutlinedInput-notchedOutline': { 
      border: 'none',
    },
    '& .MuiInputBase-input': {
      fontSize: '15px',  
      color:"black"
    },
    '& .MuiSelect-icon': {
      color: 'rgb(0, 133, 0)' 
    },
  }}
>
  <InputLabel htmlFor="nameOrder" >Name</InputLabel>
  <Select
   
    id="nameOrder"
    name="nameOrder"
    value={nameOrder}
    onChange={handleOrder}
    label="Name"
  >
    <MenuItem value="asc" style={{ fontSize: '15px' }}>A - Z</MenuItem>
    <MenuItem value="desc" style={{ fontSize: '15px' }}>Z - A</MenuItem>
  </Select>
</FormControl>
        <FormControl sx={{
    border: 'none',
    minWidth: 100,
    '& label': {
      fontSize: '18px', 
      color: 'rgb(0, 133, 0)',
    },
    '& label.MuiInputLabel-shrink': {
      color: 'rgb(0, 133, 0)'
    },
    '.MuiOutlinedInput-notchedOutline': { 
      border: 'none',
    },
    '& .MuiInputBase-input': {
      fontSize: '15px',  
      color:"black"
    },
    '& .MuiSelect-icon': {
      color: 'rgb(0, 133, 0)' 
    },
  }}>
          <InputLabel htmlFor="priceOrder">Price</InputLabel>
          <Select
            id="priceOrder"
            name="priceOrder"
            value={priceOrder}
            onChange={handleOrder}
            label="Price"
          >
            <MenuItem value="high" style={{ fontSize: '15px' }}>High - Low</MenuItem>
            <MenuItem value="low" style={{ fontSize: '15px' }}>Low - High</MenuItem>
          </Select>
        </FormControl>        
      </div>


      
      

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 mr-4"></div>

        <div className="lg:w-2/3 ml-4">
          <Cards allProducts={products} />
        </div>
      </div>

      <div className="sm:w[10px]">
        <Category allCategories={allCategories} />
      </div>
      <br />
      <br />
      <br />

      <div >
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
