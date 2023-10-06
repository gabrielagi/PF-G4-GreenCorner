const { Router } = require("express");
const {
  allUsers,
  byIdHander,
  byNameHander,
  getFavoritesHandler,
  postFavoritesHandler,
  byRolHandler,
  newUserHandler,
  deleteHandler
} = require("../Handler/user.handler");

const userRouter = Router();

userRouter.get( "/", allUsers);

userRouter.get( "/:id", byIdHander  )

  userRouter.get("/getfavorites", getFavoritesHandler);

userRouter.get("/find/:name", byNameHander)

userRouter.get( "/rol/:rol", byRolHandler)

//anda
userRouter.post("/favorites", postFavoritesHandler);

userRouter.post("/", newUserHandler)

userRouter.delete("/:id", deleteHandler)

module.exports = userRouter;
