import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../Redux/actions/user/user-actions";
import Card from "../components/Cards/Card/Card";
import Category from "../components/Categories/Categorie";
import { useAuth0 } from "@auth0/auth0-react";
import {findFavByName,resetAllFavorites, resetAllProducts, getAllCategories, filterFavByName,filterFavByPrice,filterFavByCategory } from "../Redux/actions/product/action";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import { setCurrentPage } from "../Redux/actions/product/action";
import {BiSearch} from "react-icons/bi"
import styles from "../pages/Shop/Shop.module.css";

import './Favorite.styles.css'
const Favorites = () => {
   



const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const allCategories = useSelector((state) => state.categories);
  const { user } = useAuth0();
  const currentPage = useSelector((state) => state.pagination.currentPage); 
  const productsPerPage = 9;
  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value)); // Actualiza la página actual en el estado de Redux
  };


  const totalFavorites = favorites?.length  ;
console.log(totalFavorites)
  const totalPages = Math.ceil(totalFavorites / productsPerPage);




  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedFavorites = favorites && totalPages>1 ?favorites.slice(startIndex, endIndex) : favorites ;


  useEffect(() => {
    console.log('gua entra')
    console.log(dispatch)
    dispatch(getFavorites(user.email));
    dispatch(getAllCategories())

    return
  }, [dispatch]);

const [nameOrden, setNameOrden] = useState("");
const [priceOrden, setPriceOrden] = useState("");
const [selectedCategory, setSelectedCategory] = useState(null);
const [inputValue, setInputValue] = useState("")
function handleOrden(e) {
  const selectedValue = e ? e.target.value : e;

  if (selectedValue === "asc" || selectedValue === "desc") {
    setNameOrden(selectedValue);
   
    setPriceOrden("");
    dispatch(filterFavByName(selectedValue));
    
    dispatch(setCurrentPage(1))
  } else if (selectedValue === "high" || selectedValue === "low") {
    setNameOrden("");
    setPriceOrden(selectedValue);
    console.log(priceOrden)
    dispatch(filterFavByPrice(selectedValue));
    dispatch(setCurrentPage(1))
  } else {
    setNameOrden("");
    setPriceOrden("");
    setSelectedCategory(true);
    dispatch(setCurrentPage(1))
    dispatch(resetAllProducts());
   
  }
}

const handleCategorySelect = (name) => {
  console.log(favorites)
  setSelectedCategory(name);   
  setNameOrden("");
  setPriceOrden("");
  dispatch(setCurrentPage(1))
};

const handleClear = () => {
  setSelectedCategory(true);
  dispatch(resetAllFavorites());
}
const handleChange=(event)=>{
  setInputValue(event.target.value)
}

const handleSubmit=(event)=>{
    
  event.preventDefault()
  dispatch (findFavByName(inputValue))
  setInputValue('')


}
console.log('ants del return');
console.log(favorites)
  return (
    <div className="font-poppins mx-5 bg-gray-200">
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

<h1 className="  font-poppins font-extrabold py-10 my-10 text-4xl sm:text-5xl bg-[url('https://as1.ftcdn.net/v2/jpg/02/75/54/16/1000_F_275541628_oFzPVt2M2WqJhlkG3MhaPbcwjeXiFAst.jpg')] bg-cover  h-[100px] md:text-6xl text-gray-300 text-start pl-20">YOUR garden </h1>
      <div className="grid md:grid-cols-2 gap-x-20 md:gap-x-10  my-10 ">
        <div className="py-10    my-10  align-top justify-center   w-full col-span-1 bg-green-500 bg-opacity-25 grid md:h-[700px] object-top max-h-max md:w-[400px] md:mx-auto md:ml-40 ">
          <div className="box bg-green-800 bg-opacity-25  px-10 text-center h-[100px] mb-10 items-center align-middle justify-center object-center">
           
                <input placeholder="Search.. " onChange={handleChange} value={inputValue} className=" w-full self-center center my-10  h-20 md:h-20 bg-white "></input>
                <button type='submit' onClick={handleSubmit}><BiSearch size='25px'></BiSearch></button>
          </div>
               <div className=" md:-mt-[200px] md:content-start  md:row-start-7 md:row-span-1 ">
                <div className="bg-green-800 bg-opacity-50 p-20 text-center grid gap-2 md:gap-10 grid-cols-2 md:grid-cols-1 md:align-top md:justify-start">
                <h1 className="mx-auto  col-span-2  md:col-span-1 text-3xl font-medium">Ordenar por</h1>
                <label htmlFor="nameOrden" className="text-2xl font-bold m md:-mb-8">Alfabético</label>
               <div className="my-">
                      <Select
            id="nameOrden"
            name="nameOrden"
            value={nameOrden}
            onChange={handleOrden}
            label="Name"
          >
            <MenuItem value="asc" style={{ fontSize: "15px" }}>
              A - Z
            </MenuItem>
            <MenuItem value="desc" style={{ fontSize: "15px" }}>
              Z - A
            </MenuItem>
          </Select>
               </div>
          
        <div>
        <InputLabel htmlFor="priceOrden">Price</InputLabel>
          <Select
            id="priceOrden"
            name="priceOrden"
            value={priceOrden}
            onChange={handleOrden}
            label="Price"
          >
            <MenuItem value="high" style={{ fontSize: "15px" }}>
              High - Low
            </MenuItem>
            <MenuItem value="low" style={{ fontSize: "15px" }}>
              Low - High
            </MenuItem>
          </Select>
        </div>
        <div className="mt-4 mb-2">
                {allCategories ? (
                  allCategories.map((p, i) => (
                    <Category
                      key={i}
                      name={p.name}
                      id={p.id}
                      selected={p.name === selectedCategory}
                      onSelect={handleCategorySelect}
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
            
                
                
            </div>  
 

            <div className="grid  sm:grid-cols-3 gap-10 mr-8 md:mr-10  md:-ml-20 grid-cols-2 my-10 md:gap-10">
            {favorites ? (
  Array.isArray(favorites) && favorites.length > 0 ? (
    displayedFavorites.map((p) => (
      <div className="w-[50px] h-[50px] sm:w-[200px] sm:h-[200px]" key={p.id}><Card
        
        id={p.Product?.product_id || p.product_id}
        name={p.Product?.name || p.name}
        images={p.Product?.images || p.images}
        price={p.Product?.price || p.price}
        className="w-[50px] h-[50px] sm:w-[200px] sm:h-[200px]"
      >
        {p.value}
      </Card> </div>
      
    ))
  ) : favorites.Product ? (
    <div className="w-[50px] h-[50px] sm:w-[200px] sm:h-[200px]">
      <Card
      key={favorites.id}
      id={favorites.Product.product_id || favorites.product_id}
      name={favorites.Product.name || favorites.name}
      images={favorites.Product.images || favorites.images}
      price={favorites.Product.price || favorites.price}
      className="w-[50px] h-[50px] sm:w-[200px] sm:h-[200px]"
    >
      {favorites.value}
    </Card> </div>
    
  ) : (
    <p>No hay productos en favoritos</p>
  )
) : (
  <p>Favoritos no disponible</p>
)}
    </div>
                    
                     
          
      </div>

      {/* //className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px]  */}
    </div>
  );
};

export default Favorites;
