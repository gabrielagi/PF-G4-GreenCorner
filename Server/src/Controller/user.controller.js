const { User, Favorite, Product } = require("../db")

const postUser = async (name, lastName, email, password, role, image, rating) => {
    try {
        const newUser = await User.create({
            name,
            email,
            image,
        })
        console.log(newUser.dataValues);
        return newUser
    } catch (error) {
        console.log(error.message);
    }
}
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


const getUSerbyId = async (id) => {
    try {
        const user = await User.findByPk(id)
        console.log(id);
        if (!user) {
            return ("user not found")
        }
        return user
    } catch (error) {
        console.log(error.message);
    }
}

const getUserbyName = async (name) => {
    const userName = name
    try {
        const user = await User.findOne({
            where: { name: userName }
        })
        return user
    } catch (error) {
        console.log(error.message);
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.findAll()
        if (!users) {
            return ("There is no users yet")
        }
        return users;
    } catch (error) {
        console.log(error.message);
    }
}

const getByRol = async (rol) => {
    const userRol = rol
    try {
        const user = await User.findAll({
            where: { role: userRol }
        })
        if (!user) {
            return (`No ${rol} yet`)
        }
        return user

    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async (id) => {
    const idUser = id
    try {
        const deleter = User.destroy({
            where: {
                id: idUser
            }
        })
        if (deleter) {
            return idUser
        } else {
            return ("This user doesn't exist")
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getAllUsers,
    getByRol,
    getUSerbyId,
    getUserbyName,
    getAllFavorites,
    postFavorite,
    postUser,
    deleteUser
}