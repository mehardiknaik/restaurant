import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./Pages/Home";
import { StateProvider } from "./context/StateProvider";
import reducer, { initialState } from "./context/reducer";
import Admin from "./Pages/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
      <ToastContainer hideProgressBar theme="colored" />
    </StateProvider>
  );
};

export default App;
