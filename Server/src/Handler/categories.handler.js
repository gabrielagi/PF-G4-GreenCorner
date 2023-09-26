const {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    postCategory
  } = require("../Controller/categories.controller");
const { Category } = require("../db");

// Obtiene todas las categorias
const getAllCategoriesHandler = async (req, res) => {
  try {
    const categories = await getAllCategories();

    // Verificar si se encontraron categorías
    if (categories.length === 0) {
      return res.status(404).json({ message: "No se encontraron categorías." });
    }

    // Enviar las categorías como respuesta
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Obtiene una categoria por id
const getCategoryByIdHandler = async (req, res) => {
  const categoryId = req.params.id; // Obtén el ID de los parámetros de la solicitud

  try {
    const category = await getCategoryById(categoryId);

    // Verificar si se encontró la categoría
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada." });
    }

    // Enviar la categoría como respuesta
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Obtener una categoría por su nombre
const getCategoryByNameHandler = async (req, res) => {
  const categoryName = req.params.name; // Obtén el nombre de los parámetros de la solicitud

  try {
    const category = await getCategoryByName(categoryName);

    // Verificar si se encontró la categoría
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada." });
    }

    // Enviar la categoría como respuesta
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
const addCategoriesHandler = async (req, res) => {
  const {name} = req.body
  
  try {
      const newCategory = await postCategory(name);
      res.status(201).json(newCategory)

  } catch (error) {

      res.status(500).json({ error: error.message })

  }

};
module.exports = {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  getCategoryByNameHandler,
  addCategoriesHandler
};
