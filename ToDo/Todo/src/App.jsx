import React from "react";
import Todo from "./components/Todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Todo />
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default App;
