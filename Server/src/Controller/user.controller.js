const { Favorite,Product } = require("../db");




const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      include: [{
        model: Product,
        required: true
    }
  ]
    });
    return favorites;
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const postFavorite = async (product) => {
    try {
      const { product_id, email} = product;
  
      const newFavorite = await Favorite.create({
        product_id,
        email
      });
  
     return newFavorite;
    } catch (error) {
      console.error("Error en postFavorite:", error.message);
      throw new Error("Error en el servidor");
    }
  };


module.exports = {
    postFavorite,
    getAllFavorites
};
