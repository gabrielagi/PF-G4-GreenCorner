const {
    getAllOrders,
    getOrderById,
    // getOrderByDate,
    getOrderByStatus,
    postOrderDetail,
    getAllOrdersDetails,
    postOrder
} = require("../Controller/order.controller")

const getAllOrderHandler = async (req, res) => {
    try {
        const email = req.query.email 
        const orders = await getAllOrders(email);

        if (orders.length === 0) {
            return res.status(404).json({ message: "No se encontraron ordenes." });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error al obtener ordenes:", error);
        res.status(500).json({ error: "Error en el servidor al obtener ordenes" });
    }
};

const getAllOrderDetailHandler = async (req, res) => {
    try {
        const id = req.query.id 
        const ordersDetails = await getAllOrdersDetails(id);

        if (ordersDetails.length === 0) {
            return res.status(404).json({ message: "No se encontraron ordenes details." });
        }

        res.status(200).json(ordersDetails);
    } catch (error) {
        console.error("Error al obtener ordenes details:", error);
        res.status(500).json({ error: "Error en el servidor al obtener ordenes details" });
    }
};


const addOrderHandler = async (req, res) => {
    const { date, status, shippingAddress, addressHouseNumber, total, email } = req.body;
    if (!date || !status || !shippingAddress || !addressHouseNumber || !total || !email) {
        return res.status(400).json({ error: "Todos los campos son obligarorios" });
    }
    try {
        const newOrder = await postOrder(date, status, shippingAddress, addressHouseNumber, total , email);
        res.status(200).json(newOrder);
    } catch (error) {
        console.error("Error al agregar orden:", error);
        res.status(500).json({ error: "Error en el servidor al agregar orden" });
    }
};

const addOrderDetailHandler = async (req, res) => {
    const { quantity, unit_price, order_id, product_id } = req.body;
    if (!quantity || !unit_price || !order_id || !product_id) {
        return res.status(400).json({ error: "Todos los campos son obligarorios" });
    }
    try {
        const newOrderDetail = await postOrderDetail(quantity, unit_price, order_id, product_id);
        res.status(200).json(newOrderDetail);
    } catch (error) {
        console.error("Error al agregar orden detail:", error);
        res.status(500).json({ error: "Error en el servidor al agregar orden detail" });
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
    getAllOrderDetailHandler,
    // getOrderByDateHandler,
    getOrderByStatusHandler,
    addOrderDetailHandler,
    addOrderHandler
};