"use client";

import "@/styles/components/navbar/navbar.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MdOutlineHome,
  MdOutlineNewspaper,
  MdTrendingUp,
  MdOutlineSpaceDashboard,
  MdOutlineMenu,
} from "react-icons/md";
import { BsSearch } from "react-icons/bs";

const data = require("../../../data/navbar-routes/routes.json");

function IconSelector(iconName) {
  switch (iconName) {
    case "home":
      return <MdOutlineHome className="icon" />;
    case "news":
      return <MdOutlineNewspaper className="icon" />;
    case "graph":
      return <MdTrendingUp className="icon" />;
    default:
      return <MdOutlineSpaceDashboard className="icon" />;
  }
}

function Navbar({ logo, search, setSearch }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const OpenOrCloseMobileMenu = () => {
    if (mobileMenu) {
      setMobileMenu(false);
    } else {
      setMobileMenu(true);
    }
  };
  const [windowWidth, setWindowWidth] = useState();
  if (typeof window !== "undefined") {
    useEffect(() => {
      setWindowWidth(window.innerWidth);

      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          setMobileMenu(false);
        }
        setWindowWidth(window.innerWidth);
      });
      return () =>
        window.removeEventListener("resize", () => {
          setWindowWidth(window.innerWidth);
        });
    }, []);
  }
  if (!windowWidth) {
    return (
      <nav className="navbarLoading">
        <div className="logo">
          <div className="image"></div>
        </div>
        <div className="nav-links">
          {data.map((item, key) => {
            return (
              <a key={key} className="nav-link">
                {item.text}
              </a>
            );
          })}
        </div>
        <div className="search-bar"></div>
      </nav>
    );
  } else {
    if (windowWidth > 768)
      return (
        <nav className="navbar">
          <div className="logo">
            <Image src={logo} width={60} height={60} alt="Logo" />
          </div>
          <div className="nav-links">
            {data.map((item, key) => {
              return (
                <a key={key} className="nav-link">
                  {IconSelector(item.icon)}
                  {item.text}
                </a>
              );
            })}
          </div>
          <div className="search-bar">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <BsSearch className="icon" />
          </div>
        </nav>
      );
    else
      return (
        <nav className="navbar">
          <div className="first-row">
            <div className="logo">
              <Image src={logo} width={60} height={60} alt="Logo" />
            </div>
            <MdOutlineMenu
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            />
          </div>
          <div
            className="nav-links"
            style={{ right: `${mobileMenu ? 0 : 100}%` }}
          >
            {data.map((item, key) => {
              return (
                <a key={key} className="nav-link">
                  {IconSelector(item.icon)}
                  {item.text}
                </a>
              );
            })}
          </div>
          {/* <div className="search-bar">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <BsSearch className="icon" />
          </div> */}
        </nav>
      );
  }
}

export default Navbar;
