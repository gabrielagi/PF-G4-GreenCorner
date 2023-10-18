const { Order, OrderDetail, Product } = require("../db");

const getAllOrders = async (email) => {
  try {
    if (email) {
      const order = await Order.findAll({
        where: {
          email: email,
        },
      });
      return order;
    } else {
      const order = await Order.findAll();
      return order;
    }
  } catch (error) {
    throw new Error(
      "Error al obtener ordenes desde la base de datos: " + error.message
    );
  }
};

const getLastOrder = async (email) => {
  try {
    const order = await Order.findOne({
      where: {
        email: email,
      },
      order: [['id', 'ASC']], // Ordena por la columna createdAt en orden descendente
      limit: 1, // Limita el resultado a un solo registro
    });
    console.log(order);
    return order;
  } catch (error) {
    throw new Error(
      "Error al obtener la última orden desde la base de datos: " + error.message
    );
  }
};


const getAllOrdersDetails = async (idOrder) => {
  try {
    const orderDetail = await OrderDetail.findAll({
      where: {
        order_id: idOrder,
      },
      include: [
        {
          model: Product,
          required: true,
        },
      ],
    });
    return orderDetail;
  } catch (error) {
    throw new Error(
      "Error al obtener ordenes details desde la base de datos: " +
        error.message
    );
  }
};

const getOrderById = async (id) => {
  try {
    const order = await Order.findByPk(id);

    // Verificar si se encontró la categoría
    if (!order) {
      return "categoría no encontrada";
    }

    // Enviar la categoría como respuesta
    return order;
  } catch (error) {
    console.error(error);
    return error;
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
  const orderStatus = status;

  try {
    const order = await Order.findAll({
      where: { status: orderStatus },
    });

    if (!order) {
      return "orden no encontrada";
    }

    return order;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const postOrder = async (newOrderData) => {
  try {
    console.log("Al post de create order me llega el objeto: ", newOrderData);
    const newOrder = await Order.create({
      date: newOrderData.date,
      status: newOrderData.status,
      shippingAddress: newOrderData.shippingAddress,
      addressHouseNumber: newOrderData.addressHouseNumber,
      total: newOrderData.total,
      email: newOrderData.email,
    });

    return newOrder;
  } catch (error) {
    throw new Error(
      "Error al agregar orden a la base de datos: " + error.message
    );
  }
};

const postOrderDetail = async (newOrderDetail) => {
  try {
    console.log(
      "Al post de create orderDetail me llega el objeto: ",
      newOrderDetail
    );

    const newDetail = await OrderDetail.create({
      quantity: newOrderDetail.quantity,
      unit_price: newOrderDetail.unit_price,
      order_id: newOrderDetail.order_id,
      product_id: newOrderDetail.product_id,
    });

    return newDetail;
  } catch (error) {
    throw new Error(
      "Error al agregar ordenDetail a la base de datos: " + error.message
    );
  }
};

const updateOrders = async (id, updatedOrderData) => {
  try {
    const existingOrder = await Order.findByPk(id);
    if (!existingOrder) {
      return false;
    }
    await existingOrder.update(updatedOrderData);

    return true;
  } catch (error) {
    throw error;
  }
};

const deleteOrder = async (id) => {
  try {
    const deleter = await Order.destroy({
      where: {
        id: id
      },
    });


    if (deleter) {
      return "This product has been deleted from Orders";
    } else {
      return "This Favorite doesn't exist";
    }
    
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllOrders,
  getLastOrder,
  getOrderById,
  getAllOrdersDetails,
  deleteOrder,
  // getOrderByDate,
  getOrderByStatus,
  postOrderDetail,
  postOrder,
  updateOrders
};
