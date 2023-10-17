import Card from "./Card/Card";
import plantgif from "../../assets/plantgif.gif";

const Cards = ({ allProducts }) => {
  return (
    <div className=" grid grid-cols-2 gap-x-6 md:relative md:ml-20   md:flex md:gap-[70px]">
     {allProducts.length !== 0 ? (
        allProducts.map((p, i) => {
          
         return (
          <div className="md:h-max md:w-max">
            <Card key={i} name={p.name} images={p.images} price={p.price} id={p.product_id} />
            </div>

              
          );
        })
      ) : (
        <div className="flex justify-center items-center ml-[70px]">
          <img src={plantgif} alt="loading" />
        </div>
      )}
    </div>
  );
};

export default Cards;

