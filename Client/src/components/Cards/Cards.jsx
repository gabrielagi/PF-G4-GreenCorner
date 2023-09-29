import Card from "./Card/Card";
import plantgif from "../../assets/plantgif.gif";

const Cards = ({ allProducts }) => {
  console.log(allProducts)
  return (
    <div className="flex flex-wrap ml-4">
      {allProducts ? (
        allProducts.map((p, i) => {
          console.log(p)
         return (
              <Card key={i} name={p.name} image={p.image} price={p.price} id={p.product_id} />
          );
        })
      ) : (
        <div className="flex justify-center items-center">
          <img src={plantgif} alt="loading" />
        </div>
      )}
    </div>
  );
};

export default Cards;

