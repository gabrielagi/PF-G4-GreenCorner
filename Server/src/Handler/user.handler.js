const { emit } = require("process");
const { WelcomeEmail } = require("../../nodemailer/mailer")
const { getAllUsers,
    getUserById,
    postFavorite,
    getAllFavorites,
    getByRol,
    getUserbyName,
    createUser,
    deleteUser,
    updateUser
} = require("../Controller/user.controller")



const getFavoritesHandler = async (req, res) => {
    try {

        const allFavorites = await getAllFavorites();
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


//CREA NUEVO USUARIO
const newUserHandler = async (req, res) => {
    const { nickname, email, picture } = req.body;

    if (!nickname || !email || !picture) {
        return res.status(400).json({ message: "Nickname, email, and picture are required fields." });
    }

    try {
        const newUser = await createUser(nickname, email, picture);
        console.log("Nuevo usuario creado:", newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


//ACTUALIZA USUARIO
const updateUserHandler = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    try {
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await updateUser(userId, userData);

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


const byIdHander = async (req, res) => {
    const id = req.params.id

    try {
        const user = await getUserById(id)
        if (!user) {
            return res.status(404).send("Not found")
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}


const byNameHander = async (req, res) => {
    const name = req.params.name
    try {
        const user = await getUserbyName(name)
        if (!user) {
            return res.status(404).send("Not found")
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}

const allUsers = async (req, res) => {
    try {
        const users = await getAllUsers()
        if (!users) {
            return res.status(404).send("Not users yet")
        }
        return res.status(200).json(users)
    } catch {
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}

const byRolHandler = async (req, res) => {
    const userRol = req.params.rol;
    try {
        const user = await getByRol(userRol)
        return res.status(200).json(user)

    } catch (error) {
        console.log(error);
        res.status(500).send("Something's wrong, I can feel it")
    }
}

const deleteHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const deleter = await deleteUser(id)
        return res.status(200).json(deleter)
    } catch (error) {
        console.log(error);
        return res.status(500).send("Oops")
    }
}
module.exports = {
    newUserHandler,
    postFavoritesHandler,
    getFavoritesHandler,
    byIdHander,
    byNameHander,
    allUsers,
    byRolHandler,
    deleteHandler,
    updateUserHandler
}
