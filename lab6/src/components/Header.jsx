import React from "react";


function Header() {
    return (
        <header className="header">
            <h1>Contact storage</h1>
            <p>Your network at one place</p>

            <nav className="navigation">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="http://localhost:3000/catalog">Contacts</a></li>
            </ul>
        </nav>

        </header>
    );
}

export default Header;
