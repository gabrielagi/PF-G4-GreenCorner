const { Router } = require("express");
const {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  getCategoryByNameHandler,
  addCategoriesHandler,
} = require("../Handler/categories.handler");

const categoryRouter = Router();

// Obtener todas las categorías
categoryRouter.get("/", getAllCategoriesHandler);

// Agregar una nueva categoría
categoryRouter.post("/", addCategoriesHandler);

// Obtener una categoría por su ID
categoryRouter.get("/:id", getCategoryByIdHandler);

// Buscar una categoría por su nombre
categoryRouter.get("/find/:name", getCategoryByNameHandler);

module.exports = categoryRouter;
