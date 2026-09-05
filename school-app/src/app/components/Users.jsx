"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

const Users = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("/api/students")

        if (!response.ok) {
          throw new Error("Failed to fetch students")
        }

        const data = await response.json()
        setStudents(data.students || [])
      } catch (error) {
        console.error("ERROR FETCHING STUDENTS", error)
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, [])

  return (
    <div className="students-page">

      {/* Header */}
      <div className="students-header">
        <div>
          <span className="page-label">STUDENT MANAGEMENT</span>
          <h1>Students</h1>
          <p>Manage and monitor your registered students.</p>
        </div>

        <div className="student-count">
          <span>{students.length}</span>
          <small>Total Students</small>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading students...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && students.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👨‍🎓</div>
          <h3>No Students Found</h3>
          <p>There are currently no registered students.</p>
        </div>
      )}

      {/* Students */}
      {!loading && students.length > 0 && (
        <div className="students-card">

          <div className="table-header">
            <div className="td">Student</div>
            <div className="td">Class</div>
            <div className="td">Student ID</div>
            <div className="td">Status</div>
          </div>

          {students.map((value, index) => (
            <div className="student-row" key={value._id || index}>

              {/* Student */}
              <div className="student-profile">
                <div className="avatar-wrapper">
                  <Image
                    src={value.avatar}
                    alt={value.fullName || "Student"}
                    width={52}
                    height={52}
                    className="avatar"
                  />
                  <span className="online-dot"></span>
                </div>

                <div className="student-info">
                  <h3>{value.fullName}</h3>
                  <span>Student #{index + 1}</span>
                </div>
              </div>

              {/* Class */}
              <div className="class-info">
                <span className="class-badge">
                  {value.class}
                </span>
              </div>

              {/* Student ID */}
              <div className="student-id">
                {value.studentId || "N/A"}
              </div>

              {/* Status */}
              <div>
                <span className="status active">
                  <span></span>
                  Active
                </span>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default Users

