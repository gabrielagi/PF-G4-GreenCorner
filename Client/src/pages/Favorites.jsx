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
import leafBanner from '../img/plantbanner.jpg'
import EmptyFavorites from "../components/EmptyFavorites/EmptyFavorites";
import './Favorite.styles.css'
const Favorites = () => {
   



const dispatch = useDispatch();
useEffect(() => {
  console.log('gua entra')
  console.log(dispatch)
  dispatch(getFavorites(user.email));
  dispatch(getAllCategories())

  return
}, [dispatch]);
  const favorites = useSelector((state) => state.favorites);
  const allCategories = useSelector((state) => state.categories);
  const { user } = useAuth0();
  console.log(user)
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
  console.log(displayedFavorites);



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
    <div className="bg-[url('https://wallpapers.com/images/hd/different-green-leaves-plant-4k-desktop-wcfnrf99bahxrcl3.jpg')]">
      <h1 className="  font-poppins font-extrabold   text-6xl text-center bg-cover bg-top h-[150px] md:text-9xl text-gray-200 md:text-start pt-[80px] md:pl-[170px] md:pb-[100px]  bg-opacity-0 ">YOUR garden </h1>
       <div className="font-poppins    bg-gray-100 bg-opacity-100">
          
       <div className="grid md:grid-cols-2 gap-x-20 md:gap-x-1  my-10 pt-10"> 
  {/*-- -----INICIO DE GRID----------------- BARRA  ------------------------------------------------- */}
            <div className=" ">

                {/*-- ---------------------- SEARCHBAR ------------------------------------------------- */}
                <div className="box  mt-10 bg-green-300  h-[50px] w-[300px] mx-auto  md:h-[70px] md:w-[350px] mb-10 justify-center  ">
                      <input placeholder="Search.. " onChange={handleChange} value={inputValue} className=" w-full self-center center my-10  h-20 md:h-20 bg-white "/>
                      <button type='submit' onClick={handleSubmit}><BiSearch color='black' size='30px'/></button>
                </div>
                 
             <div className="  ">
             <div className="bg-gray-300 bg-opacity-60 pt-10 mx-auto flex justify-center md:w-[400px]">
                    <Pagination 
                count={totalPages}
                page={currentPage} 
                onChange={handleChangePage}
                className="text-white"
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
                }}  />
                  </div>  
                   {/*-- ---------------------- BARRA ------------------------------------------------- */}
               <div className="bg-gray-300 bg-opacity-60 py-16 md:w-[400px] md:h-[700px] md:mx-auto">

                    <h1 className="mx-auto mb-6 text-center text-gray-600 font-bold col-span-2  md:col-span-1 text-4xl md:font-medium ">ORDER BY</h1>   
                       
                    <div className=" grid grid-cols-2 gap-x-5 text-center md:grid-cols-1 ">
                        <div> 
                          <p  className="text-gray-500 text-2xl font-bold" htmlFor="priceOrden">ALPHABETIC</p>
                          <Select className="w-[120px] items-center font-extrabold "style={{ fontSize: "15px" }}
                              id="nameOrden"  
                              name="nameOrden"
                              value={nameOrden}
                              onChange={handleOrden}
                              label="Name">
                        
                              <MenuItem value="asc" style={{ fontSize: "15px" }}>
                                A - Z
                              </MenuItem>
                              <MenuItem value="desc" style={{ fontSize: "15px" }}>
                                Z - A
                              </MenuItem>
                          </Select>
                        </div>
                        
                        <div>
                            <p className="text-gray-500 font-bold text-2xl" htmlFor="priceOrden">PRICE</p>
                            <Select className="w-[120px]" style={{ fontSize: "15px" }}
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
                    </div>
                <div className="px-[40px] grid sm:grid-cols-2 md:grid-cols-1 gap-x-1 my-10 text-3xl space-y-2 font-medium text-gray-500"  > 
                      {allCategories ? (allCategories.map((p, i) => (
                        <button key={i} className="hover:scale-110">
                          <Category 
                           
                            name={p.name}
                            id={p.id}
                            
                            selected={p.name === selectedCategory}
                            onSelect={handleCategorySelect}
                          />
                          </button>
                          
                        ))) 
                      : 
                      (<div>
                          <img src={plantgif} alt="loading" />
                        </div>)}
                      
                     
                  </div>

                      <p className="text-center hover: font-medium text-3xl text-gray-700 hover:scale-110" onClick={handleClear}>
                        All categories
                      </p>
              
                  
               </div>
              </div>
                        

              
             
                    
                    
            </div>  
   {/*-- ---------------------- CARDS ------------------------------------------------- */}
                <div className="grid grid-cols-2 m  md:grid-cols-3">
                          {favorites ? (
                Array.isArray(favorites) && favorites.length > 0 ? (
                displayedFavorites.map((p) => (
                  <div className="" key={p.id}><Card
                    
                    id={p.Product?.product_id || p.product_id}
                    name={p.Product?.name || p.name}
                    images={p.Product?.images || p.images}
                    price={p.Product?.price || p.price}
                    className=""
                  >
                    {p.value}
                  </Card> </div>
                  
                ))
              ) : favorites.Product ? (
                <div className="">
                  <Card
                  key={favorites.id}
                  id={favorites.Product.product_id || favorites.product_id}
                  name={favorites.Product.name || favorites.name}
                  images={favorites.Product.images || favorites.images}
                  price={favorites.Product.price || favorites.price}
                  className="h-[250px] w-[250px]"
                >
                  {favorites.value}
                </Card> </div>
                
              ) : (
                <div className="col-span-3 row-span-2 my-auto "><EmptyFavorites  /></div>
              )
            ) : (<div className="col-span-3 row-span-2 my-auto "><EmptyFavorites  /></div>
              
            )}

         </div>
          
                        
              
        </div>

          {/* //className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px]  */}
    </div>
    </div>
   
  );
};

export default Favorites;
