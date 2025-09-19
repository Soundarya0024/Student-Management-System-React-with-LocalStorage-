import React, { useEffect, useState } from "react"; // React and hooks for state and lifecycle management
import { Link, useNavigate } from "react-router-dom";// Link for linking to other routes, useNavigate for navigation
import {
  getStudents,
  deleteStudent,
  getCurrentUser,
  logout,
} from "../utils/storage"; // Functions to interact with student storage and authentication
import StudentCard from "./StudentCard"; // Component to display individual student details
import YearBarChart from "./YearBarChart"; // Component to display year-wise student chart

export default function Dashboard() {
  const nav = useNavigate();
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState(""); // State for search query

  useEffect(() => { // On component mount
    const data = getStudents();
    console.log("📊 Students from localStorage:", data); 
    setStudents(data);

    const user = getCurrentUser();
    if (!user) nav("/login");
  }, []);

  function refresh() {
    const data = getStudents();
    console.log("🔄 Refreshed Students:", data); 
    setStudents(data);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete student?")) return;
    deleteStudent(id);
    refresh();
  }

  function filtered() { // Filter students based on search query
    if (!q) return students;
    const s = q.toLowerCase();
    return students.filter(
      (st) =>
        (st.fullName || "").toLowerCase().includes(s) ||
        (st.rollNumber || "").toLowerCase().includes(s) ||
        (st.className || "").toLowerCase().includes(s)
    );
  }

  function handleLogout() {
    logout();
    nav("/login");
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>SKACAS</h1>
        <p>CRUD App — Dashboard</p>
      </div>

      {/* Search + Actions */}
      <div className="header-actions">
        <input
          className="search-input"
          placeholder="Search by Name, Roll, Class"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Link to="/create">
          <button className="btn small">Create New Student</button>
        </Link>
        <button className="btn small secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Student List */}
      <div style={{ marginTop: 12 }}>
        <div className="card-grid">
          {filtered().length === 0 && (
            <div className="form-card">No students found.</div>
          )}
          {filtered().map((s) => (
            <StudentCard
              key={s.id}
              student={s}
              onDelete={() => {
                handleDelete(s.id);
              }}
            />
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ marginTop: 30 }} className="form-card">
        <h3 style={{ textAlign: "center" }}>Year-wise Students</h3>
        {students.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            No student data available for chart.
          </p>
        ) : (
          <YearBarChart students={students} />
        )}
      </div>
    </div>
  );
}
