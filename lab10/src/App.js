import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Item from "./pages/Item";
import Favorites from "./pages/Favorites"; 
import Checkout from "./pages/Checkout"; 
import Success from "./pages/Success";

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Item />} />
          <Route path="/favorites" element={<Favorites />} /> 
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/success" element={<Success />} />
        </Routes>
        <Footer />
      </Router>
  );
 }
export default App;