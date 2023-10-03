const { Product } = require("../db");
const { Category } = require("../db");

//Obtiene todos los productos con sus categorías asociadas (home)
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: "categories",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return products;
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};


//Obtiene un producto por id con sus categorías asociadas (product detail)
const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      include: {
        model: Category,
        as: "categories",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    return product;
  } catch (error) {
    throw new Error("Error al obtener el producto por ID");
  }
};


//Crea un producto y lo guarda en la base de datos con sus categorías asociadas (admin dashboard) (falta imagen por defecto)
const postProduct = async (productData) => {
  try {
    const { name, description, price, images, stock, available, categories } = productData;

    if(!categories){
      throw new Error("Las categorias son obligatorias");
    }

    if (!name || !price || !stock) {
      throw new Error("Faltan completar campos obligatorios");
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      images,
      stock,
      available,
    });

    if (categories && categories.length > 0) {
      await newProduct.addCategory(categories);
    }

   return newProduct;
  } catch (error) {
    console.error("Error en postProduct:", error.message);
    throw new Error("Error en el servidor");
  }
};


//Actualiza un producto por id (admin dashboard)
const updateProduct = async (id, updatedData) => {
  try {
    const existingProduct = await Product.findByPk(id);
    if (!existingProduct) {
      return false; 
    }
    await existingProduct.update(updatedData);
    return true; 
  } catch (error) {
    throw error;
  }
};


//Lista de 5 productos relacionados (product detail)
const findRelatedProducts = async (productId) => {
  try {
    const targetProduct = await Product.findByPk(productId, {include: 'categories',});
    if (!targetProduct) {
      throw new Error('Producto no encontrado');
    }
    const targetCategories = targetProduct.categories.map((category) => category.id);

    const filteredRelatedProducts = [];
    const relatedProducts = await Product.findAll({
      where: {
        id: {[sequelize.Op.ne]: targetProduct.id, },
      },
      include: [
        {model: Category,as: 'categories',attributes: ['id'],},
      ],
    });

    for (const product of relatedProducts) {
      const productCategories = product.categories.map((category) => category.id);
      if (productCategories.some((categoryId) => targetCategories.includes(categoryId))) {
        filteredRelatedProducts.push(product);
        if (filteredRelatedProducts.length >= 5) {
          return filteredRelatedProducts;
        }
      }
    }
  } catch (error) {
    throw new Error('Error en findRelatedProducts: ' + error.message);
  }
};


//Busca todos los productos con el atributo isTrending con valor true (home)
const getAllTrending = async () => {
  try {
    const trendingProducts = await Product.findAll({
      where: { isTrending: true },
    });
    return trendingProducts;
  } catch (error) {
    throw new Error('Error al buscar todos los productos Trending');
  }
};

const deleteProduct = async (id) => {
  try {
      const deleter = await Product.destroy({ 
        where: {
          product_id: id
        }  
      })
      if (deleter === 1) {
        return true
      } else {
        return false
      }
  } catch (error) {
      return ("Error al eliminar el product", error)
  }
}




module.exports = {
  getAllProduct,
  getProductById,
  postProduct,
  updateProduct,
  findRelatedProducts,
  getAllTrending,
  deleteProduct
};
