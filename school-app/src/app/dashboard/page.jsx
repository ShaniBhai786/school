"use client"
import { useState } from "react";
import FeeSubmission from "../components/FeeSubmission"
import Enrollment from "../components/Enrollment";
import Users from "../components/Users";
import Overview from "../components/Overview";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="admin-logo"><span>Admin</span> Panel</h2>

        <button onClick={() => setActiveTab("overview")}>Overview</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("fees")}>Fee Submission</button>
        <button onClick={() => setActiveTab("settings")}>Settings</button>
      </aside>

      <main className="content">
        {activeTab === "overview" && (
          <Overview />
        )}

        {activeTab === "users" && (
          <div className="panel">
            <div className="usersHeader">
              <h2>Users</h2>
              <button className="addUserBtn" onClick={() => setActiveTab("enrollment")}>+ Add User</button>
            </div>
            <Users />
          </div>
        )}

        {activeTab === "fees" && (
          <>
            <FeeSubmission />
          </>
        )}

        {activeTab === "enrollment" && (
          <>
          <Enrollment />
          </>
        )}
        {activeTab === "settings" && (
          <div className="panel">
            <h2>Settings</h2>
            <p>Manage system configuration and admin preferences.</p>
          </div>
        )}
      </main>
    </div>
  );
}

