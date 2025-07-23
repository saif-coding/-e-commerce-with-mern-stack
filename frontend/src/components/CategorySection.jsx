import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
const categories = [
  {
    id: 1,
    label: "Women",
    img: "/images/category-women.jpg", // Place images in /public/images/
  },
  {
    id: 2,
    label: "Men",
    img: "/images/category-men.jpg",
  },
  {
    id: 3,
    label: "Accessories",
    img: "/images/category-accessories.jpg",
  },
  {
    id: 4,
    label: "Sale",
    img: "/images/category-sale.jpg",
  },
];

function CategorySection() {
  const { allProductsData } = useContext(ProductContext);
  return (
    <section className="w-full bg-white py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-10">
          Shop&nbsp;by&nbsp;Category
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {allProductsData.map((item, i) => (
            <Link to={`/category/${item.category.toLowerCase()}`}
              key={i}
              className="group relative rounded-xl overflow-hidden shadow-lg"
            >
              {/* Image */}
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover transform group-hover:scale-105 transition duration-300 ease-out"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-60 transition duration-300" />

              {/* Label */}
              <span className="absolute bottom-4 left-4 text-lg sm:text-xl font-semibold text-white tracking-wide">
                {item.category} 
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
