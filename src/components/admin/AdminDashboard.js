// // src/component/admin/AdminDashboard.js
// import React, { useEffect, useState } from "react";
// import {
//     auth,
//     db,
//     createUserByAdmin, // 🟢 from firebaseConfig.js
// } from "../../firebaseConfig";
// import {
//     collection,
//     getDocs,
//     onSnapshot,
//     query,
//     where,
//     updateDoc,
//     doc,
// } from "firebase/firestore";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AdminDashboard = () => {
//     const [adminName, setAdminName] = useState("");
//     const [users, setUsers] = useState([]);
//     const [messagesCount, setMessagesCount] = useState(0);
//     const [userCount, setUserCount] = useState(0);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     // ✅ Check if current user is admin
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//             if (!user) {
//                 navigate("/");
//                 return;
//             }

//             const userRef = collection(db, "users");
//             const snapshot = await getDocs(query(userRef, where("email", "==", user.email)));

//             if (!snapshot.empty) {
//                 const currentUser = snapshot.docs[0].data();
//                 if (currentUser.roleId !== 1) {
//                     alert("Access Denied! Admins Only.");
//                     navigate("/chat/" + user.uid);
//                 } else {
//                     setAdminName(currentUser.name);
//                 }
//             }
//         });

//         return () => unsubscribe();
//     }, [navigate]);

//     // ✅ Fetch users in realtime
//     useEffect(() => {
//         const usersRef = collection(db, "users");
//         const unsubscribe = onSnapshot(usersRef, (snapshot) => {
//             const userList = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setUsers(userList);
//             setUserCount(userList.length);
//         });

//         return () => unsubscribe();
//     }, []);

//     // ✅ Fetch total messages count
//     useEffect(() => {
//         const messagesRef = collection(db, "messages");
//         const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
//             setMessagesCount(snapshot.size);
//         });

//         return () => unsubscribe();
//     }, []);

//     // missing roleId fixer
//     useEffect(() => {
//         const addMissingRoles = async () => {
//             const usersSnapshot = await getDocs(collection(db, "users"));
//             usersSnapshot.forEach(async (userDoc) => {
//                 const data = userDoc.data();
//                 if (!data.roleId) {
//                     await updateDoc(doc(db, "users", userDoc.id), { roleId: 2 });
//                     console.log(`Added roleId:2 for user ${userDoc.id}`);
//                 }
//             });
//         };

//         addMissingRoles();
//     }, []);


//     // ✅ Handle form inputs
//     const handleInputChange = (e) => {
//         setFormData((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     // ✅ Create new user by admin
//     const handleCreateUser = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await createUserByAdmin(formData.email, formData.password, formData.name);
//             alert("✅ User created successfully!");
//             setFormData({ name: "", email: "", password: "" });
//         } catch (err) {
//             console.error("Error creating user:", err);
//             alert("❌ Error creating user. Try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ✅ Logout
//     const handleLogout = async () => {
//         await signOut(auth);
//         navigate("/");
//     };

//     return (
//         <div className="container-fluid bg-dark text-light min-vh-100 py-4">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2 className="fw-bold">Admin Dashboard</h2>
//                 <button onClick={handleLogout} className="btn btn-danger">
//                     Logout
//                 </button>
//             </div>

//             <h5>Welcome, {adminName || "Admin"} 👋</h5>

//             {/* ✅ Stats Section */}
//             <div className="row mt-4">
//                 <div className="col-md-4 mb-3">
//                     <div className="card bg-secondary text-white text-center p-3 shadow-sm">
//                         <h5>Total Users</h5>
//                         <h3>{userCount}</h3>
//                     </div>
//                 </div>
//                 <div className="col-md-4 mb-3">
//                     <div className="card bg-secondary text-white text-center p-3 shadow-sm">
//                         <h5>Total Messages</h5>
//                         <h3>{messagesCount}</h3>
//                     </div>
//                 </div>
//                 <div className="col-md-4 mb-3">
//                     <div className="card bg-secondary text-white text-center p-3 shadow-sm">
//                         <h5>Online Users</h5>
//                         <h3>{users.filter((u) => u.isOnline).length}</h3>
//                     </div>
//                 </div>
//             </div>

//             {/* ✅ Create User Form */}
//             <div className="card bg-light text-dark p-4 mt-4 shadow-sm">
//                 <h4>Create New User</h4>
//                 <form onSubmit={handleCreateUser}>
//                     <div className="row">
//                         <div className="col-md-4 mb-3">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="name"
//                                 placeholder="Enter name"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-4 mb-3">
//                             <input
//                                 type="email"
//                                 className="form-control"
//                                 name="email"
//                                 placeholder="Enter email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="col-md-4 mb-3">
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 name="password"
//                                 placeholder="Enter password"
//                                 value={formData.password}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <button type="submit" className="btn btn-primary" disabled={loading}>
//                         {loading ? "Creating..." : "Create User"}
//                     </button>
//                 </form>
//             </div>

//             {/* ✅ Users List */}
//             <div className="card bg-light text-dark mt-4 p-3 shadow-sm">
//                 <h4>All Users</h4>
//                 <div className="table-responsive">
//                     <table className="table table-striped mt-3">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Role</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((u, index) => (
//                                 <tr key={u.id}>
//                                     <td>{index + 1}</td>
//                                     <td>{u.name}</td>
//                                     <td>{u.email}</td>
//                                     <td>
//                                         {u.roleId === 1 ? (
//                                             <span className="badge bg-danger">Admin</span>
//                                         ) : (
//                                             <span className="badge bg-primary">User</span>
//                                         )}
//                                     </td>
//                                     <td>
//                                         {u.isOnline ? (
//                                             <span className="text-success fw-bold">Online</span>
//                                         ) : (
//                                             <span className="text-muted">Offline</span>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* ✅ Chat Summary */}
//             <div className="card bg-light text-dark mt-4 p-3 mb-5 shadow-sm">
//                 <h4>Chat History Summary</h4>
//                 <p>
//                     Total messages exchanged: <strong>{messagesCount}</strong>
//                 </p>
//                 <p>
//                     Active users: <strong>{users.filter((u) => u.isOnline).length}</strong>
//                 </p>
//                 <p>
//                     Total registered users: <strong>{userCount}</strong>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;


// src/component/admin/AdminDashboard.js
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import {
  auth,
  db,
  createUserByAdmin,
} from "../../firebaseConfig";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminDashboard.css";
import UsersTable from "./UsersTable";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminName, setAdminName] = useState("");
  const [users, setUsers] = useState([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newRole, setNewRole] = useState(null);
  const [marginLeft, setMarginLeft] = useState(
    window.innerWidth >= 992 ? "240px" : "0px"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if current user is admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      const userRef = collection(db, "users");
      const snapshot = await getDocs(
        query(userRef, where("email", "==", user.email))
      );

      if (!snapshot.empty) {
        const currentUser = snapshot.docs[0].data();
        if (currentUser.roleId !== 1) {
          toast.error("Access Denied! Admins Only.");
          navigate("/chat/" + user.uid);
        } else {
          setAdminName(currentUser.name);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // ✅ Fetch users realtime
  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
      setUserCount(userList.length);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch total messages
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      setMessagesCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Add missing roles
  useEffect(() => {
    const addMissingRoles = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      usersSnapshot.forEach(async (userDoc) => {
        const data = userDoc.data();
        if (!data.roleId) {
          await updateDoc(doc(db, "users", userDoc.id), { roleId: 2 });
        }
      });
    };
    addMissingRoles();
  }, []);

  // ✅ Input change
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Create new user
  // ✅ Create new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email, password } = formData;

      // Input validation before call
      if (!name || !email || !password) {
        toast.warn("Please fill all fields.");
        setLoading(false);
        return;
      }

      // Await admin-created user creation
      await createUserByAdmin(email, password, name);

      // ✅ Show success toast immediately
      toast.success("🎉 User created successfully!");

      // ✅ Clear form after success
      setFormData({ name: "", email: "", password: "" });

    } catch (err) {
      console.error("❌ Error creating user:", err);
      toast.error(err.message || "Error creating user. Try again.");
    } finally {
      // ✅ Stop loading always
      setLoading(false);
    }
  };

  // ✅ Role update logic
  const handleRoleChange = (user) => {
    const role = user.roleId === 1 ? 2 : 1;
    setSelectedUser(user);
    setNewRole(role);
    setShowConfirmModal(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedUser) return;
    setShowConfirmModal(false);

    try {
      await updateDoc(doc(db, "users", selectedUser.id), { roleId: newRole });
      toast.success(`${selectedUser.name}'s role updated!`);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, roleId: newRole } : u
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role.");
    } finally {
      setTimeout(() => setSelectedUser(null), 300);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
  useEffect(() => {
    const handleResize = () => {
      setMarginLeft(window.innerWidth >= 992 ? "240px" : "0px");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-dark text-light" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminSidebar
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-grow-1 p-sm-4 p-2" style={{
        marginLeft,
        transition: "margin 0.3s ease-in-out",
      }}>
        <ToastContainer position="top-right" autoClose={2500} theme="dark" />

        {activeTab === "dashboard" && (
          <>
            <h2 className="fw-bold mb-4">Dashboard Overview</h2>
            <h5>Welcome, {adminName || "Admin"} 👋</h5>

            <div className="row mt-4">
              <div className="col-md-4 mb-3">
                <div className="card bg-secondary text-white text-center p-3 rounded-4 shadow-sm">
                  <h5>Total Users</h5>
                  <h3>{userCount}</h3>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card bg-secondary text-white text-center p-3 rounded-4 shadow-sm">
                  <h5>Total Messages</h5>
                  <h3>{messagesCount}</h3>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card bg-secondary text-white text-center p-3 rounded-4 shadow-sm">
                  <h5>Online Users</h5>
                  <h3>{users.filter((u) => u.isOnline).length}</h3>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div className="admin-users-section container-fluid py-4">
            <h2 className="fw-bold mb-4 text-light text-center">
              👥 Manage Users
            </h2>

            {/* Create User Card */}
            <div
              className="card border-0 shadow-lg mx-auto mb-5"
              style={{
                maxWidth: "900px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #2b303b, #1e2128)",
                color: "#f8f9fa",
              }}
            >
              <div className="card-body p-4">
                <h4 className="fw-bold text-center text-primary mb-3">
                  Create New User
                </h4>
                <form onSubmit={handleCreateUser}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-md bg-dark text-light border-0 rounded-3 custom-dark-input"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="email"
                        className="form-control form-control-md bg-dark text-light border-0 rounded-3 custom-dark-input"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="password"
                        className="form-control form-control-md bg-dark text-light border-0 rounded-3 custom-dark-input"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-gradient px-5 py-2 fw-bold text-light"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Creating...
                        </>
                      ) : (
                        "Create User"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Users Table */}
            <UsersTable users={users} handleRoleChange={handleRoleChange} handleDeleteUser={(user) => {
              if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                // your delete logic, e.g. deleteDoc(doc(db, "users", user.id))
              }
            }} />
          </div>
        )}


        {activeTab === "messages" && (
          <>
            <h2 className="fw-bold mb-3">Messages Summary</h2>
            <p>Total messages: <strong>{messagesCount}</strong></p>
          </>
        )}

        {activeTab === "settings" && (
          <>
            <h2 className="fw-bold mb-3">Settings</h2>
            <p>Configure system preferences and app options here.</p>
          </>
        )}
      </div>

      {/* Confirm Role Change Modal */}
      {showConfirmModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Confirm Role Change</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body text-dark">
                <p>
                  Are you sure you want to change <b>{selectedUser?.name}</b> to{" "}
                  <b>{newRole === 1 ? "Admin" : "User"}</b>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={confirmRoleChange}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
