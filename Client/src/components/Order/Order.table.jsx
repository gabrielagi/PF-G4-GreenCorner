import React from "react";
import {
  Card,
  CardBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Badge,
  IconButton,
} from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";

function OrderTable() {
  //{ orders }

  //Una idea de estructura de Order
  //   const order = {
  //     id: string,
  //     amount: string,
  //     createdAt: Date,
  //     status: string,
  //   };

  const orders = [
    {
      id: 4,
      amount: "4",
      createdAt: "2023-12-10",
      status: "Approved",
    },
    {
      id: 34,
      amount: "1",
      createdAt: "2023-12-07",
      status: "Pending",
    },
  ];

  if (!orders || !orders.length) {
    return <p>No hay ordenes a'un</p>;
  }

  return (
    <Card className="md:col-span-12">
      <CardBody>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell head={true}>Date</TableCell>
              <TableCell head={true}>ID</TableCell>
              <TableCell head={true}>Status</TableCell>
              <TableCell head={true}>Amount</TableCell>
              <TableCell head={true}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {format(new Date(order.createdAt), "yyyy-MM-dd")}
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <Badge>{order.status}</Badge>
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <IconButton>
                    <HiDotsVertical />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
export default OrderTable;
