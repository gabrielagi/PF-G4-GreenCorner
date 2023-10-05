import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import styles from "./Shop.module.css";
import Cards from "../../components/Cards/Cards";
import Category from "../../components/Categories/Categories";
import ProductsTrending from "../../components/ProductsTrending/ProductsTrending";
import { getAllProducts, resetAllProducts, getAllCategories, getProductsTrending, filterByName,filterByPrice} from "../../Redux/actions/product/action";
import { useSelector } from "react-redux";
import plantgif from "../../assets/plantgif.gif";
import { FiRefreshCw } from "react-icons/fi";

const Shop = () => {
  const products = useSelector((state) => state.product);
  const allCategories = useSelector((state) => state.categories);
  const [nameOrder, setNameOrder] = useState("");
  const productTrending = useSelector((state) => state.productTrending);

  const [priceOrder, setPriceOrder] = useState("");

  const productsPerPage = 10;
    const currentPage = useSelector(state => state.currentPage);
    const firstIndexCountry = (currentPage - 1) * productsPerPage;
    const lastIndexCountry = firstIndexCountry + productsPerPage;
    const renderedProducts = products.slice(firstIndexCountry, lastIndexCountry);
    const lastPage = Math.ceil(products.length / 10)

    const handlerPagination = (direction, event) => {

        if((direction === -1 || (productsPerPage * currentPage) < products.length) && (currentPage + direction > 0)){
            const newPage = currentPage + direction
            dispatch(setPage(newPage))
        }
    }


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
        <Cards allProducts={renderedProducts} />
        </div>
      </div>
      <div className={styles.cardsDiv}>
              <div className={styles.pagination}>
                <button onClick={(event) => handlerPagination(-1, event)} className={styles.paginationButton}>Prev</button>
                <div>
                  <p>{ currentPage - 3 > 0 && `${currentPage - 3}`}</p>
                  <p>{ currentPage - 2 > 0 && `${currentPage - 2}`}</p>
                  <p>{ currentPage - 1 > 0 && `${currentPage - 1}`}</p>
                  <p className={styles.currentPage}>{currentPage}</p>
                  <p>{currentPage + 1 <= lastPage && `${currentPage + 1}`}</p>
                  <p>{currentPage + 2 <= lastPage && `${currentPage + 2}`}</p>
                  <p>{currentPage + 3 <= lastPage && `${currentPage + 3}`}</p>
              </div>

                <button onClick={(event) => handlerPagination(1, event)} className={styles.paginationButton}>Next</button>
      </div>
      </div>
      <div className="sm:w[10px]">
        <Category allCategories={allCategories} />
      </div>
          <br /><br /><br />

      <div className="">
        <strong className="relative ml-[90px] sm:ml-[90px] sm:text-[20px] ">Featured Products</strong>       
        <ProductsTrending productTrending={productTrending} />
      </div>
    </div>
  );
};

export default Shop;
