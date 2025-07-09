import React from "react";
import Routing from "./routes/Routing";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routing />
    </>
  );
}

export default App;
