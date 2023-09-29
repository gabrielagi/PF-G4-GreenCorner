import { useDispatch } from "react-redux";
import { useEffect  } from "react";
import "tailwindcss/tailwind.css"
import Cards from "../../components/Cards/Cards"
import Categories from "../../components/Categories/Categories";
import { getAllProducts } from "../../Redux/actions/product/action"
import { getAllCategories } from "../../Redux/actions/product/action"
import { useSelector } from "react-redux";
import { filterByName, filterByPrice  } from "../../Redux/actions/product/action";
import styles from  "./Shop.module.css"
import { useState } from "react";

const Shop = () => {

  const allProducts= useSelector(state=>state.allProducts)
  const allCategories = useSelector(state=>state.categories);
  const [nameOrder, setNameOrder] = useState(""); 
  const [priceOrder, setPriceOrder] = useState("");


  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllProducts());
},[dispatch]);




function handleOrder(e) {
  const selectedValue = e.target.value;

  if (selectedValue === "asc" || selectedValue === "desc") {
    setNameOrder(selectedValue); 
    setPriceOrder(""); 
    dispatch(filterByName(selectedValue));
  }
  
  else if (selectedValue === "high" || selectedValue === "low") {
    setNameOrder(""); 
    setPriceOrder(selectedValue); 
    dispatch(filterByPrice(selectedValue));
  }
  else {
      setNameOrder(""); 
      setPriceOrder(""); 
      dispatch(getAllProducts());
    }
}

return (
  <div>
    <div className={styles.filtros}>
      <select
        onChange={(e) => handleOrder(e)}
        className={styles.order}
        value={nameOrder} 
      >
        <option  className={styles.title} value="">
          Name ⮟
        </option>
        <option value="asc">A - Z </option>
        <option value="desc">Z - A </option>
      </select>
      <select
        onChange={(e) => handleOrder(e)}
        className={styles.order}
        value={priceOrder} 
      >
        <option  className={styles.title} value="">
          Price ⮟
        </option>
        <option value="high">High - Low </option>
        <option value="low">Low - High </option>
      </select>
    </div>

    <div className="flex flex-col lg:flex-row">
     
      <div className="lg:w-1/3 mr-4">

      </div>

      <div className="lg:w-2/3 ml-4">
        <Cards allProducts={allProducts} />
      </div>

    </div>
    <Categories allCategories={allCategories}/>
  </div>
);
};

export default Shop;