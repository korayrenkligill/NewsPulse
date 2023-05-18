import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/admin-sidebar";
import "../../styles/admin/admin.css";
function Admin() {
  return (
    <div className="admin">
      <div>
        <AdminSideBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
