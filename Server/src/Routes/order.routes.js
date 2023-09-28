const {
    getAllOrderHandler,
    getOrderByIdHandler,
    // getOrderByDateHandler,
    getOrderByStatusHandler,
    addOrderHandler
} = require("../Handler/order.handler")
const { Router } = require("express");

const orderRouter = Router();

orderRouter.get("/", getAllOrderHandler);

orderRouter.post("/", addOrderHandler);

orderRouter.get("/:id", getOrderByIdHandler);

// orderRouter.get("/find/:date", getOrderByDateHandler);

orderRouter.get("/status/:status", getOrderByStatusHandler);

module.exports = orderRouter;