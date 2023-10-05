import Card from "./Card/Card";
import plantgif from "../../assets/plantgif.gif";

const Cards = ({ allProducts }) => {
  return (
    <div className="relative flex-wrap ml-4 flex gap-[100px]">
     {allProducts.length !== 0 ? (
        allProducts.map((p, i) => {
          
         return (
              <Card key={i} name={p.name} images={p.images} price={p.price} id={p.product_id} />
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

