import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function Order() {
  const { allOrders } = useContext(ProductContext);
  return (
    <div className=" flex justify-center h-screen">
      {allOrders.length > 0 ? (
        allOrders.map((order, index) => (
          <div key={index} className="p-8 border mb-4 mt-6 rounded h-fit shadow">
            <h2 className="font-bold text-lg">Order #{index + 1}</h2>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Total Price:</strong> ${order.totalAmount}
            </p>
            <p>
              <strong>Address:</strong> {order.address.fullName},{" "}
              {order.address.city}, {order.address.phone}
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
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default Order;
