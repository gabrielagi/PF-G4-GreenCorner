import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//import { getAllProducts }from "../../Redux/actions/action"
import Card from "./Card/Card";


const allProducts = ({ allProducts }) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllProducts());
    },[dispatch]);

    return(
        <div>
               {allProducts.map((p, i)=>{
                return(
                    <div key={i}>
                      {/* nombre del preducto,
                      image,
                      precio */}
                    </div>
                )
               })}              
        </div>
       
)};
   
export default allProducts