const { Router } = require("express");
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
<<<<<<< HEAD
const categoriesRouter = require("./category.routes")
const orderRouter = require("./order.routes")

=======
const categoriesRouter = require("./category.routes");
const orderRouter = require("./order.routes");
const paymentRouter = require("./payment.routes");
>>>>>>> 054c2875c800be4306fcc30eb9fd58200186173f
const router = Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
<<<<<<< HEAD
router.use("/category", categoriesRouter );
router.use("/order", orderRouter );
=======
router.use("/category", categoriesRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);

>>>>>>> 054c2875c800be4306fcc30eb9fd58200186173f
module.exports = router;
