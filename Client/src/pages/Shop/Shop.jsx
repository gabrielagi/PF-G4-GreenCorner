import { useDispatch } from "react-redux";
import { useEffect  } from "react";
import "tailwindcss/tailwind.css"
import Cards from "../../components/Cards/Cards"
import Category from "../../components/Categories/Categories";
import {
  getAllProducts,
  resetAllProducts,
} from "../../Redux/actions/product/action";
import { getAllCategories } from "../../Redux/actions/product/action";
import { getProductsTrending } from "../../Redux/actions/product/action";
import { useSelector } from "react-redux";
import { filterByName, filterByPrice  } from "../../Redux/actions/product/action";
import styles from  "./Shop.module.css"
import { useState } from "react";
import plantgif from "../../assets/plantgif.gif";
import { FiRefreshCw } from "react-icons/fi";

const Shop = () => {
  const products = useSelector((state) => state.product);
  const allCategories = useSelector((state) => state.categories);
  const [nameOrder, setNameOrder] = useState("");
  const productTrending = useSelector((state) => state.productTrending);

  const [priceOrder, setPriceOrder] = useState("");


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
      dispatch(resetAllProducts());
    }
}

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
        <select
          onChange={(e) => handleOrder(e)}
          className={styles.order}
          value={nameOrder}
        >
          <option className={styles.title} value="">
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
          <option className={styles.title} value="">
            Price ⮟
          </option>
          <option value="high">High - Low </option>
          <option value="low">Low - High </option>
        </select>
       
      </div>
      
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 mr-4"></div>

        <div className="lg:w-2/3 ml-4">
          <Cards allProducts={products} />
        </div>
      </div>
    
      <div className="lg:w-2/3 ml-4">
        <Category allCategories={allCategories} />
      </div>
      <section className="my-60"></section>

     
    </div>
  
 
);
};

export default Shop;