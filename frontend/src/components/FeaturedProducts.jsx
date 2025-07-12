import React from "react";

const featuredProducts = [
  {
    id: 1,
    name: "Oversized Blazer",
    price: "$89.99",
    image: "/images/product-1.jpg",
  },
  {
    id: 2,
    name: "Minimalist Sneakers",
    price: "$129.99",
    image: "/images/product-2.jpg",
  },
  {
    id: 3,
    name: "Leather Tote Bag",
    price: "$159.99",
    image: "/images/product-3.jpg",
  },
  {
    id: 4,
    name: "Classic Sunglasses",
    price: "$49.99",
    image: "/images/product-4.jpg",
  },
];

function FeaturedProducts() {
  return (
    <section className="w-full py-16 px-4 md:px-10 lg:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-10">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map(({ id, name, price, image }) => (
            <div
              key={id}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-gray-600 mt-1">{price}</p>
                <button className="mt-4 w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
