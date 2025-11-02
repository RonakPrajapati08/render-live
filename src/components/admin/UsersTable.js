import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../../firebaseConfig";
import { FaSearch, FaThLarge, FaTable, FaHashtag, FaUser, FaEnvelope, FaUserShield, FaSignal, FaCogs, FaTrash } from "react-icons/fa";
import "./AdminDashboard.css";
import { deleteDoc, doc } from "firebase/firestore";

const UsersTable = ({ users, handleRoleChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table"); // 👈 toggle state
  const usersPerPage = 6;

  // 🔍 Filter users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

// 🆕 Handle Delete User using render server
  const handleDeleteUser = async (u) => {
    if (u.email === auth.currentUser.email) {
      alert("❌ You cannot delete your own account.");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete ${u.name}'s account?`);
    if (!confirmDelete) return;

    try {
      // 🔹 Call your backend API
      const res = await fetch(`https://render-live.onrender.com/api/deleteUser/${u.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        alert(`✅ ${u.name} deleted successfully.`);
      } else {
        alert(`❌ Failed to delete user: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("❌ Failed to delete user. Try again.");
    }
  };



  // 📄 Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // ✨ Animation variants
  const viewVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  // 🟢 Avatar Initials Generator
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
  };

  return (
    <div
      className="card border-0 shadow-lg p-4 mt-4"
      style={{
        background: "linear-gradient(135deg, #1c1f26, #121417)",
        borderRadius: "16px",
        color: "#e5e5e5",
      }}
    >
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-primary mb-3 mb-md-0">All Users</h4>

        <div
          className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2"
          style={{ maxWidth: "100%" }}
        >
          {/* 🔍 Search */}
          <div
            className="input-group flex-grow-1"
            style={{ maxWidth: "320px" }}
          >
            <span className="input-group-text bg-primary border-0 rounded-start-3">
              <FaSearch color="white" size={14} />
            </span>
            <input
              type="text"
              className="form-control bg-dark text-white border-0 custom-dark-input"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderTopRightRadius: "12px",
                borderBottomRightRadius: "12px",
                fontSize: "0.9rem",
                padding: "0.55rem 0.75rem",
              }}
            />
          </div>

          {/* 🔁 Toggle Button grid and table */}
          <button
            className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 px-3 py-2 fw-semibold"
            onClick={() =>
              setViewMode((prev) => (prev === "table" ? "card" : "table"))
            }
            style={{
              fontSize: "0.9rem",
              borderRadius: "10px",
              minWidth: "130px",
              whiteSpace: "nowrap",
              transition: "all 0.25s ease",
            }}
          >
            {viewMode === "table" ? (
              <>
                <FaThLarge size={14} /> Card View
              </>
            ) : (
              <>
                <FaTable size={14} /> Table View
              </>
            )}
          </button>
        </div>
      </div>

      {/* ✨ Animated Views */}
      <AnimatePresence mode="wait">
        {viewMode === "table" ? (
          <motion.div
            key="table"
            variants={viewVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* 🧾 TABLE VIEW */}
            <div className="table-responsive">
              <table className="table align-middle text-light mb-0">
                <thead
                  style={{
                    background: "linear-gradient(90deg, #007bff, #0056b3)",
                    color: "#fff",
                    whiteSpace: "nowrap",
                  }}
                >
                  <tr className="text-center align-middle bg-dark text-white">
                    <th
                      style={{ width: "50px" }}
                      className="fw-semibold text-secondary text-uppercase small"
                    >
                      <FaHashtag className="me-1 text-primary" />
                    </th>

                    <th
                      style={{ minWidth: "150px" }}
                      className="fw-semibold text-uppercase small"
                    >
                      <FaUser className="me-1 text-info" /> Name
                    </th>

                    <th
                      style={{ minWidth: "200px" }}
                      className="fw-semibold text-uppercase small d-none d-sm-table-cell"
                    >
                      <FaEnvelope className="me-1 text-warning" /> Email
                    </th>

                    <th className="fw-semibold text-uppercase small">
                      <FaUserShield className="me-1 text-danger" /> Role
                    </th>

                    <th className="fw-semibold text-uppercase small">
                      <FaSignal className="me-1 text-success" /> Status
                    </th>

                    <th
                      className="fw-semibold text-uppercase small d-none d-md-table-cell"
                      style={{ minWidth: "100px" }}
                    >
                      <FaCogs className="me-1 text-primary" /> Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((u, index) => (
                      <tr
                        key={u.id}
                        className="text-center"
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#1e2229" : "#181b20",
                        }}
                      >
                        <td className="text-center">
                          {startIndex + index + 1}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap flex-md-nowrap text-center text-md-start">
                            <div
                              style={{
                                background:
                                  "linear-gradient(135deg, #007bff, #00d4ff)",
                                color: "#fff",
                                borderRadius: "50%",
                                width: "38px",
                                height: "38px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "600",
                                fontSize: "14px",
                                flexShrink: 0,
                              }}
                            >
                              {getInitials(u.name).toUpperCase()}
                            </div>
                            <div className="d-flex flex-column align-items-md-start align-items-center">
                              <span className="fw-semibold text-break">
                                {u.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="text-muted">{u.email}</td>
                        <td>
                          <span
                            className={`badge px-3 py-2 ${u.roleId === 1 ? "bg-danger" : "bg-primary"
                              }`}
                          >
                            {u.roleId === 1 ? "Admin" : "User"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge px-3 py-2 ${u.isOnline ? "bg-success" : "bg-secondary"
                              }`}
                          >
                            {u.isOnline ? "Online" : "Offline"}
                          </span>
                        </td>
                        <td className="d-flex justify-content-center gap-2 flex-wrap">
                          <button
                            className={`btn btn-sm fw-bold ${u.roleId === 1
                              ? "btn-outline-primary"
                              : "btn-outline-danger"
                              }`}
                            onClick={() => handleRoleChange(u)}
                            disabled={u.email === auth.currentUser.email}
                          >
                            Change Role
                          </button>

                          {/* 🆕 Delete Button */}
                          <button
                            className="btn btn-sm btn-outline-warning fw-bold"
                            onClick={() => handleDeleteUser(u)}
                            disabled={u.email === auth.currentUser.email}
                          >
                            <FaTrash className="me-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No users found 😕
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            variants={viewVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* 🧑‍💼 CARD VIEW */}
            <div className="row g-4 mt-2">
              {currentUsers.length > 0 ? (
                currentUsers.map((u) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={u.id}>
                    <motion.div
                      className="card h-100 p-3 border-0 shadow-sm text-center d-flex flex-column justify-content-between"
                      style={{
                        background: "rgba(255, 255, 255, 0.07)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "18px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f0f0f0",
                        transition: "all 0.3s ease-in-out",
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* 🟣 Avatar */}
                      <motion.div
                        className="mx-auto mb-3"
                        style={{
                          background:
                            "linear-gradient(135deg, #007bff, #00d4ff)",
                          color: "#fff",
                          borderRadius: "50%",
                          width: "70px",
                          height: "70px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                          fontWeight: "700",
                          letterSpacing: "1px",
                          boxShadow: "0 4px 10px rgba(0,123,255,0.4)",
                        }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {getInitials(u.name).toUpperCase()}
                      </motion.div>

                      {/* 🧾 Content Section */}
                      <div className="d-flex flex-column align-items-center gap-1 flex-grow-1">
                        <h6 className="fw-bold text-primary mb-1">{u.name}</h6>

                        {/* 📧 Email */}
                        <div className="d-flex align-items-center justify-content-center small text-light opacity-75">
                          <i className="fa-solid fa-envelope me-2 text-info"></i>
                          {u.email}
                        </div>

                        <div className="d-flex align-items-center justify-content-between gap-3 mt-3">
                          {/* 🏷 Role */}
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <i
                              className={`${u.roleId === 1
                                ? "fa-solid fa-user-shield text-danger"
                                : "fa-solid fa-user text-primary"
                                }`}
                            ></i>
                            <span
                              className={`badge px-3 py-2 ${u.roleId === 1 ? "bg-danger" : "bg-primary"
                                }`}
                            >
                              {u.roleId === 1 ? "Admin" : "User"}
                            </span>
                          </div>

                          {/* 🟢 Status */}
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <i
                              className={`fa-solid fa-circle ${u.isOnline ? "text-success" : "text-secondary"
                                }`}
                              style={{ fontSize: "10px" }}
                            ></i>
                            <span
                              className={`badge px-3 py-2 ${u.isOnline ? "bg-success" : "bg-secondary"
                                }`}
                            >
                              {u.isOnline ? "Online" : "Offline"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 🔘 Change Role Button */}
                      <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className={`btn btn-sm fw-semibold mt-3 ${u.roleId === 1
                            ? "btn-outline-primary"
                            : "btn-outline-danger"
                            }`}
                          style={{
                            borderRadius: "10px",
                            transition: "0.3s ease",
                          }}
                          onClick={() => handleRoleChange(u)}
                          disabled={u.email === auth.currentUser.email}
                        >
                          <i className="fa-solid fa-sync-alt me-2"></i> Change
                          Role
                        </motion.button>

                        {/* 🆕 Delete Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="btn btn-sm btn-outline-warning fw-semibold"
                          onClick={() => handleDeleteUser(u)}
                          disabled={u.email === auth.currentUser.email}
                        >
                          <FaTrash className="me-1" /> Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted py-4">No users found 😕</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination pagination-sm mb-0">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""
                    }`}
                >
                  <button
                    className="page-link bg-dark text-light border-primary"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
