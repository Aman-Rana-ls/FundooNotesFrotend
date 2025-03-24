import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.scss";

function Dashboard() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="dashboard-container">
      <Navbar toggleDrawer={toggleDrawer} />

      <div className="main-content">
        <Sidebar open={open} className={open ? "sidebar" : "sidebar collapsed"} />
        <div className="dashboard-content" style={{ marginLeft: open ? "240px" : "60px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}


export default Dashboard;