const { Order } = require("../db");

const getAllOrders = async () => {
    try {
        const order = await Order.findAll();
        return order;
    } catch (error) {
        throw new Error("Error al obtener ordenes desde la base de datos: " + error.message);
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
const postOrder = async (date, status, shippingAddress, addressHouseNumber, total) => {
    try {
        const newOrder = await Order.create({
            date,
            status,
            shippingAddress,
            addressHouseNumber,
            total
        });

        return newOrder;

        
    } catch (error) {
        throw new Error("Error al agregar orden a la base de datos: " + error.message);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    // getOrderByDate,
    getOrderByStatus,
    postOrder
}