import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import { auth } from '../../firebase';
import { ReactComponent as Logo } from '../../logo001SVG.svg';

function Header() {
  return (
    <nav className="header">
      <div className="header__container">
        <div>
          <Link to="/">
            <div className="header__logo">
              <Logo />
            </div>
          </Link>

          <NavItem text="Dashboard" link="/" />
          <NavItem text="Orders" link="/orders" />
          <NavItem text="View Details" link="/user" />

        </div>
        
        <button className="header__logoutBtn btn btn-secondary" onClick={() => auth.signOut()}>Logout</button>
      </div>
    </nav>
  );
}

function NavItem({ text, link }) {
  return (
    <NavLink
      exact
      className="btn text-light"
      activeClassName="btn-primary"
      to={link}
    >
      {text}
    </NavLink>
  );
}

export default Header;
