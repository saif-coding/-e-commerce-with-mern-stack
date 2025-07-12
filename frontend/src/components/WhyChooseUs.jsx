import React from "react";
import { FaTruck, FaShieldAlt, FaUndoAlt, FaLock } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Free Shipping",
    description: "Enjoy free delivery on all orders with no minimum spend.",
    icon: <FaTruck size={28} />,
  },
  {
    id: 2,
    title: "Secure Checkout",
    description: "Your payment is safe with industry-leading encryption.",
    icon: <FaLock size={28} />,
  },
  {
    id: 3,
    title: "Easy Returns",
    description: "Not satisfied? Return items easily within 7 days.",
    icon: <FaUndoAlt size={28} />,
  },
  {
    id: 4,
    title: "Trusted Quality",
    description: "We stand behind every product we sell — 100% guaranteed.",
    icon: <FaShieldAlt size={28} />,
  },
];

function WhyChooseUs () {
  return (
    <section className="w-full bg-gray-50 py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
          Why Shop With Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ id, title, description, icon }) => (
            <div
              key={id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 text-center transition"
            >
              <div className="text-black mb-4 flex justify-center">{icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
