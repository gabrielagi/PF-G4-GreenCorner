import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../Redux/actions/user/user-actions";


const Favorites = () => {
const dispatch=useDispatch()
  const favorites =useSelector((state) => state.allFavorites);

  useEffect(() => {
    dispatch(getFavorites());
  
  }, [dispatch]);
console.log(favorites)
  const products=[
  
  {value:2},{value:3},{value:4},{value:5},{value:6},{value:7},{value:8},{value:9},{value:10}
]

  return (
    <div className="font-poppins mx-5">
<h1 className="text-center  font-poppins font-extrabold py-10 my-10 text-4xl sm:text-5xl bg-yellow-200">Mis productos favoritos</h1>
      <div className="grid md:grid-cols-2 gap-x-20 md:gap-x-10  my-10 ">
        <div className="py-10  my-10 place-self-center align-top  w-full col-span-1 bg-green-500 grid md:h-full max-h-max md:w-[400px] md:ml-20  ">
          <div className="bg-red-500 px-10 text-center h-20 mb-10 ">
           
                <input placeholder="busca lo que quieras " className="w-full h-20 md:h-full "></input>
          </div>
               <div className="md:content-start md:items-start md:row-start-2 md:row-span-4">
                <div className="bg-pink-500 text-center mx-10 grid gap-2 md:gap-10 grid-cols-2 md:grid-cols-1 md:align-top md:justify-start">
                <h1 className="mx-auto  col-span-2  md:col-span-1 text-3xl font-medium">Ordenar por</h1>
                <button className="bg-lime-500 p-4 ">Precio</button>
                <button className="bg-lime-500 p-4">Alfabetico</button>
               </div>
               </div>
            
                
                
            </div>  

            <div className="grid mx-auto sm:grid-cols-3 gap-10  bg-red-500 grid-cols-2 my-10 md:gap-20">
              {/* {products.map((p,i)=><div className="w-[350px] h-[350px]" key={i}> {p.value}</div>)} */}
              <div  className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px] bg-blue-500">1</div>
              <div  className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px] bg-green-500">2</div>
              <div  className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px] bg-violet-500">3</div>
              <div  className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px] bg-yellow-500">4</div>
              <div  className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px] bg-orange-500">5</div>
              <div  className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px] bg-pink-500">6</div>
              <div  className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px] bg-gray-500">7</div>
              <div  className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px] bg-lime-500">8</div>
              <div  className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px] bg-cyan-500">9</div>
            </div>  
      </div>
              
      


     
    </div>
  );
};

export default Favorites;
