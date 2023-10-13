const { Order, OrderDetail, Product } = require("../db");

const getAllOrders = async () => {
    try {
        const order = await Order.findAll();
        return order;
    } catch (error) {
        throw new Error("Error al obtener ordenes desde la base de datos: " + error.message);
    }
};

const getAllOrdersDetails = async () => {
    try {
        const orderDetail = await OrderDetail.findAll({
            include: [{
                model: Product,
                required: true
            }
          ]
        });
        return orderDetail;
    } catch (error) {
        throw new Error("Error al obtener ordenes details desde la base de datos: " + error.message);
    }
};

const getOrderById = async (id) => {

    try {
        const order = await Order.findByPk(id);

        // Verificar si se encontró la categoría
        if (!order) {
            return ("categoría no encontrada")
        }

        // Enviar la categoría como respuesta
        return order;
    } catch (error) {
        console.error(error);
        return (error)
    }
};



// const getOrderByDate = async (date) => {
//     const orderDate = date // Obtén el nombre de los parámetros de la solicitud
//     try {
//         const order = await Order.findOne({
//             where: { date: orderDate },
//         });

//         if (!order) {
//             return ("orden no encontrada");
//         }

//         return order;
//     } catch (error) {
//         console.error(error);
//         return (error)
//     }
// };

const getOrderByStatus = async (status) => {
    const orderStatus = status

    try {
        const order = await Order.findAll({
            where: { status: orderStatus },
        });

        if (!order) {
            return ("orden no encontrada");
        }

        return order;
    } catch (error) {
        console.error(error);
        return (error)
    }
};
const postOrder = async (date, status, shippingAddress, addressHouseNumber, total, email) => {
    try {
        const newOrder = await Order.create({
            date,
            status,
            shippingAddress,
            addressHouseNumber,
            total,
            email
        });

        return newOrder;

        
    } catch (error) {
        throw new Error("Error al agregar orden a la base de datos: " + error.message);
    }
};

const postOrderDetail = async (quantity, unit_price, order_id, product_id) => {
    try {
        const newOrderDetail = await OrderDetail.create({
            quantity,
            unit_price,
            order_id,
            product_id
        });

        return newOrderDetail;

        
    } catch (error) {
        throw new Error("Error al agregar ordenDetail a la base de datos: " + error.message);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    getAllOrdersDetails,
    // getOrderByDate,
    getOrderByStatus,
    postOrderDetail,
    postOrder
}