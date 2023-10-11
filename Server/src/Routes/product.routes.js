const { Router } = require("express");
const {
  getAllProductHandler,
  getProductByIdHandler,
  getProductCartHandler,
  postProductHandler,
  postProductCartHandler,
  deleteHandler,
  deleteProductCartHandler,
  updateProductHandler,
  getRelatedProductsHandler,
  getAllTrendingHandler,
} = require("../Handler/product.handler");

const productRouter = Router();

///PRODUCTOS

productRouter.get("/", getAllProductHandler);

//Anda
productRouter.get("/cart", getProductCartHandler);

productRouter.get("/:id", getProductByIdHandler);

productRouter.post("/", postProductHandler);

//Anda
productRouter.post("/cart", postProductCartHandler);

productRouter.delete("/:id", deleteHandler);

productRouter.delete("/cart/:email/:id", deleteProductCartHandler);

productRouter.put("/:id", updateProductHandler);

///RELACIONADOS

productRouter.get('/:id/related', getRelatedProductsHandler);


///TRENDING

productRouter.get('/trending', getAllTrendingHandler);


module.exports = productRouter;
