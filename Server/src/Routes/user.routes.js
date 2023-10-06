const { Router } = require("express");
const {
  allUsers,
  byIdHander,
  byNameHander,
  byRolHandler,
  newUserHandler,
  deleteHandler
} = require("../Handler/user.handler");

const userRouter = Router();

userRouter.get( "/", allUsers);

userRouter.get( "/:id", byIdHander  )

userRouter.get("/find/:name", byNameHander)

userRouter.get( "/rol/:rol", byRolHandler)

userRouter.post("/", newUserHandler)

userRouter.delete("/:id", deleteHandler)

module.exports = userRouter;