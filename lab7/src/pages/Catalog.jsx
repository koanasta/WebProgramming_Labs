import React from "react";
import ContactCard from "../components/ContactCard";
import Button from "../components/Button";
import f1 from "../images/femaleone.jpg";
import m1 from "../images/maleone.jpg";
import m2 from "../images/maletwo.jpg";

const contacts = [
  {
    id: 1,
    name: "Jane Doe",
    phone: "+1 (555) 123-4567",
    email: "john@example.com",
    image: f1
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+1 (555) 987-6543",
    email: "jane@example.com",
    image: m1
  },
  {
    id: 3,
    name: "Michael Brown",
    phone: "+1 (555) 555-7890",
    email: "michael@example.com",
    image: m2
  },
];

function Catalog() {
  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Contact Catalog</h2>
      <div className="catalog-grid">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <img
              src={contact.image}
              alt={contact.name}
              className="contact-image"
            />
            <h3 className="contact-name">{contact.name}</h3>
            <p className="contact-phone">{contact.phone}</p>
            <p className="contact-email">{contact.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
