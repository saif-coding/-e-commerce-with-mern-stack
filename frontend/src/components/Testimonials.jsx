import React from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "Absolutely love the quality! Everything fits perfectly and arrived super fast. Will definitely shop again.",
  },
  {
    id: 2,
    name: "David Chen",
    rating: 4,
    text: "The collection is modern and comfortable. Customer service was helpful and responsive too.",
  },
  {
    id: 3,
    name: "Emily Roberts",
    rating: 5,
    text: "One of the best shopping experiences I’ve had online. Stylish, simple, and reliable.",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full py-16 px-4 md:px-10 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
          What Our Customers Are Saying
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(({ id, name, rating, text }) => (
            <div
              key={id}
              className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition"
            >
              {/* Star Rating */}
              <div className="flex items-center justify-center mb-4 text-yellow-500">
                {Array.from({ length: rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 italic mb-4">"{text}"</p>

              {/* Name */}
              <h4 className="text-gray-900 font-semibold">{name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
