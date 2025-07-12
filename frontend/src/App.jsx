import React from "react";
import Routing from "./routes/Routing";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routing />
      <Footer/>
    </>
  );
}

export default App;
