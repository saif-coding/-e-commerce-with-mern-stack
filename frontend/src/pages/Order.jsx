import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function Order() {
  const { allOrders } = useContext(ProductContext);
  return (
    <div className=" flex flex-wrap items-center justify-center py-8 scroll-y-auto bg-black/80 ">
      {allOrders.length > 0 ? (
        allOrders.map((order, index) => (
          <div
            key={index}
            className="p-8 border mb-4 mt-2 bg-white h-fit w-[800px] rounded shadow"
          >
            <h2 className="font-bold text-lg">Order #{index + 1}</h2>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Total Price:</strong> ${order.totalAmount}
            </p>

            <h3 className="mt-2 font-semibold">Products:</h3>
            <ul className="list-disc list-inside">
              {order.products.map((product, i) => (
                <li key={i}>
                  {product.title} - Qty: {product.quantity} - Price: $
                  {product.price}
                </li>
              ))}
            </ul>
            <p>
              <strong>Address:</strong>
              <div className=" bg-gray-200 p-6">
                <h1>
                  <span className=" font-bold">Name:</span>{" "}
                  {order.address.fullName}
                </h1>
                <h1>
                  <span className=" font-bold">Phone:</span>{" "}
                  {order.address.phone}
                </h1>
                <h1>
                  <span className=" font-bold">Email:</span>{" "}
                  {order.address.email}
                </h1>
                <h1>
                  <span className=" font-bold">Street:</span>{" "}
                  {order.address.street}
                </h1>
                <h1>
                  <span className=" font-bold">City:</span> {order.address.city}
                </h1>
                <h1>
                  <span className=" font-bold">State:</span>{" "}
                  {order.address.state}
                </h1>
                <h1>
                  <span className=" font-bold">Zip:</span> {order.address.zip}
                </h1>
                <h1>
                  <span className=" font-bold">Country:</span>{" "}
                  {order.address.country}
                </h1>
              </div>
            </p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default Order;
