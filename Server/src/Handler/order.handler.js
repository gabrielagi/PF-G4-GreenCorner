const {
    getAllOrders,
    getOrderById,
    // getOrderByDate,
    getOrderByStatus,
    postOrder
} = require("../Controller/order.controller")

const getAllOrderHandler = async (req, res) => {
    try {
        const orders = await getAllOrders();

        if (orders.length === 0) {
            return res.status(404).json({ message: "No se encontraron ordenes." });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error al obtener ordenes:", error);
        res.status(500).json({ error: "Error en el servidor al obtener ordenes" });
    }
};


const addOrderHandler = async (req, res) => {
    const { date, status, shippingAddress, addressHouseNumber, total } = req.body;
    if (!date || !status || !shippingAddress || !addressHouseNumber || !total) {
        return res.status(400).json({ error: "Todos los campos son obligarorios" });
    }
    try {
        const newOrder = await postOrder(date, status, shippingAddress, addressHouseNumber, total);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error al agregar orden:", error);
        res.status(500).json({ error: "Error en el servidor al agregar orden" });
    }
};





const getOrderByIdHandler = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await getOrderById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada." });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

// const getOrderByDateHandler = async (req, res) => {
//     const orderDate = req.params.date; 
// console.log(orderDate);
//     try {
//         const order = await getOrderByDate(orderDate);

//         if (!order) {
//             return res.status(404).json({ message: "Orden no encontrada." });
//         }

//         return res.status(200).json(order);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error en el servidor" });
//     }
// };
const getOrderByStatusHandler = async (req, res) => {
    const orderStatus = req.params.status; 

    try {
        const order = await getOrderByStatus(orderStatus);

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada." });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

module.exports = {
    getAllOrderHandler,
    getOrderByIdHandler,
    // getOrderByDateHandler,
    getOrderByStatusHandler,
    addOrderHandler
};