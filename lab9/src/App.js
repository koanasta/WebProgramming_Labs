// App.js (Після виправлення)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Item from "./pages/Item";
// Видаляємо: import { ContactsProvider } from "./context/ContactsContext";

function App() {
  return (
    // Видаляємо: <ContactsProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Item />} />
        </Routes>
        <Footer />
      </Router>
    // Видаляємо: </ContactsProvider>
  );
 }
export default App;