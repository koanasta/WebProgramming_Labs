import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import { removeContactFromFavorites } from "../redux/actions";
import Button from "../components/Button";


const FavoriteContactCard = ({ contact }) => {
  const dispatch = useDispatch();
  

  const navigate = useNavigate(); 
  
  const handleRemove = () => {
    dispatch(removeContactFromFavorites(contact.id));
  };

  return (
    <div className="favorite-card">
      <Link to={`/catalog/${contact.id}`} className="favorite-link">
        <img src={contact.image} alt={contact.name} className="contact-image-small" />
        <div>
          <h4>{contact.name}</h4>
          <p>{contact.category} • {contact.experience}y</p>
        </div>
      </Link>
      <button 
        className="remove-btn" 
        onClick={handleRemove}
        title="Remove from Favorites"
      >
        &#10005; 
      </button>
    </div>
  );
};


export default function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.favorites);
  const navigate = useNavigate(); 

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Your Favorite Contacts</h2>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You have no favorite contacts yet.</p>
          <Link to="/catalog">
            <Button text="Go to Catalog" />
          </Link>
        </div>
      ) : (
       
        <>
          <div className="favorites-grid">
            {favorites.map((contact) => (
              <FavoriteContactCard key={contact.id} contact={contact} />
            ))}
          </div>

       
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <Button 
                  text="Proceed to Request Appointment"
                  onClick={() => navigate('/checkout')}
                  className="btn-primary" 
              />
          </div>
        </>
      )}
    </div>
  );
}