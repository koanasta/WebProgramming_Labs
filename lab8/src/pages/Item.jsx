import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContactsContext from "../context/ContactsContext";
import "../App.css";

export default function Item() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts } = useContext(ContactsContext);
  const item = contacts.find((c) => c.id === Number(id));

  const [countable, setCountable] = useState(item ? item.experience : 1);
  const [selectable, setSelectable] = useState("");

  if (!item) return <div style={{ padding: 20 }}>Item not found</div>;

  return (
    <div className="item-page">
      <div className="item-inner">
        <div className="item-left">
          <img src={item.image} alt={item.name} className="item-image" />
        </div>

        <div className="item-right">
          <div className="item-tags">
            <span className="tag">{item.category}</span>
            <span className="tag">Experience: {item.experience}y</span>
          </div>

          <h1 className="item-title">{item.name}</h1>
          <p className="item-desc">{item.description}</p>

          <div className="item-controls">
            <div className="item-control">
              <label className="control-label">Booked hours</label>
              <input
                type="number"
                value={countable}
                onChange={(e) => setCountable(e.target.value)}
                className="control-input"
              />
            </div>

            <div className="item-control">
              <label className="control-label">Cooperation format</label>
              <select
                value={selectable}
                onChange={(e) => setSelectable(e.target.value)}
                className="control-input"
              >
                <option value="">Select</option>
                <option value="A">Online</option>
                <option value="B">Offline</option>
              </select>
            </div>
          </div>

          <div className="item-price">Hourly rate: ${item.hourlyRate}.00</div>

          <div className="item-actions">
            <button className="btn-outline" onClick={() => navigate(-1)}>
              Go back
            </button>
            <button className="btn-primary">Book</button>
          </div>
        </div>
      </div>
    </div>
  );
}
