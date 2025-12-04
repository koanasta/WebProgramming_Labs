import React, { useContext, useState } from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import ContactsContext from "../context/ContactsContext";
import "../App.css";

const Home = () => {
  const { contacts } = useContext(ContactsContext);
  const [visibleCount, setVisibleCount] = useState(2);

  return (
    <div>
      <Hero />
      <section className="info-blocks">
        <div className="block">Verified Contacts</div>
        <div className="block">Years of Experience</div>
        <div className="block">Fast Access</div>
      </section>

      <section className="home-sample">
        {contacts.slice(0, visibleCount).map((c) => (
          <div key={c.id} className="home-sample-card">
            <img src={c.image} alt={c.name} className="contact-image-small" />
            <div>
              <h4>{c.name}</h4>
              <p>{c.category} • {c.experience}y</p>
            </div>
          </div>
        ))}
      </section>

      <div className="view-more-container">
        {visibleCount < contacts.length ? (
          <button
            className="view-more-btn"
            onClick={() => setVisibleCount((v) => v + 2)}
          >
            View more
          </button>
        ) : (
          <Link to="/catalog" className="view-more-btn">
            Go to Catalog
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
