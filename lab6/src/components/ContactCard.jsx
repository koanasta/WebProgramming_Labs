import React from "react";

const ContactCard = ({ name, experience, phone }) => (
  <div className="card">
    <h3>{name}</h3>
    <p>Experience: {experience} years</p>
    <p>Phone: {phone}</p>
  </div>
);

export default ContactCard;
