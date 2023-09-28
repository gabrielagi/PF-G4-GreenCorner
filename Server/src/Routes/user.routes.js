const { Router } = require("express");
const {
  // getAllusersHandler,
  // getuserByIdHandler,
  // postuserHandler,
  // deleteuserHandler,
} = require("../Handler/product.handler");

const userRouter = Router();

// userRouter.get("/", getAllusersHandler);

// userRouter.get("/:id", getuserByIdHandler);

//userRouter.post("/", postuserHandler);

//userRouter.delete("/:id", deleteuserHandler);

module.exports = userRouter;
