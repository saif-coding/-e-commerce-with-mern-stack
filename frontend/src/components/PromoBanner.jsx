import React from "react";

function PromoBanner() {
  return (
    <section className="relative w-full py-24 px-6 sm:px-10 md:px-20 bg-black">
      {/* Background Image Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/promo-bg.jpg"
          alt="Promo"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Limited Time Only: 30% Off Your First Order
        </h2>
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Don’t miss this exclusive offer! Refresh your wardrobe with handpicked
          items designed to inspire.
        </p>
        <a
          href="/shop"
          className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Shop the Sale
        </a>
      </div>
    </section>
  );
}

export default PromoBanner;
