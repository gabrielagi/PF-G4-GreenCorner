import "tailwindcss/tailwind.css"
import { Link, useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react";
import {getProductById} from '../Redux/actions/product/action'

const Detail = () => {
  const {id} =useParams()
  const dispatch=useDispatch()


 console.log(id)
 const product=useSelector((state=>state.searchProduct[0]))

  useEffect(()=>{
    dispatch( getProductById(id))
    console.log(id)
    console.log('llegó '+id)
  },[])

  console.log(product)


  return (
    <div>
     <Link to='/'><button >Atrás</button></Link>

    <div className="grid grid-cols-1 sm:grid-cols-2 mx-60 gap-12">
      
      <div className="bg-red-500 ml-28" >
        <p>imagen</p>
      </div>

      <div className=" px-10 bg-blue-500 justify-between">
         
      <h2 className="mt-10 pt-5 text-6xl">Titulo del producto</h2>
      <p className="py-5">rating</p>
      <p className="py-t text-5xl">$160.00</p>
      <p className="py-20">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, sapiente! Quas cum cumque, nulla nesciunt, nam blanditiis minima est totam, consequuntur earum fugiat aperiam qui praesentium porro velit nostrum fugit.</p>
      <h2 className="text-5xl">Variante</h2>
      <select className="w-40">
        <option>uno</option>
        <option>dos</option>
      </select>
      <div className=" grid grid-cols-5 mr-64 my-10 gap-4 ">
        <p className="bg-red-500 text-center  p-6 rounded-2xl">1</p>
        <button className="bg-[#75ec57] col-span-4 rounded-1">ADD TO CART</button>
      </div>
    
        <button className="p-8 pl-24 rounded-2xl border border-gray-400bg-[#cec6c6]">Add to my Garden</button>
      
      
      </div>
      <div className="grid grid-cols-3  ml-28 bg-red-500 ">
        <div className="bg-orange-500 py-20 pl-20">miniaturas de fotos</div>
        <div className="bg-orange-300 py-20 pl-20">miniaturas de fotos</div>
        <div className="bg-orange-400 py-20 pl-20">miniaturas de fotos</div>
      </div>
    </div>
     


    </div>
  );
}

export default Detail;