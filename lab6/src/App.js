import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ContactCard from "./components/ContactCard";
import "./App.css";

const Catalog = () => {
  const contacts = [
    { name: "John Smith", experience: 5, phone: "+380 67 123 45 67" },
    { name: "Anna Brown", experience: 3, phone: "+380 50 987 65 43" },
    { name: "Michael Lee", experience: 8, phone: "+380 63 555 11 22" },
  ];

  return (
    <div className="catalog">
      {contacts.map((c, i) => (
        <ContactCard
          key={i}
          name={c.name}
          experience={c.experience}
          phone={c.phone}
        />
      ))}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
      <Footer />
    </Router>
  );
}
