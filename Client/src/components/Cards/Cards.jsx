import Card from "./Card/Card";
import plantgif from "../../assets/plantgif.gif";
import Loading from "../Loading/Loading";

const Cards = ({ allProducts }) => {
  return (
    <div className=" grid grid-cols-2 gap-x-6 md:relative md:ml-20 md:grid-cols-3   md:gap-[70px]">
     {allProducts.length !== 0 ? (
        allProducts.map((p, i) => {
         return (
          <div className="md:h-max md:w-max">
            <Card key={i} name={p.name} images={p.images} price={p.price} id={p.product_id} />
            </div>
          );
        })
      ) : (
        <Loading/>
      )}
    </div>
  );
};

export default Cards;

