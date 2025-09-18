// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";
import user from "./img/user.png";
import star from "./img/star.png";
import search from "./img/search.png";
import message from "./img/message.png"
import logo from "./img/logo.png";
import { jwtDecode } from 'jwt-decode';



const Navbar = () => {

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token introuvable !");
    return;
  }

  const decoded = jwtDecode(token);
  const role = decoded.role;
  
  return (
    <nav>
        {role ==='adoptant' && (
          <div>
            <Link to="/animals">
            <img src={logo} />
            Pefty</Link>
          </div>
        )}
        {role ==='organisme' && (
          <div>
            <Link to="/dashboard">
            <img src={logo} />
            Pefty</Link>
          </div>
        )}
        <div>
          <Link to="/search">
          <img src={search} />
          Recherche</Link>
        </div>
        <div>
          <Link to="/chat">
          <img src={message} />
          Discussion</Link>
        </div>
        <div>
          <Link to="/premium">
          <img src={star} />
          Premium</Link>
        </div>
        <div>
          <Link to="/profile">
          <img src={user} />
          Profil</Link>
        </div> 
    </nav>
  );
};

export default Navbar;
