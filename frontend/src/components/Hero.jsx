import React from "react";
import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLink,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import HeroImage from "../assets/images/malee.png";

function Hero() {
  return (
    <>
      <section className="w-full bg-gray-200 py-16 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-10">
          {/* Left Text Section */}
          <div className="flex-1 text-center lg:text-left mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Style that empowers. Confidence in every piece.
            </h1>
            <p className="mt-6 text-gray-600 text-base md:text-lg max-w-md mx-auto lg:mx-0">
              Discover our handpicked collections that blend contemporary trends
              with classic craftsmanship. Whether you’re dressing for work,
              weekends, or unforgettable moments,
            </p>
            <button className="mt-8 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-900 transition">
              SHOP NOW
            </button>
          </div>

          {/* Right Image Section */}
          <div className="flex-1 flex justify-center overflow-hidden">
            <img
              src={HeroImage}
              alt="Fashion model"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl -mt-4 h-[400px] rounded-xl  object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
