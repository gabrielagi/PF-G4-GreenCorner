import { useDispatch } from "react-redux";
import { useEffect  } from "react";
import "tailwindcss/tailwind.css"
import Cards from "../../components/Cards/Cards"
import { getAllProducts } from "../../Redux/actions/product/action"
import { useSelector } from "react-redux";
import { filterByName, filterByPrice  } from "../../Redux/actions/product/action";
import styles from  "./Shop.module.css"
import { useState } from "react";

const Shop = () => {

  const allProducts= useSelector(state=>state.allProducts)
  const [orderBy, setOrderBy] = useState(""); 
  const [priceOrder, setPriceOrder] = useState("");

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllProducts());
},[dispatch]);




function handleOrder(e) {
  const selectedValue = e.target.value;

  if (selectedValue === "asc" || selectedValue === "desc") {
    setOrderBy(selectedValue); 
    setPriceOrder(""); 
    dispatch(filterByName(selectedValue));
  }
  
  else if (selectedValue === "high" || selectedValue === "low") {
    setOrderBy(""); 
    setPriceOrder(selectedValue); 
    dispatch(filterByPrice(selectedValue));
  }
}

return (
  <div>
    <div className={styles.filtros}>
      <select
        onChange={(e) => handleOrder(e)}
        className={styles.order}
        value={orderBy} 
      >
        <option disabled value="">
          Order ⮟
        </option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>
      <select
        onChange={(e) => handleOrder(e)}
        className={styles.order}
        value={priceOrder} 
      >
        <option disabled value="">
          Price ⮟
        </option>
        <option value="high">High - Low</option>
        <option value="low">Low - High</option>
      </select>
    </div>
    <Cards allProducts={allProducts} />
  </div>
);
};

export default Shop;