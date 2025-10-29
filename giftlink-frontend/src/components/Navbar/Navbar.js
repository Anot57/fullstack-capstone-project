import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-light px-4 shadow-sm">
      <div className="container-fluid d-flex align-items-center">
        <Link className="navbar-brand fw-bold me-4" to="/">
          GiftLink 🎁
        </Link>

        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item me-3">
            <Link className="nav-link fw-medium" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link className="nav-link fw-medium" to="/app">
              Gifts
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-medium" to="/app/search">
              Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
