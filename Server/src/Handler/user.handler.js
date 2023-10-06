const { emit } = require("process");
const { WelcomeEmail } = require("../../nodemailer/mailer")
const { getAllUsers,
    getUSerbyId,
    getByRol,
    getUserbyName,
    postUser,
    deleteUser
} = require("../Controller/user.controller")


const newUserHandler = async (req, res) => {
    const {
        name, 
        lastName,
        email,
        password,
        role,
        image,
        rating
    } = req.body

    console.log(rating);
    if ( !name ) {
        return res.status(500).send("name missing")
    } if (!lastName){
        return res.status(500).send("lastname missing")
    }if (!email){
        return res.status(500).send("email missing")
    }if (!password){
        return res.status(500).send("pass missing")
    }if (!role){
        return res.status(500).send("role missing")
    }if (!image){
        return res.status(500).send("image missing")
    }if (!rating){
        return res.status(500).send("rating missing")
    }
    try {
        const newUser = await postUser(
            name,
            lastName,
            email,
            password,
            role,
            image,
            rating)
        const userEmail = newUser.email;
        const userName = newUser.name;
        await WelcomeEmail(userEmail, userName)
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Something went wrong")
    }

}


const byIdHander = async(req, res) => {
    const id = req.params.id

    try {
        const user = await getUSerbyId(id)
        if(!user){
            return res.status(404).send("Not found")
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}


const byNameHander = async( req, res) => {
    const name  = req.params.name
    try {
        const user = await getUserbyName(name)
        if(!user){
            return res.status(404).send("Not found")
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}

const allUsers = async(req, res ) => {
    try{
        const users = await getAllUsers()
        if(!users){ñ
            return res.status(404).send("Not users yet")
        }
        return res.status(200).json(users)
    } catch {
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}

const byRolHandler = async (req , res ) => {
    const userRol = req.params.rol;
    try {
        const user = await getByRol(userRol)
        return  res.status(200).json(user)

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
    byIdHander,
    byNameHander,
    allUsers,
    byRolHandler,
    deleteHandler
}