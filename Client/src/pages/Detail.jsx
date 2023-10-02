import "tailwindcss/tailwind.css"

import { Link, useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react";
import {getProductById} from '../Redux/actions/product/action'
import Card from "../components/Cards/Card/Card";
import {VscArrowCircleLeft } from "react-icons/vsc"

const Detail = () => {
  const {id} = useParams()
  const dispatch=useDispatch()

 console.log(id)
 const product = useSelector((state=>state.productDetail))

  useEffect(()=>{
    dispatch( getProductById(id))
    console.log(id)
    console.log('llegó '+id)
  },[])

  console.log(product?.name)


 return (
 <div>
     
<Link className="ml-16 mt-20" to='/shop'><button ><VscArrowCircleLeft color='gray'size='5rem'/></button></Link>
<div className="mx-10 sm:mx-60">
      


      


      <div className="grid grid-cols-1   sm:grid-cols-1 md:grid-cols-2  gap-12 text-[#a9a9a9]">
        
          <div className="imagen bg-red-500 border-blue-600 m-auto" >
            <img src="https://c8.alamy.com/compes/bftc5t/chimpance-alegre-con-los-brazos-levantados-delante-de-un-fondo-blanco-foto-de-estudio-bftc5t.jpg"></img>
          </div>

          <div className=" px-10 bg-[#f6f6f6] justify-between">
              
            <h2 className="mt-10 pt-5 text-6xl text-[#444444]">{product?.name}</h2>
            <p className="py-5">rating</p>
            <p className="py-t text-5xl text-[#444444]">{product.price}</p>
            <p className="py-20">{product.description }</p>
            <h2 className="text-5xl text-[#343434]">Variante</h2>
            <select className="w-40">
              <option>uno</option>
              <option>dos</option>
            </select>
            <div className=" grid grid-cols-2 mx-auto sm:  my-10 gap-8 ">
              <input placeholder='Cantidad' className="  sm: bg-[#ffffff] border text-center  p-6 rounded-2xl"></input>
              <button className="py-4 sm: bg-[#75ec57] col-span-1 rounded-3xl">ADD TO CART</button>

            </div>
              <button className="p-8 my-10 pl-24 rounded-2xl border border-gray-400bg-[#cec6c6]">Add to my Garden</button>
            </div>

            <div className="imagen grid grid-cols-3   bg-red-500 max-h-48 mb-20 ">
              <img src="https://images.rawpixel.com/image_png_social_square/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcGYtczEtdGVkLTA5ODgucG5n.png?s=NBr-myAqigX97wmro0xxh3LAOCVH1Cf4vTEdxaT3OEY" className="bg-orange-500 "></img>
              <img src="https://img.lovepik.com/free-png/20210924/lovepik-plant-pot-png-image_401306819_wh1200.png" className="bg-orange-500  "></img>
              <img src="https://atlas-content-cdn.pixelsquid.com/stock-images/potted-plant-flower-pot-mdm41mF-600.jpg" className="bg-orange-500 "></img>
          </div>
    </div>
      
      <div className="grid grid-cols-1 mt-32 bg-[#f6f6f6] gap-y-6 mb-28 sm:ml-28 text-[#a9a9a9]">
        <div className=" text-center py-6 text-4xl text-[#444444]">Descripción</div>
        <hr></hr>
        <div className=" ">Fusce maximus tellus id molestie vulputate. In sit amet varius sem. Nam convallis, massa in lacinia molestie, quam odio porttitor nulla, sed gravida diam lectus id lorem. Donec pellentesque risus in metus ornare imperdiet. Sed ligula mauris, imperdiet a ipsum vel, egestas semper turpis. Aliquam dapibus urna tristique leo vulputate elementum. Donec arcu tellus, sollicitudin sed neque pretium, iaculis venenatis lorem.</div>

        <div className="">Nullam ultricies lacus in feugiat viverra. Nunc gravida sagittis elit, sed sodales lacus posuere in. Aliquam mi turpis, imperdiet ac sollicitudin at, ultrices ac est. Praesent consectetur, neque sed dictum pharetra, purus ante fringilla metus, in egestas dui lacus quis justo. Maecenas lacus augue, vulputate quis ullamcorper et, porta et velit. Sed aliquet neque elit. Nunc non sagittis nisl. Sed tempus mollis diam eget laoreet. In ut pulvinar tellus, nec tincidunt nulla. Morbi a hendrerit sapien. Nulla nec turpis sed eros lobortis ornare. Morbi sodales interdum ipsum.</div>
      </div>
    <h3 className="my-20 mt-20 text-center text-5xl ">Related products</h3>
    <div className="grid grid-cols-1   sm:grid-cols-2 sm:gap-x-10 sm:mx-auto sm:px-auto    md:grid-cols-4 mb-60">
    <Card name={product.name} image={product.image} productrice={product.price} id={product.product_id}></Card>
    <Card name={product.name} image={product.image} productrice={product.price} id={product.product_id}></Card>
    <Card name={product.name} image={product.image} productrice={product.price} id={product.product_id}></Card>
    <Card name={product.name} image={product.image} productrice={product.price} id={product.product_id}/>



    </div>
     


      

    </div>
    </div>
  );
}

export default Detail;