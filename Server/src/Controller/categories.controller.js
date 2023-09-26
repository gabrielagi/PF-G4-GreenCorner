const { Category } = require("../models/Category");

//Obtiene todas las categorias
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll(); 
    
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


//Obtiene una categoria por id 
const getCategoryById = async (req, res) => {
    const categoryId = req.params.id; // Obtén el ID de los parámetros de la solicitud
  
    try {
      const category = await Category.findByPk(categoryId);
  
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
const getCategoryByName = async (req, res) => {
    const categoryName = req.params.name; // Obtén el nombre de los parámetros de la solicitud
  
    try {
      const category = await Category.findOne({
        where: { name: categoryName },
      });
  
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

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName
}
