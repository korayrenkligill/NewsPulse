import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/admin/sidebar.css";
import { HiOutlineViewGrid, HiViewGrid } from "react-icons/hi";
import { SlGraph } from "react-icons/sl";

function AdminSideBar() {
  return (
    <div className="admin-sidebar">
      <h2>statistics</h2>
      <NavLink to="/admin/">
        <HiViewGrid className="icon" />
        Dashboard
      </NavLink>
      <NavLink to="/admin/test">
        <SlGraph className="icon" />
        Test
      </NavLink>
      <NavLink to="/admin/test2">
        <SlGraph className="icon" />
        Graphics
      </NavLink>
      <h2>news</h2>
      <NavLink to="/admin/test2">
        <SlGraph className="icon" />
        Add
      </NavLink>
      <NavLink to="/admin/test2">
        <SlGraph className="icon" />
        Remove
      </NavLink>
      <h2>users</h2>
      <NavLink to="/admin/test2">
        <SlGraph className="icon" />
        Users
      </NavLink>
      <NavLink to="/admin/test2">
        <SlGraph className="icon" />
        User Add
      </NavLink>
      <NavLink to="/admin/test2">
        <SlGraph className="icon" />
        User Remove
      </NavLink>
    </div>
  );
}

export default AdminSideBar;
