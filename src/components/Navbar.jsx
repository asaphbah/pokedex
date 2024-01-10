import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/logo.jpeg";

import "../css/navbar.css";

const Navbar = () => {
  return (
    <header className="header-menu">
      <div className="menu-logo-list">
        <div className="pokebola">
          <div className="pokebola-border"></div>
          <span></span>
        </div>
        <h1>POKEDEX</h1>
      </div>
    </header>
  );
};
export default Navbar;
