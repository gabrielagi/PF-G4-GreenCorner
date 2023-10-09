import ProductTrending from "./ProductTrending";

const ProductsTrending = ({ productTrending }) => {

  const productTrendingRandomIndex = Math.floor(Math.random() * productTrending.length);

  const getRandomProducts = (array, startIndex, count) => {
    return array.slice(startIndex, startIndex + count);
  };

  const randomProducts = getRandomProducts(productTrending, productTrendingRandomIndex, 3);


  return (
    <div className="flex-col justify-start ">
        <br />
     {randomProducts ? (
        randomProducts.map((p, i) => {
        
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

