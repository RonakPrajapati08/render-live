// App.js
// import React, { useEffect, useState } from "react";
// import {
//   HashRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import {
//   auth,
//   requestNotificationPermission,
//   listenForMessages,
// } from "./firebaseConfig";
// import LoginPage from "./components/LoginPage";
// import SignUp from "./components/SignUp";
// import ChatPage from "./components/ChatPage";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       requestNotificationPermission(); // ask for notification permission
//       listenForMessages(user.uid); // listen to Firestore for new messages
//     }
//   }, [user]);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="typing-indicator">
//           <div className="typing-circle"></div>
//           <div className="typing-circle"></div>
//           <div className="typing-circle"></div>
//           <div className="typing-shadow"></div>
//           <div className="typing-shadow"></div>
//           <div className="typing-shadow"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={user ? <Navigate to={`/chat/${user.uid}`} /> : <LoginPage />}
//         />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route
//           path="/chat/:userId"
//           element={user ? <ChatPage /> : <Navigate to="/" />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/app.js
import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  auth,
  db,
  requestNotificationPermission,
  listenForMessages,
} from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ChatPage from "./components/ChatPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // 🔹 Fetch user role from Firestore
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setRole(data.roleId || 2); // default normal user
          } else {
            setRole(2);
          }
        } catch (err) {
          console.error("Error fetching user role:", err);
          setRole(2);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      requestNotificationPermission();
      listenForMessages(user.uid);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  // ✅ Handle redirects properly
  const HomeRedirect = () => {
    if (!user) return <LoginPage />;
    if (role === 1) return <Navigate to="/admin-dashboard" replace />;
    if (role === 2) return <Navigate to={`/chat/${user.uid}`} replace />;
    return <LoginPage />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/chat/:userId"
          element={user && role === 2 ? <ChatPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-dashboard"
          element={
            user && role === 1 ? <AdminDashboard /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


