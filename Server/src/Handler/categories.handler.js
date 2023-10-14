const {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  postCategory,
  updateCategory,
  deleteCategoryById,
} = require("../Controller/categories.controller");
const { Category } = require("../db");

// Obtiene todas las categorias
const getAllCategoriesHandler = async (req, res) => {
  try {
    const categories = await getAllCategories();

    if (categories.length === 0) {
      return res.status(404).json({ message: "No se encontraron categorías." });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res
      .status(500)
      .json({ error: "Error en el servidor al obtener categorías" });
  }
};

// Agregar una nueva categoría
const addCategoriesHandler = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ error: "El nombre de la categoría es obligatorio." });
  }
  try {
    const newCategory = await postCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error al agregar categoría:", error);
    res
      .status(500)
      .json({ error: "Error en el servidor al agregar categoría" });
  }
};

// Update category
const updateCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategoryData = req.body;
    console.log(
      "Los datos de la categoria que voy a actualizar en handler",
      updatedCategoryData
    );
    const success = await updateCategory(id, updatedCategoryData);

    if (success) {
      res
        .status(200)
        .json({ message: "Categoria actualizada exitosamente", id: id });
    } else {
      res
        .status(404)
        .json({ error: `No se encontró una Categoria con el ID ${id}` });
    }
  } catch (error) {
    console.error("Error en updatedCategoryData:", error.message);
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

const deleteCategoryByIdHandler = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await deleteCategoryById(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Categoría no encontrada." });
    }

    return res
      .status(200)
      .json({ message: "Categoría eliminada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  getCategoryByNameHandler,
  addCategoriesHandler,
  updateCategoryHandler,
  deleteCategoryByIdHandler,
};
