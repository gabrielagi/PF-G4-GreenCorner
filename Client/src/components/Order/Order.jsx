import React from "react";
import OrderTable from "./Order.table";

const Order = () => {
  return (
    <div>
      <h1>Orders</h1>
      <div>
        <OrderTable orders={data} />
      </div>
    </div>
  );
};

export default Order;
