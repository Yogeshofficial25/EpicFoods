

import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";  // Correct import for Register component
import { AuthProvider } from "./components/Auth/AuthContext";

const AppContent = () => {
  return (
    <>
      <Navbar />
      {/* ToastContainer must be outside Routes */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Register route */}
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
