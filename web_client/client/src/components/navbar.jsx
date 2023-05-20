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
import { IoBaseballOutline, IoBaseballSharp } from "react-icons/io5";
import { MdCloudQueue, MdCloud } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
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
            Journal
          </NavLink>
          <NavLink to="/sports">
            <IoBaseballSharp className="icon-fill" />
            <IoBaseballOutline className="icon" />
            Sports
          </NavLink>
          <NavLink to="/weather">
            <MdCloud className="icon-fill" />
            <MdCloudQueue className="icon" />
            Weather
          </NavLink>
          <NavLink to="/finance">
            <SlGraph className="icon-fill" />
            <SlGraph className="icon" />
            Finance
          </NavLink>
          <NavLink to="/admin">
            <AiFillDatabase className="icon-fill" />
            <AiOutlineDatabase className="icon" />
            Management panel
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
