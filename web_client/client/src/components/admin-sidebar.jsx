import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/admin/sidebar.css";
import {
  HiOutlineViewGrid,
  HiViewGrid,
  HiOutlineNewspaper,
} from "react-icons/hi";
import { SlGraph } from "react-icons/sl";
import { AiOutlineAppstoreAdd, AiOutlineMinusCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDoorOpenLine } from "react-icons/ri";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { BsBag, BsBagPlus } from "react-icons/bs";
import axios from "axios";

function AdminSideBar({ logout, user }) {
  return (
    <div className="admin-sidebar">
      <p className="user-name">
        {user.name} {user.surname}
      </p>
      <p className="user-position">{user.position}</p>
      <hr />
      <h2>statistics</h2>
      <NavLink to="/admin/">
        <HiViewGrid className="icon" />
        Dashboard
      </NavLink>
      <NavLink to="/admin/graphics">
        <SlGraph className="icon" />
        Graphics
      </NavLink>
      <h2>news</h2>
      <NavLink to="/admin/news/">
        <HiOutlineNewspaper className="icon" />
        News List
      </NavLink>
      <NavLink to="/admin/news/add">
        <IoIosAddCircleOutline className="icon" />
        Add News
      </NavLink>
      <NavLink to="/admin/news/categories">
        <AiOutlineAppstoreAdd className="icon" />
        Categories
      </NavLink>
      <h2>users</h2>
      <NavLink to="/admin/users/">
        <FiUsers className="icon" />
        Users
      </NavLink>
      <NavLink to="/admin/users/add">
        <FiUserPlus className="icon" />
        User Add
      </NavLink>
      <NavLink to="/admin/positions/">
        <BsBag className="icon" />
        Positions
      </NavLink>
      <NavLink to="/admin/positions/add">
        <BsBagPlus className="icon" />
        Add Position
      </NavLink>
      <h2>Account</h2>
      <button onClick={logout}>
        <RiDoorOpenLine className="icon" />
        Log out
      </button>
    </div>
  );
}

export default AdminSideBar;
