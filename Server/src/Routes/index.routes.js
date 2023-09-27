const { Router } = require("express");
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const categoriesRouter = require("./category.routes")
const orderRouter = require("./order.routes")
const router = Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoriesRouter );
router.use("/order", orderRouter );

module.exports = router;
