import "tailwindcss/tailwind.css"

import { Link, useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import {getProductById} from '../Redux/actions/product/action'
import Card from "../components/Cards/Card/Card";
import {VscArrowCircleLeft } from "react-icons/vsc"

const Detail = () => {
  const {id} = useParams()
  const dispatch=useDispatch()

 const allProducts= useSelector((state=>state.allProducts))
 const product = useSelector((state=>state.productDetail))
 
 const [activeImg, setActiveImg]=useState()
 const [amount, setAmount]=useState(1)
 
 
 useEffect(() => {
  dispatch(getProductById(id))
  

}, [id]);
 
  
    
 

 

  console.log(product)
  console.log(allProducts)

  if(product.name){return (
  
 <div>
     
<Link className="ml-16 mt-20" to='/shop'><button ><VscArrowCircleLeft color='gray'size='5rem'/></button></Link>
<div className="mx-10 sm:mx-60">
      


      


      <div className="grid grid-cols-1   sm:grid-cols-1 md:grid-cols-2  gap-12 text-[#a9a9a9]">
      {product.name && <div className=" grid grid-cols-1 sm:grid-cols-1   gap-6 justify-between lg:w-4/5 border-blue-600 m-auto" >
              <img src={activeImg || product.images[0]} alt=''/> 
                
                
                <div className="imagen flex flex-row justify-between gap-10  h-60   bg-green-100  mb-20 ">
                  {product.images?.map((imagen,i)=> {
                  return (<img key={i} src={imagen} className=" rounded-md w-60 cursor-pointer" onClick={()=> setActiveImg(imagen)} />)
                })}
            
              </div>
          </div>}
          

          <div className=" px-10 bg-[#f6f6f6] justify-between">
              
            <h2 className="mt-10 pt-5 text-6xl font-bold text-[#444444]">{product?.name}</h2>
            <p className="py-5">rating</p>
            <p className="py-t text-5xl text-[#444444]">{product.price}</p>
            <p className="py-20">{product.description }</p>
            <h2 className="text-5xl text-[#343434]">Variante</h2>
           
            <select className="w-40">
              <option>uno</option>
              <option>dos</option>
            </select>

            <div className=" grid grid-cols-2  sm:  my-10  ">
              
              <div className="flex flex-row items-center">
                <button className="bg-gray-200 py-8 px-10 rounded-lg text-green-800 text-4xl" onClick={()=> {if(amount===1){return} else{setAmount((any)=> any -1)}}}>-</button>
                <span className="py-8 px-10 text-4xl rounded-lg">{amount}</span>
                <button className="bg-gray-200 py-8 px-10 rounded-lg text-green-800 text-4xl" onClick={()=> setAmount((any)=> any +1)}>+</button>
              </div>
              <button className="py-4 sm: bg-[#75da5c] col-span-1 rounded-3xl">ADD TO CART</button>

            </div>
              <button className="p-8 my-10 pl-24 rounded-2xl border border-gray-400bg-[#cec6c6]">Add to my Garden</button>
            </div>

            
    </div>
      
      <div className="grid grid-cols-1 mt-32 bg-[#f6f6f6] gap-y-6 mb-28 sm:ml-28 text-[#a9a9a9]">
        <div className=" text-center py-6 text-4xl text-[#444444]">Descripción</div>
        <hr></hr>
        <div className=" ">Fusce maximus tellus id molestie vulputate. In sit amet varius sem. Nam convallis, massa in lacinia molestie, quam odio porttitor nulla, sed gravida diam lectus id lorem. Donec pellentesque risus in metus ornare imperdiet. Sed ligula mauris, imperdiet a ipsum vel, egestas semper turpis. Aliquam dapibus urna tristique leo vulputate elementum. Donec arcu tellus, sollicitudin sed neque pretium, iaculis venenatis lorem.</div>

        <div className="">Nullam ultricies lacus in feugiat viverra. Nunc gravida sagittis elit, sed sodales lacus posuere in. Aliquam mi turpis, imperdiet ac sollicitudin at, ultrices ac est. Praesent consectetur, neque sed dictum pharetra, purus ante fringilla metus, in egestas dui lacus quis justo. Maecenas lacus augue, vulputate quis ullamcorper et, porta et velit. Sed aliquet neque elit. Nunc non sagittis nisl. Sed tempus mollis diam eget laoreet. In ut pulvinar tellus, nec tincidunt nulla. Morbi a hendrerit sapien. Nulla nec turpis sed eros lobortis ornare. Morbi sodales interdum ipsum.</div>
      </div>
    <h3 className="my-20 mt-20 text-center text-5xl ">Related products</h3>
    <div className="flex flex-row gap-20 justify-center mx-auto my-10">
    {allProducts.map(( p)=>{ 
    if(p.categories.name === product.categories.name)
     return  (<Card key={p.id} id={p.product_id} name={p.name} images={p.images} price={p.price}/>)
   } ).slice(0,4)
      }

    </div>
     




      

    </div>
    </div>
  );}
 
}

export default Detail;