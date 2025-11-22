import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ContactsContext from "../context/ContactsContext";
import "../App.css";

export default function Catalog() {
  const { contacts } = useContext(ContactsContext);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filtered = contacts.filter((c) => {
    const q = query.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q);
    const matchesCategory = category ? c.category === category : true;
    return matchesSearch && matchesCategory;
  });

  // derive categories for filter options
  const categories = Array.from(new Set(contacts.map((c) => c.category)));

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Contact Catalog</h2>

      <div className="catalog-controls">
        <input
          type="text"
          placeholder="Search name, phone, email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="catalog-search"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="catalog-filter"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="catalog-grid">
        {filtered.map((contact) => (
          <Link
            to={`/catalog/${contact.id}`}
            key={contact.id}
            className="contact-link"
          >
            <div className="contact-card">
              <img
                src={contact.image}
                alt={contact.name}
                className="contact-image"
              />
              <h3 className="contact-name">{contact.name}</h3>
              <p className="contact-phone">{contact.phone}</p>
              <p className="contact-email">{contact.email}</p>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && <p>No contacts found.</p>}
      </div>
    </div>
  );
}
