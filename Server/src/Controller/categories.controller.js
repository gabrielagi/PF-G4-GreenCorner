const { Category } = require("../db");

//Obtiene todas las categorias
const getAllCategories = async() => {
  const cat = await Category.findAll()
  return cat;
}


//Obtiene una categoria por id 
const getCategoryById = async (id) => {

    try {
      const category = await Category.findByPk(id);
  
      // Verificar si se encontró la categoría
      if (!category) {
        return ("categoría no encontrada")
      }
  
      // Enviar la categoría como respuesta
      return category;
    } catch (error) {
      console.error(error);
      return (error)
    }
  };

// Obtener una categoría por su nombre
const getCategoryByName = async (name) => {
    const categoryName = name // Obtén el nombre de los parámetros de la solicitud
  
    try {
      const category = await Category.findOne({
        where: { name: categoryName },
      });
  
      // Verificar si se encontró la categoría
      if (!category) {
        return ("categoría no encontrada");
      }
  
      // Enviar la categoría como respuesta
      return category;
    } catch (error) {
      console.error(error);
      return(error)
    }
  };

  const postCategory = async(name) => {
    const newCategory = await Category.create({name});
    return newCategory;
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    postCategory
}

