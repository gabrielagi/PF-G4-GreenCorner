import { useDispatch } from "react-redux";
import { useEffect  } from "react";
import "tailwindcss/tailwind.css"
import Cards from "../../components/Cards/Cards"
import { getAllProducts } from "../../Redux/actions/product/action"
import { useSelector } from "react-redux";
import { filterByName, filterByPrice  } from "../../Redux/actions/product/action";
import styles from  "./Shop.module.css"

const Shop = () => {

  const allProducts= useSelector(state=>state.allProducts)

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllProducts());
},[dispatch]);



function handleOrder(e){
  if(e.target.value === "asc" || e.target.value === "desc"){
      e.preventDefault();
      dispatch(filterByName(e.target.value))
  }
  if(e.target.value === "high" || e.target.value === "low"){
      e.preventDefault();
      dispatch(filterByPrice(e.target.value))
  }
 /*  if(e.target.value === "all"){
      e.preventDefault();
      dispatch(resetProducts(e.target.value))
  } */
}

  return (
    <div>
      <div className={styles.filtros}>
  <select
  onChange={(e) => handleOrder(e)}
  className={styles.order}
  >
  <option disabled selected>Order</option>
  <option value="asc">A - Z</option>
  <option value="desc">Z - A</option>
  
</select>
<select
  onChange={(e) => handleOrder(e)}
  className={styles.order}
  >
  <option disabled selected>Price</option>
  <option value="high">High - Low</option>
  <option value="low">Low - High</option>
</select>
</div>
    <Cards allProducts={allProducts} />
    </div>
  );
}

export default Shop;