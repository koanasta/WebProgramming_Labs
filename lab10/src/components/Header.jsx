import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function Header() {
    const favoritesCount = useSelector((state) => state.favorites.favorites.length);

    return (
        <header className="header">
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <h1>Contact storage</h1>
                <p>Your network at one place</p>
            </Link>

            <nav className="navigation">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/catalog">Contacts</Link></li>

                <li>
                    <Link to="/favorites">
                        Favorites ({favoritesCount})
                    </Link>
                </li>
            </ul>
        </nav>

        </header>
    );
}

export default Header;