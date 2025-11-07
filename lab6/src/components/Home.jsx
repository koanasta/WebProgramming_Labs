import React from "react";
import Hero from "./Hero";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <Hero />
    <section className="info-blocks">
      <div className="block">Verified Contacts</div>
      <div className="block">Years of Experience</div>
      <div className="block">Fast Access</div>

      
    </section>
    <div className="view-more-container">
  <Link to="/catalog" className="view-more-btn">
    View more
  </Link>
</div>
  </div>
);

export default Home;
