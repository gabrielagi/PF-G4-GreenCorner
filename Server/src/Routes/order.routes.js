const {
    getAllOrderHandler,
    getOrderByIdHandler,
    // getOrderByDateHandler,
    getOrderByStatusHandler,
    addOrderDetailHandler,
    getAllOrderDetailHandler,
    addOrderHandler
} = require("../Handler/order.handler")
const { Router } = require("express");

const orderRouter = Router();

orderRouter.get("/", getAllOrderHandler);

orderRouter.get("/Detail", getAllOrderDetailHandler);

orderRouter.post("/", addOrderHandler);

orderRouter.post("/Detail", addOrderDetailHandler);

orderRouter.get("/:id", getOrderByIdHandler);

// orderRouter.get("/find/:date", getOrderByDateHandler);

orderRouter.get("/status/:status", getOrderByStatusHandler);

module.exports = orderRouter;