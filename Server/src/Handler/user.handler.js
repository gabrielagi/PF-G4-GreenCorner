const {
 postFavorite,
 getAllFavorites
} = require("../Controller/user.controller")



const getFavoritesHandler = async (req, res) => {
  try {

    const allFavorites= await getAllFavorites();
    res.status(200).json(allFavorites);

  } catch (error) {
    console.error("Error en getFavoritesHandler:", error.message);
  }
};

const postFavoritesHandler = async (req, res) => {
    try {
      const productData = req.body;
      const productFavorite = await postFavorite(productData);
  
      if (productFavorite) {
        res.status(201).json({ success: true, message: "This product has been add in favorite", data: productFavorite });
      } else {
        res.status(400).json({ success: false, message: "Cannot add in favorite" });
      }
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

module.exports = {
    postFavoritesHandler,
    getFavoritesHandler
};