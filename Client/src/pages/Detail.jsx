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
import { postFavorites } from "../Redux/actions/user/user-actions";
import { postProductCart } from "../Redux/actions/product/action";
import { useAuth0 } from "@auth0/auth0-react";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  /*   const link = import.meta.env.VITE_ENDPOINT; */
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const allProducts = useSelector((state) => state.allProducts);
  const product = useSelector((state) => state.productDetail);

  const [activeImg, setActiveImg] = useState();
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    dispatch(getProductById(id));
    console.log("entré y la cagué" + id);
  }, [dispatch, id]);

  const notify = () =>
    toast.success("Added to your cart 🛒", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyII = () => {
    toast.error("Added to favorite ", {
      icon: "❤️",
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

  const handleAddToMyGarden = () => {
    if (isAuthenticated) {
      let favorite = {
        email: user.email,
        product_id: product.product_id,
      };
      dispatch(postFavorites(favorite));

      notifyII();
    } else {
      loginWithRedirect();
    }
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      let cart = {
        email: user.email,
        product_id: product.product_id,
        amount: amount,
      };
      dispatch(postProductCart(cart));
      console.log(cart);
      notify();
    } else {
      loginWithRedirect();
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

  console.log(product);
  console.log(allProducts);

  // Se realiza el checkout
  const handleCheckout = async () => {
    if (isAuthenticated) {
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
      loginWithRedirect();
    }
  };

  if (product.name) {
    return (
      <div>
        <Link className="ml-16 mt-20" to="/shop">
          <button>
            <VscArrowCircleLeft color="gray" size="5rem" />
          </button>
        </Link>
        <div className="mx-10 sm:mx-60">
          <div className="grid grid-cols-1 justify-center  sm:grid-cols-1 md:grid-cols-2  gap-12 text-[#a9a9a9]">
            {product.name ? (
              <div className="swiper-container-detail">
                <img
                  className="mx-auto bg-gray-100 bg-opacity-20"
                  src={product.images[0]}
                ></img>
                <Slider
                  id={id}
                  images={product.images}
                  setActiveImg={setActiveImg}
                ></Slider>
              </div>
            ) : (
              <p> no hay nati</p>
            )}

            <div className=" px-10 bg-[#f6f6f6] justify-between">
              <h2 className="mt-10 pt-5 text-6xl font-bold text-[#444444]">
                {product?.name}
              </h2>
              <hr className="my-10"></hr>
              <p className="py-t text-5xl text-[#444444]">${product.price}</p>
              <p className="py-20">{product.description}</p>
              {/* <h2 className="text-5xl text-[#343434]">Variante</h2>

              <select className="w-40">
                <option>uno</option>
                <option>dos</option>
              </select> */}

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
                  className="py-2 md: text-gray-500  hover:bg-[#66c54e] font-medium bg-[#78df5e] col-span-1 rounded   col-end-3"
                >
                  ADD TO CART
                </button>
              </div>
              <div className="flex  md: justify-between gap-x-10 ">
                <button
                  onClick={handleAddToMyGarden}
                  className="p-2 my-10 pl-24 md:py-8   md:w-2/5 rounded-2xl border border-gray-400bg-[#cec6c6]"
                >
                  Add to my Garden
                </button>
                <button
                  onClick={handleCheckout}
                  className="p-4 my-10 md:p-8 md:w-2/5 rounded-2xl border border-gray-400bg-[#cec6c6] "
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-32 bg-[#f6f6f6] gap-y-6 mb-28 sm:ml-28 text-[#a9a9a9]">
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
          <h3 className="my-20 mt-20 text-center text-5xl ">
            Related products
          </h3>
          <div className="flex flex-row gap-20 justify-center mx-auto my-10">
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
              .slice(0, 4)}
          </div>
        </div>
      </div>
    );
  } else {
    <img src={loading} alt="Loading product detail" />;
  }
};

export default Detail;
