import React from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ contact }) => {
  return (
    <Link to={`/catalog/${contact.id}`} className="contact-link-card">
      <div className="card">
        <img src={contact.image} alt={contact.name} className="contact-image" />
        <h3>{contact.name}</h3>
        <p>{contact.phone}</p>
      </div>
    </Link>
  );
};

export default ContactCard;
