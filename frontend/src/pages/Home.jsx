import React from "react";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import CategorySection from './../components/CategorySection';
import FeaturedProducts from './../components/FeaturedProducts';
import PromoBanner from './../components/PromoBanner';
import Testimonials from './../components/Testimonials';
import WhyChooseUs from "../components/WhyChooseUs";

function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <CategorySection/>
      <FeaturedProducts/>
      <PromoBanner/>
      <Testimonials/>
      <WhyChooseUs/>
    </>
  );
}

export default Home;
