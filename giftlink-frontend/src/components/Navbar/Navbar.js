import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-light px-4 shadow-sm">
      <div className="container-fluid d-flex align-items-center">
        <a className="navbar-brand fw-bold me-4" href="/">
          GiftLink 🎁
        </a>

        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item me-3">
            <a className="nav-link fw-medium" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link fw-medium" href="/app">
              Gifts
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
