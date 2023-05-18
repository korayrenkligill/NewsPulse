import React from "react";
import Logo from "../images/logo.png";
import { NavLink } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillDatabase,
  AiOutlineDatabase,
} from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import "../styles/navbar.css";
function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <div className="frame">
          <img src={Logo} alt="logo" />
        </div>
        <div className="links">
          <NavLink to="/">
            <AiFillHome className="icon-fill" />
            <AiOutlineHome className="icon" />
            Link 1
          </NavLink>
          <NavLink to="/admin">
            <AiFillDatabase className="icon-fill" />
            <AiOutlineDatabase className="icon" />
            Link 2
          </NavLink>
        </div>
      </div>
      <div className="right">
        <input type="text" placeholder="Enter search term" />
        <BsSearch className="icon" />
      </div>
    </div>
  );
}

export default Navbar;
