import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Ensure Bootstrap JS is loaded

import { CartContext } from "../context/CartContext";

const Header = ({ onSearch }) => {
    const { cartItems, wishlistItems } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <header className="bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    {/* ✅ Brand Name */}
                    <Link className="navbar-brand" to="/">MyShoppingSite</Link>

                    {/* ✅ Toggle Button for Mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* ✅ Navbar Items */}
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <form className="d-flex mx-auto w-50">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </form>

                        {/* ✅ Right Side Icons */}
                        <ul className="navbar-nav ms-auto d-flex align-items-center">
                            <li className="nav-item">
                                <Link to="/wishlist" className="nav-link position-relative">
                                    <i className="bi bi-heart"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {wishlistItems.length}
                                    </span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/cart" className="nav-link position-relative">
                                    <i className="bi bi-cart"></i>
                                    <span>({cartItems.length})</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">
                                    <i className="bi bi-person-circle"></i>
                                    <span className="ms-1">Profile</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
