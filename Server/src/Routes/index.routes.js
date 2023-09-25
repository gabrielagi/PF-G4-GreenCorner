const { Router } = require("express");
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");

const router = Router();

router.use("/user", userRouter);
router.use("/product", productRouter);

module.exports = router;
