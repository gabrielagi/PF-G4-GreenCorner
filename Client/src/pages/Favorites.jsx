import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../Redux/actions/user/user-actions";
import Card from "../components/Cards/Card/Card";
import { useAuth0 } from "@auth0/auth0-react";
import { filterByName, filterByPrice } from "../Redux/actions/product/action";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.allFavorites);
  const { user } = useAuth0();

  useEffect(() => {
    dispatch(getFavorites(user.email));
  }, [dispatch]);
  console.log(favorites);

  const [nameOrder, setNameOrder] = useState("");
  const [priceOrder, setPriceOrder] = useState("");

  function handleOrder(e) {
    const selectedValue = e ? e.target.value : e;

    if (selectedValue === "asc" || selectedValue === "desc") {
      setNameOrder(selectedValue);
      setPriceOrder("");
      dispatch(filterByName(selectedValue));
    } else if (selectedValue === "high" || selectedValue === "low") {
      setNameOrder("");
      setPriceOrder(selectedValue);
      dispatch(filterByPrice(selectedValue));
    } //else {
    //   setNameOrder("");
    //   setPriceOrder("");
    //   dispatch(resetAllC());

    // }
  }

  return (
    <div className="font-poppins mx-5">
      <h1 className="text-center  font-poppins font-extrabold py-10 my-10 text-4xl sm:text-5xl bg-yellow-200">
        Mis productos favoritos
      </h1>
      <div className="grid md:grid-cols-2 gap-x-20 md:gap-x-10  my-10 ">
        <div className="py-10  my-10 place-self-center align-top  w-full col-span- bg-green-500 bg-opacity-25 grid md:h-full max-h-max md:w-[400px] md:ml-20  ">
          <div className="bg-green-800 bg-opacity-25  px-10 text-center h-[100px] mb-10 items-center align-middle justify-center object-center">
            <input
              placeholder="busca lo que quieras "
              className=" w-full self-center center my-10  h-20 md:h-20 bg-white "
            ></input>
          </div>
          <div className=" md:-mt-[200px] md:content-start md:items-start md:row-start-2 md:row-span-4">
            <div className="bg-green-800 bg-opacity-50 p-20 text-center mx-10 grid gap-2 md:gap-10 grid-cols-2 md:grid-cols-1 md:align-top md:justify-start">
              <h1 className="mx-auto  col-span-2  md:col-span-1 text-3xl font-medium">
                Ordenar por
              </h1>
              <button className=" p-4 ">Precio</button>
              <button className=" p-4">Alfabetico</button>
            </div>
          </div>
        </div>

        <div className="grid justify-start sm:grid-cols-3 gap-10 mr-8   grid-cols-2 my-10 md:gap-20">
          {favorites.map((p) => (
            <Card
              key={p.id}
              id={p.Product.product_id}
              name={p.Product.name}
              images={p.Product.images}
              price={p.Product.price}
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] "
            >
              {" "}
              {p.value}
            </Card>
          ))}
        </div>
      </div>

      {/* //className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px]  */}
    </div>
  );
};

export default Favorites;
