const { Router } = require("express");
const {
  getAllProductHandler,
  getProductByIdHandler,
  postProductHandler,
  deleteHandler,
  updateProductHandler,
  getRelatedProductsHandler,
  getAllTrendingHandler,
} = require("../Handler/product.handler");

const productRouter = Router();

///PRODUCTOS

productRouter.get("/", getAllProductHandler);

productRouter.get("/:id", getProductByIdHandler);

productRouter.post("/", postProductHandler);

productRouter.delete("/:id", deleteHandler);

productRouter.put("/:id", updateProductHandler);

///RELACIONADOS

productRouter.get('/:id/related', getRelatedProductsHandler);


///TRENDING

productRouter.get('/trending', getAllTrendingHandler);


module.exports = productRouter;
