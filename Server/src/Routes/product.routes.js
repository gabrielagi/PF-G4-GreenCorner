const { Router } = require("express");
const {
  getAllProductHandler,
  getProductByIdHandler,
  postProductHandler,
  deleteProductHandler,
  updateProductHandler,
  getRelatedProductsHandler,
} = require("../Handler/product.handler");

const productRouter = Router();

productRouter.get("/", getAllProductHandler);

productRouter.get("/:id", getProductByIdHandler);

productRouter.post("/", postProductHandler);

productRouter.delete("/:id", deleteProductHandler);

productRouter.put("/:id", updateProductHandler);

productRouter.get('/products/:id/related', getRelatedProductsHandler);


module.exports = productRouter;
