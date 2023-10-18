// import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteProductCart, getProductCart } from "../../Redux/actions/product/action";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {FaTrashAlt} from "react-icons/fa"
const Cart = ({id,name, price, image, amount}) => {
  const total = (price * amount)
  const pricee = price.replace(/\.00$/, '');
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { user,} = useAuth0();
  const dispatch = useDispatch();

  const handleDelete = (idProduct, email) => {
    if(!deleteClicked){
      setDeleteClicked(true) 
      dispatch(deleteProductCart(idProduct, email)).then(() => {
      dispatch(getProductCart(user.email));


    }
    
    )

    setTimeout(()=>
    {setDeleteClicked(false)},3000
    )
    }
   
  };


return(
    <div className=" grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 bg-gray-100 mx-10 rounded-2xl ">
      <div className=" flex items-center justify-center row-span-3  sm:row-span-1 ">
          <Link to={`/detail/${id}`}>
             <div className="w-[150px] h-[150px] mx-auto"><img className="w-[100%] h-[100%] rounded-md" src={image[0]}/></div>
          </Link>
      </div>
    
      <div className=" flex items-center  ">
           <div className=" space-y-10 ">
              <p className="text-3xl font-medium  ">{name}</p >
     
              <strong>${pricee}</strong>
            </div>
      </div>
      <div className="grid  h-full row-span-2 grid-cols-2 md:grid-cols-2 md:col-span-2">
        <div className="">
            <div className="flex items-center justify-center h-full">
                  <p className=" text-center sm:text-3xl flex justify-center  items-center font-semibold h-full">Amount: {amount} </p>
            </div>
      
        </div>     
        <div className=" flex justify-end items-center   ">
         
              <div className="total md:my-18 sm:mx-10 sm:ml-10">
                <strong >${total}</strong>
          
            
               
                  <button className="exit  mx-10 sm:mr-20"onClick={()=>handleDelete(id,user.email)}
                  disabled={deleteClicked}><FaTrashAlt size='18'/></button>
                </div>
              
       
        
                    
         </div>
      </div>
      
            
     
      

    </div>
)

}

export default Cart;