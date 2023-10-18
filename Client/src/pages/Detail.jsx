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
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { BsCartPlus } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { BsFillHeartbreakFill } from "react-icons/bs";
import mercadopago from "../assets/mercadopago.png";
import Swal from 'sweetalert2';
import {
  postFavorites,
  deleteFavorite,
  getOneFavorites,
} from "../Redux/actions/user/user-actions";
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
  const [gardenClicked, setGardenClicked] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const allProducts = useSelector((state) => state.allProducts);
  const product = useSelector((state) => state.productDetail);
  const cart = useSelector((state) => state.productCart);
  const [activeImg, setActiveImg] = useState(
    product.images && product.images[0]
  );

  const loginAlert = () => {
    Swal.fire({
      title: 'Error',
      text: 'You need to login first!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Go to login',
      confirmButtonColor: 'green',
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'red', 
    }).then((result) => {
      if (result.isConfirmed) {
        loginWithRedirect();
      }
    });
  };

  const [amount, setAmount] = useState(1);
  const [loadingImages, setLoadingImages] = useState(true);
  const handleImageClick = (newActiveImg) => {
    setLoadingImages(true);
    setTimeout(() => {
      setActiveImg(newActiveImg);
      setLoadingImages(false);
    }, 500); // Ajusta el tiempo de espera según tus necesidades
  };

  const handleImageLoad = () => {
    setLoadingImages(false);
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
      dispatch(getOneFavorites(user.email, id)).then((result) => {
        setCorazon(result);
      });
    }
  }, [user, dispatch]);

  const notify = (message) => {
    if (message === "This product has been add in the cart") {
      toast.success(message + " 🛒", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn("The product is already in the cart, but it was added 🛒", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const notifyII = (message, icons) => {
    toast.error(message, {
      icon: icons,
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
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
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

  const notifyVI = () =>
    toast.error("There is not enough stock available to checkout 🛑", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleAddToMyGarden = () => {
    if(!gardenClicked){
      setGardenClicked(true)
       if (isAuthenticated) {
      let favorite = {
        email: user.email,
        product_id: product.product_id,
      };

      if (!corazon) {
        dispatch(postFavorites(favorite)).then((result) => {
          notifyII(result, heart);
        });
      } else {
        dispatch(deleteFavorite(id, user.email)).then((result) => {
          notifyII(result, heartBroke);
        });
      }

      setCorazon(!corazon);
    } else {
      loginAlert();
    }
    setTimeout(()=>
    {setGardenClicked(false)},3000
    )
    }
   
  };
  const handleRemoveToMyGarden = (id) => {
    dispatch(deleteFavorite(id, user.email)).then((result) => {
      notifyII(result, heartBroke);
    });

    setCorazon(!corazon);
  };

  const handleAddToCart = () => {
    if(!cartClicked){
      setCartClicked(true)  
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
              notify("This product has already in the cart, it should be accumulated");
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
            .then((result) => {
              dispatch(getProductCart(user.email)).then(() => {
                setIsAddingToCart(false);

                notify(result);
              });
            })
            .catch(() => {
              setIsAddingToCart(false);
            });

          setIsAddingToCart(false);
        }setTimeout(()=>
        {setCartClicked(false)},1500,
        )
      }else{
        loginAlert();

      } 
   
    } catch (error) {
      setIsAddingToCart(false);
      console.log({ error: error.message });
    } 
   
    }

  
  };

  // Hasta cuánto se puede incrementar
  const amountIncrement = () =>
    product.stock > amount
      ? setAmount(amount + 1)
      : Swal.fire({
        icon: 'error',
        title: 'Sorry',
        text: 'There are not enough products on stock',

      })

  // Hasta cuánto se puedo decrecentar
  const amountDecrement = () => (amount > 1 ? setAmount(amount - 1) : null);



  // Se realiza el checkout
  const handleCheckout = async () => {
    if(!checkoutClicked){
      setCheckoutClicked(true)
      if (isAuthenticated) {
      if (product.stock >= amount) {
        try {
          const { data } = await axios.post(
            "https://greencorner.onrender.com/payment/create-order",
            { product, amount, email: user.email }
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
      loginAlert();
    }
    setTimeout(()=>
    {setGardenClicked(false)},3000
    )
    }
   
  };

  const number = (max) => {
    return Math.floor(Math.random() * max);
  };
  console.log(product)
  let categories = [];
if (product && product.categories) {
  categories = product.categories.map((c) => c.name);
}

// Convert the categories array to a string, separated by commas
const categoriesString = categories.join(', ');





let shortDescription = "";
let longDescription = "";

// Verifica si la descripción existe antes de dividirla
if (product?.description) {
  const sentences = product.description.split('.'); // Puedes cambiar el delimitador según tus necesidades

  // Considera solo la primera oración como descripción corta
  shortDescription = sentences.length > 0 ? sentences[0] : "";

  // Considera el resto de las oraciones como descripción larga
  longDescription = sentences.slice(1).join('. ');
}

  console.log(number(5));
  console.log(product.categories);

  if (loadingImages || !activeImg) {
    return <p> ta cargando</p>;
  } else if (product.name) {
    return (
      <div>
        <Link className="ml-16 mt-20" to="/shop">
          <button>
            <VscArrowCircleLeft color="gray" size="5rem" />
          </button>
        </Link>
        <div className="mx-10 sm:mx-[100px] ">
          <div className="grid grid-cols-1   sm:grid-cols-1 md:grid-cols-2  gap-12 text-[#a9a9a9]">
          {activeImg && (
        <div
          className={`swiper-container-detail  ${
            loadingImages ? "fade-out" : "fade-in"
          }`}
        >
            <img
            className={`mx-auto bg-gray-100 bg-opacity-20 w-auto h-[414px] rounded-[40px] transition-opacity duration-500 ${
              loadingImages ? "opacity-0" : "opacity-100"
            }`}
            src={activeImg}
            alt="Product"
          />
          <Slider
            className="rounded-[100px]"
            id={id}
            images={product.images}
            setActiveImg={setActiveImg}
          ></Slider>
        </div>
      )}

            <div className="  bg-[#f6f6f6] rounded-[70px] justify-between w-full px-20">
              <h2 className="mt-10 pt-5 text-6xl font-bold text-[#444444]">
                {product?.name}
              </h2>
              <hr className="my-10"></hr>
              <p className="py-t  text-5xl text-[#41b441]">${product.price}</p>
              <div className="w-full">
                <p className="py-20  break-words ">{shortDescription}</p>
              </div>

              

              {/* <h2 className="text-5xl text-[#343434]">Variante</h2>

              <select className="w-40">
                <option>uno</option>
                <option>dos</option>
              </select> */}
              <div className="flex">
                <p className="text-[17px] pr-5 font-semibold align-bottom text-green-500">
                  Categories:
                </p>
             <p>{categoriesString}</p>
              </div>
              <div className="my-10 grid grid-cols-1 md:grid-cols-2  md:my-10 gap-y-10  mx-auto  ">
                <div className="mx-auto md:mx-0 border-2">
                  <button
                    onClick={amountDecrement}
                    className="bg-gray-200 py-4 px-8 md:py-6 md:px-10 rounded-xl text-green-800 text-4xl hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className=" border-gray-200 border text-3xl font-extrabold py-4 px-8 md:py-6 md:px-10">
                    {amount}
                  </span>
                  <button
                    onClick={amountIncrement}
                    className="bg-gray-200 py-4 px-8 rounded-xl text-green-800 text-4xl hover:bg-gray-300 md:py-6 md:px-10"
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="contained"
                  color="success"
                  
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || cartClicked}
                  startIcon={
                    isAddingToCart ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                  style={{ fontSize: "16px", fontFamily: "Poppins" }}
                >
                  ADD TO CART <BsCartPlus style={{ marginLeft: "20px" }} />
                </Button>
              </div>
              <div className="pt-20 flex flex-col items-center gap-y-4 lg:flex-row md:items-center md:justify-between md:gap-x-10">


              <div className="md:hidden h-4" />

                {/* Botón Add to My Garden */}
                <Button
                  variant="contained"
                  onClick={handleAddToMyGarden}
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    width: "fit-content",
                    backgroundColor:"#fff",
                    width: "fit-content",
                    height: "50px",
                    color: "#FF08B98C"  ,
                    border: `1px solid  "#FF08B98C"`,
                    opacity: gardenClicked ? "0.5" : "1",
                    cursor: gardenClicked ? "not-allowed" : "pointer",
                  }}
                >
                  {corazon ? (
                    <>
                      Remove from My Garden 
                      <BsFillHeartbreakFill color="#FF08B98C" style={{ fontSize: "20px", marginLeft:"5px"}} />
                    </>
                  ) : (
                    <>
                      Add to My Garden
                      <AiFillHeart color="#FF08B98C" style={{ fontSize: "20px", marginLeft:"5px" }} />
                    </>
                  )}
                </Button>

                <Button
                  variant="contained"
                  onClick={handleCheckout}
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "17px",
                    backgroundColor: "#fff",
                    color: "#027bb3",
                    border: "1px solid #027bb3",
                    width: "300px",
                    height: "50px",
                    opacity: checkoutClicked ? "0.5" : "1",
                    cursor: checkoutClicked ? "not-allowed" : "pointer",
                  }}
                >
                  <img
                    src={mercadopago}
                    style={{ width: "40px", marginRight: "10px", color: "#027bb3" }}
                  />
                  Checkout
                </Button>
                </div>



            </div>
          </div>

          <div className="grid grid-cols-1 mt-32 bg-[#f6f6f6] gap-y-6 mb-28 sm:mx-auto sm:w-[100%] text-[#a9a9a9] rounded-3xl py-10 md:text-3xl">
            <div className=" text-center py-6 text-4xl font-semibold text-[#444444]">
              Descripción
            </div>
            <hr></hr>
            <div className=" text-center font-medium"><p>
                 {product.description}
        
            </p>
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
              .slice(number(4), number(4) + 4)}
          </div>
        </div>
      </div>
    );
  } else {
    <img src={loading} alt="Loading product detail" />;
  }
};

export default Detail;
