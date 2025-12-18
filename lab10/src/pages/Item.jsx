import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { fetchContactById } from "../api/contacts";
import { useDispatch, useSelector } from "react-redux";
import { addContactToFavorites, removeContactFromFavorites } from "../redux/reducers";
import Button from "../components/Button";


export default function ItemPage() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const dispatch = useDispatch();

  const isFavorite = useSelector((state) => 
    state.favorites.favorites.some(c => c.id === Number(id)) 
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
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

  const handleToggleFavorite = () => {
    if (!contact) return;
    console.error("Контакт не завантажено!");
    
    if (isFavorite) {
      dispatch(removeContactFromFavorites(contact.id));
    } else {
      dispatch(addContactToFavorites(contact));
    }
  };


  if (loading) return <Loader />;

  if (!contact) return <p>Item not found.</p>;

  return (
    <div className="item-page">
      <div className="item-inner">
        <div className="item-left">
          <img src={contact.image} alt={contact.name} className="item-image" />
        </div>
        <div className="item-right">
          <h2 className="item-title">{contact.name}</h2>
          <p className="item-desc"><b>Category:</b> {contact.category}</p>
          <p className="item-desc"><b>Experience:</b> {contact.experience} years</p>
          <p className="item-desc"><b>Phone:</b> {contact.phone}</p>
          <p className="item-desc"><b>Email:</b> {contact.email}</p>
          
          <div className="item-actions">
            <Button 
              text={isFavorite ? "Remove from Favorites" : "Add to Favorites"} 
              onClick={handleToggleFavorite}
              className={isFavorite ? "btn-outline" : "btn-primary"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}