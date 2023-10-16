import "tailwindcss/tailwind.css";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductById } from "../Redux/actions/product/action";
import Card from "../components/Cards/Card/Card";
import { VscArrowCircleLeft } from "react-icons/vsc";
import loading from "../assets/loading.gif";
import axios from "axios";
import Carousel from "../components/DetailCarousel/DetailCarousel";
import Slider from "../components/Slider/Slider2";
import { toast } from "react-toastify";

import { postFavorites, deleteFavorite  ,getOneFavorites } from "../Redux/actions/user/user-actions";
import {
  postProductCart,
  getProductCart,
  updateProductCart,
} from "../Redux/actions/product/action";

import { useAuth0 } from "@auth0/auth0-react";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  /*   const link = import.meta.env.VITE_ENDPOINT; */
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [corazon, setCorazon] = useState(false);
  const allProducts = useSelector((state) => state.allProducts);
  const product = useSelector((state) => state.productDetail);

  const cart = useSelector((state) => state.productCart);

  const [activeImg, setActiveImg] = useState(
    product.images && product.images[0]
  );

  const [amount, setAmount] = useState(1);
  const [loadingImages, setLoadingImages] = useState(true);
  const handleImageClick = (newActiveImg) => {
    setLoadingImages(true);
    setTimeout(() => {
      setActiveImg(newActiveImg);
      setLoadingImages(false);
    }, 500); // Ajusta el tiempo de espera según tus necesidades
  };
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

 let heart = "❤️";

 let heartBroke = "💔"; 


  useEffect(() => {
 
    const fetchData = async () => {
      await dispatch(getProductById(id));
      setLoadingImages(false);
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    setActiveImg(product.images && product.images[0]);
  }, [product.images]);

  // Traigo todos los elementos del carrito del usuario (si existen)
  useEffect(() => {
    if (user && user.email) {
      dispatch(getProductCart(user.email));
      dispatch(getOneFavorites(user.email,id)).then((result) => {
      
        setCorazon(result)
      })
    }

  }, [user, dispatch]);

  const notify = (message) =>{
    if(message === "This product has been add in the cart"){
    toast.success(message + " 🛒", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }else {
    toast.error(message +" 🛒", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
   };
  

  const notifyII = (message, icons) => {
    toast.error(message, {
      icon: icons,
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyIII = () =>
    toast.error(
      "There is not enough stock available to add that quantity to the cart 🛑",
      {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

  const notifyVI = () =>
    toast.error("There is not enough stock available to checkout 🛑", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleAddToMyGarden = () => {

    if (isAuthenticated) {

      let favorite = {
        email: user.email,
        product_id: product.product_id,
      };

      dispatch(postFavorites(favorite)).then((result) => {
         
        notifyII(result, heart);
      });
      setCorazon(!corazon);

    } else {
      loginWithRedirect();
    }
  };
  const handleRemoveToMyGarden = (id) => {
    dispatch(deleteFavorite(id, user.email)).then((result) => {
         
      notifyII(result, heartBroke);
    });

    setCorazon(!corazon);
  };

  const handleAddToCart = () => {
    try {
      if (isAuthenticated) {
        const productInCart = cart.find(
          (item) => item.product_id === product.product_id
        );
        console.log("El producto ya existe en el carrito? ", productInCart);
        if (productInCart) {
          // El producto ya está en el carrito
          const availableStock = product.stock - productInCart.amount;
          console.log(
            "El producto ya existe en el carrito y tiene stock disponible para comprar de: ",
            availableStock
          );
          console.log(
            "El producto en el carrito tiene como stock a comprar viejo: ",
            productInCart.amount
          );
          console.log(
            "El total nuevo que quiero comprar es: ",
            cartQuantity + amount
          );
          if (availableStock >= amount) {
            // Hay suficiente stock para agregar más lo que contiene amount
            setIsAddingToCart(true);
            setCartQuantity(cartQuantity + amount);
            dispatch(
              updateProductCart({
                email: user.email,
                productId: product.product_id,
                amount: productInCart.amount + amount,
              })
            ).then(() => {
              dispatch(getProductCart(user.email));
              notify();
            });
            console.log("El producto se pudo actualizar para comprar!");
            setIsAddingToCart(false);
          } else {
            notifyIII();
            setIsAddingToCart(false);
          }
        } else {
          setIsAddingToCart(true);
          let cartItem = {
            email: user.email,
            product_id: product.product_id,
            amount: amount,
          };

          dispatch(postProductCart(cartItem))
            .then(() => {
              dispatch(getProductCart(user.email)).then(() => {
                setIsAddingToCart(false);
                notify();
              });
            })
            .catch(() => {
              setIsAddingToCart(false);
            });

          setIsAddingToCart(false);
        }
      }
    } catch (error) {
      setIsAddingToCart(false);
      console.log({ error: error.message });

    }
  };

  // Hasta cuánto se puede incrementar
  const amountIncrement = () =>
    product.stock > amount
      ? setAmount(amount + 1)
      : alert(
          `You have reached the maximum amount of ${product.name} available`
        );

  // Hasta cuánto se puedo decrecentar
  const amountDecrement = () => (amount > 1 ? setAmount(amount - 1) : null);

  const handleImageLoad = () => {
    setLoadingImages(false);
  };
 

  // Se realiza el checkout
  const handleCheckout = async () => {
    if (isAuthenticated) {
      if (product.stock >= amount) {
        try {
          const { data } = await axios.post(
            "http://localhost:3001/payment/create-order",
            { product, amount }
          );
          console.log("Data en el componente Detail", data);
          console.log("Init point en el componente Detail", data);
          location.href = data.result;
        } catch (error) {
          console.log(error.message);
        }
      } else {
        notifyVI();
      }
    } else {
      loginWithRedirect();
    }
  };

  const number = (max) => {
    return Math.floor(Math.random() * max);
  }
  console.log(number(5))
  console.log(product.categories)
  if (loadingImages || !activeImg){
    return <p> ta cargando</p>
  } else if (product.name) {  
      
    return (
      <div>
        <Link className="ml-16 mt-20" to="/shop">
          <button>
            <VscArrowCircleLeft color="gray" size="5rem" />
          </button>
        </Link>
        <div className="mx-10 sm:mx-[100px]">
          <div className="grid grid-cols-1   sm:grid-cols-1 md:grid-cols-2  gap-12 text-[#a9a9a9]">
            {activeImg && (
              <div className={`swiper-container-detail  ${
                loadingImages ? 'fade-out' : 'fade-in'
              }`}>
               <img
            className={`mx-auto bg-gray-100 bg-opacity-20 w-auto h-[414px] ${
              loadingImages ? 'fade-out' : 'fade-in'
            }`}
            src={activeImg}
            alt="Product"
            onLoad={handleImageLoad}
          />
                <Slider 
                  id={id}
                  images={product.images}
                  setActiveImg={setActiveImg}
                ></Slider>
              </div>
            )}

            <div className="  bg-[#f6f6f6] justify-between w-full px-20">
              <h2 className="mt-10 pt-5 text-6xl font-bold text-[#444444]">
                {product?.name}
              </h2>
              <hr className="my-10"></hr>
              <p className="py-t text-5xl text-[#444444]">${product.price}</p>
              <div className="w-full">
                <p className="py-20  break-words ">{product.description}</p>
              </div>
              
              {/* <h2 className="text-5xl text-[#343434]">Variante</h2>

              <select className="w-40">
                <option>uno</option>
                <option>dos</option>
              </select> */}
<div className="flex">
    <p className="text-3xl font-semibold align-bottom text-green-500">Categories:</p>
    {product?.categories.map((c, i)=>
     ( <div className="px-2 text-[16px]" key={i}>
        <p>{c.name}</p></div>)
    )}
</div>
              <div className="my-10 grid grid-cols-1 md:grid-cols-2  md:my-10 gap-y-10    ">
                <div>
                  <button
                    onClick={amountDecrement}
                    className="bg-gray-200 py-4 px-8 md:py-6 md:px-10 rounded-lg text-green-800 text-4xl hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className=" text-3xl font-extrabold py-4 px-8 md:py-6 md:px-10">
                    {amount}
                  </span>
                  <button
                    onClick={amountIncrement}
                    className="bg-gray-200 py-4 px-8 rounded-lg text-green-800 text-4xl hover:bg-gray-300 md:py-6 md:px-10"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="py-2 md:text-gray-500 hover:bg-[#66c54e] font-medium bg-[#78df5e] col-span-1 rounded col-end-3 relative"
                >
                  {isAddingToCart ? (
                    <img
                      src={loading}
                      alt="Loading"
                      className="w-6 h-6 animate-spin absolute left-2 top-1/2 transform -translate-y-1/2"
                    />
                  ) : (
                    "ADD TO CART"
                  )}
                </button>
              </div>
              <div className="flex  md: justify-between gap-x-10 ">

                {!corazon ? ( <button
                  onClick={handleAddToMyGarden}
                  className="p-2 my-10 pl-24 md:py-8   md:w-2/5 rounded-2xl border border-gray-400bg-[#cec6c6]"
                >
                 ❤️ Add to my Garden
                </button>) :
                 <button
                 onClick={()=>handleRemoveToMyGarden(id)}
                 className="p-2 my-10 pl-24 md:py-8   md:w-2/5 rounded-2xl border border-gray-400bg-[#cec6c6]"
               >
                 💔 Remove to my Garden
               </button>
                
                }

                <button
                  onClick={handleCheckout}
                  className="p-4 my-10 md:p-8 md:w-2/5 rounded-2xl border border-gray-400bg-[#cec6c6] "
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-32 bg-[#f6f6f6] gap-y-6 mb-28 sm:mx-auto sm:w-[100%] text-[#a9a9a9]">
            <div className=" text-center py-6 text-4xl text-[#444444]">
              Descripción
            </div>
            <hr></hr>
            <div className=" ">
              Fusce maximus tellus id molestie vulputate. In sit amet varius
              sem. Nam convallis, massa in lacinia molestie, quam odio porttitor
              nulla, sed gravida diam lectus id lorem. Donec pellentesque risus
              in metus ornare imperdiet. Sed ligula mauris, imperdiet a ipsum
              vel, egestas semper turpis. Aliquam dapibus urna tristique leo
              vulputate elementum. Donec arcu tellus, sollicitudin sed neque
              pretium, iaculis venenatis lorem.
            </div>

            <div className="">
              Nullam ultricies lacus in feugiat viverra. Nunc gravida sagittis
              elit, sed sodales lacus posuere in. Aliquam mi turpis, imperdiet
              ac sollicitudin at, ultrices ac est. Praesent consectetur, neque
              sed dictum pharetra, purus ante fringilla metus, in egestas dui
              lacus quis justo. Maecenas lacus augue, vulputate quis ullamcorper
              et, porta et velit. Sed aliquet neque elit. Nunc non sagittis
              nisl. Sed tempus mollis diam eget laoreet. In ut pulvinar tellus,
              nec tincidunt nulla. Morbi a hendrerit sapien. Nulla nec turpis
              sed eros lobortis ornare. Morbi sodales interdum ipsum.
            </div>
          </div>
          <h3 className=" font-semibold  text-gray-700 my-20 mt-20 text-center text-5xl ">
            Related products
          </h3>
          <div className=" grid sm:grid-cols-2 md:flex md:flex-row gap-20 justify-center mx-auto my-10">
            {allProducts
              .map((p) => {
                if (
                  p.categories.name === product.categories.name &&
                  p.name !== product.name
                )
                  return (
                    <Card
                      key={p.id}
                      id={p.product_id}
                      name={p.name}
                      images={p.images}
                      price={p.price}
                    />
                  );
              })
              .slice(number(5), number(5) + 4)}
          </div>
        </div>
      </div>
    );
  } else {
    <img src={loading} alt="Loading product detail" />;
  }
}
  
;

export default Detail;
