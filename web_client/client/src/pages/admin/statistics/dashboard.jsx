import React from "react";
import { Outlet } from "react-router-dom";
import "../../../styles/admin/dashboard.css";
import DashboardOnlyNumberData from "../../../components/statistics/dashboard-only-number-data";
import { AiOutlineEye, AiOutlineUser } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <div className="only-number">
        <DashboardOnlyNumberData
          data={100}
          icon={<AiOutlineEye className="icon" />}
          name="monthly views"
        />
        <DashboardOnlyNumberData
          data={200}
          icon={<MdContentCopy className="icon" />}
          name="added content"
        />
        <DashboardOnlyNumberData
          data={300}
          icon={<AiOutlineUser className="icon" />}
          name="registered user"
        />
      </div>
    </div>
  );
}

export default Dashboard;
