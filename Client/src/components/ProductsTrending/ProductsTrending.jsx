import ProductTrending from "./ProductTrending";

const ProductsTrending = ({ productTrending }) => {
    
  return (
    <div className="sm:relative sm:ml-[90px] relative ml-[90px] ">
        <br />
     {productTrending ? (
        productTrending.map((p, i) => {
         return (
              <ProductTrending key={i} name={p.name} images={p.images} price={p.price} id={p.product_id} />
          );
        })
      ) : (
        <div className="flex justify-center items-center ml-[70px]">
          <h1>Product Not found</h1>
        </div>
      )}
    </div>
  );
};

export default ProductsTrending;

