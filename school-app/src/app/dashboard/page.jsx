"use client"
import { useState } from "react";
import FeeSubmission from "../components/FeeSubmission"
import Enrollment from "../components/Enrollment";

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
          <div className="grid">
            <div className="card">
              <h3>Total Students</h3>
              <p>1,240</p>
            </div>

            <div className="card">
              <h3>Total Teachers</h3>
              <p>85</p>
            </div>

            <div className="card">
              <h3>Pending Fees</h3>
              <p>Rs. 320,000</p>
            </div>

            <div className="card">
              <h3>Paid Fees</h3>
              <p>Rs. 1,120,000</p>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="panel">
            <div className="usersHeader">
              <h2>Users</h2>
              <button className="addUserBtn" onClick={() => setActiveTab("enrollment")}>+ Add User</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ali Khan</td>
                  <td>Student</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Sarah Ahmed</td>
                  <td>Teacher</td>
                  <td>Active</td>
                </tr>
              </tbody>
            </table>
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

