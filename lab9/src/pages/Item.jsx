import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { fetchContactById } from "../api/contacts";

export default function ItemPage() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchContactById(id);
        setContact(data);
      } catch (e) {
        console.error("Failed to load contact:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <Loader />;

  if (!contact) return <p>Item not found.</p>;

  return (
    <div className="item-page">
      <img src={contact.image} alt={contact.name} className="item-image" />

      <h2>{contact.name}</h2>
      <p><b>Category:</b> {contact.category}</p>
      <p><b>Experience:</b> {contact.experience} years</p>
      <p><b>Phone:</b> {contact.phone}</p>
      <p><b>Email:</b> {contact.email}</p>
    </div>
  );
}
