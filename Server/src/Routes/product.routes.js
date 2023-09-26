const { Router } = require("express");
const {
  getAllProductHandler,
  getProductByIdHandler,
  postProductHandler,
  deleteProductHandler,
  updateProductHandler,
} = require("../Handler/product.handler");

const productRouter = Router();

productRouter.get("/", getAllProductHandler);

productRouter.get("/:id", getProductByIdHandler);

productRouter.post("/", postProductHandler);

productRouter.delete("/:id", deleteProductHandler);

productRouter.put("/:id", updateProductHandler);

// Rutas adicionales (por si les pinta)
/* productRouter.get("/category/:categoryId", filterProductByCategoryHandler); // Filtrado por categoría
productRouter.get("/related/:productId", getRelatedProductsHandler); // Productos relacionados
productRouter.get("/featured", getFeaturedProductsHandler); // Productos destacados */

module.exports = productRouter;
