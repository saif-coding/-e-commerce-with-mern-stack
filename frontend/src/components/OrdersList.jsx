import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
function OrdersList() {
  const { allOrders, getAllOrders } = useContext(ProductContext);
console.log(allOrders, "ordli")
  useEffect(() => {
    getAllOrders();
  }, []);
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const orders = [
    {
      id: 1,
      items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }],
      address: {
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        country: "USA",
      },
      amount: 320.0,
      paymentType: "Credit Card",
      orderDate: "10/10/2022",
      isPaid: true,
    },
    {
      id: 1,
      items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }],
      address: {
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        country: "USA",
      },
      amount: 320.0,
      paymentType: "Credit Card",
      orderDate: "10/10/2022",
      isPaid: true,
    },
    {
      id: 1,
      items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }],
      address: {
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        country: "USA",
      },
      amount: 320.0,
      paymentType: "Credit Card",
      orderDate: "10/10/2022",
      isPaid: true,
    },
  ];
  return (
    <div className="md:p-10 p-4 space-y-4 bg-white">
      <div className=" flex items-center justify-between">
        <h2 className="text-lg font-medium">Orders List</h2>
        <h2 className=" font-medium pr-20">
          Total Orders (<span>{allOrders.length}</span>)
        </h2>
      </div>
      {allOrders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
        >
          <div className="flex gap-5">
            <img
              className="w-12 h-12 object-cover opacity-60"
              src={boxIcon}
              alt="boxIcon"
            />
            <div>
              {order.products.map((item, index) => (
                <div key={index} className="flex flex-col justify-center">
                  <p className="font-medium">
                    {item.title.slice(0, 10)}...
                    <span
                      className={`text-indigo-500 ${
                        item.quantity < 0 && "hidden"
                      }`}
                    >
                      x {item.quantity}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm">
            <p className="font-medium mb-1">{order?.address?.fullName}</p>
            <p>
              {order?.address?.street}, {order?.address?.city},{" "}
              {order?.address?.state},{order?.address?.zipcode},{" "}
              {order?.address?.country}
            </p>
          </div>

          <p className="font-medium text-base my-auto text-black/70">
            ${order?.totalAmount}
          </p>

          <div className="flex flex-col text-sm">
            <p>Method: {order?.paymentMethod}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default OrdersList;
