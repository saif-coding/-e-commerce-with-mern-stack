import React from "react";
import Routing from "./routes/Routing";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      {!isDashboardRoute && <Navbar />}
      <Routing />
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default App;
