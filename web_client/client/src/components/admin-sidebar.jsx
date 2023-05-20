import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/admin/sidebar.css";
import { HiOutlineViewGrid, HiViewGrid } from "react-icons/hi";
import { SlGraph } from "react-icons/sl";
import { AiOutlineAppstoreAdd, AiOutlineMinusCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";

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
      <NavLink to="/admin/news/add">
        <IoIosAddCircleOutline className="icon" />
        Add News
      </NavLink>
      <NavLink to="/admin/test2">
        <AiOutlineMinusCircle className="icon" />
        Remove News
      </NavLink>
      <NavLink to="/admin/news/categories">
        <AiOutlineAppstoreAdd className="icon" />
        Categories
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
