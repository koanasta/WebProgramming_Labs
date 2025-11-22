import React, { useState } from "react";
import ContactsContext from "./ContactsContext";
import f1 from "../images/femaleone.jpg";
import m1 from "../images/maleone.jpg";
import m2 from "../images/maletwo.jpg";

export default function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Jane Doe",
      phone: "+1 (555) 123-4567",
      email: "jane@example.com",
      image: f1,
      experience: 5,
      category: "General",
      hourlyRate: 30,
      description: "Experienced professional with a strong track record."
    },
    {
      id: 2,
      name: "John Smith",
      phone: "+1 (555) 987-6543",
      email: "john@example.com",
      image: m1,
      experience: 3,
      category: "Business",
      hourlyRate: 25,
      description: "Business-oriented specialist, reliable and quick."
    },
    {
      id: 3,
      name: "Michael Brown",
      phone: "+1 (555) 555-7890",
      email: "michael@example.com",
      image: m2,
      experience: 8,
      category: "Technical",
      hourlyRate: 45,
      description: "Technical expert with in-depth knowledge."
    },
    // add more sample contacts if you want
  ]);

  return (
    <ContactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactsContext.Provider>
  );
}
