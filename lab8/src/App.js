import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Item from "./pages/Item";
import ContactsProvider from "./context/ContactsProvider";

function App() {
  return (
    <ContactsProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Item />} />
        </Routes>
        <Footer />
      </Router>
    </ContactsProvider>
  );
}

export default App;
