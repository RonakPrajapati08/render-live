// App.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import SignUp from "./components/SignUp";
// import ChatPage from "./components/ChatPage";
// // import React, { useEffect } from "react";
// // import { messaging, getToken, onMessage } from "./firebaseConfig";

// function App() {
//   // useEffect(() => {
//   //   // Request notification permission
//   //   Notification.requestPermission().then((permission) => {
//   //     if (permission === "granted") {
//   //       console.log("Notification permission granted.");

//   //       // Get FCM token
//   //       getToken(messaging, {
//   //         vapidKey:
//   //           "BBr4kY2lvVcjhWRxJREA-UfFP3HXReKDwcZdXZAtugLaTWmJh-NtUhYIpQioybwl3uR6iqxaTmiScWCfm8bzY1U",
//   //       })
//   //         .then((currentToken) => {
//   //           if (currentToken) {
//   //             console.log("FCM Token:", currentToken);
//   //             // Send this token to your backend to save it for future notifications
//   //           } else {
//   //             console.log("No registration token available.");
//   //           }
//   //         })
//   //         .catch((err) => {
//   //           console.error("Error getting FCM token:", err);
//   //         });
//   //     } else {
//   //       console.error("Notification permission denied.");
//   //     }
//   //   });

//   //   // Handle foreground messages
//   //   onMessage(messaging, (payload) => {
//   //     console.log("Message received. ", payload);
//   //     // Show notification or handle it in-app
//   //     alert(`New message: ${payload.notification.body}`);
//   //   });
//   // }, []);

//   return (
//     <Router basename="/Chat-App">
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/chat/:userId" element={<ChatPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebaseConfig";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ChatPage from "./components/ChatPage";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="typing-indicator">
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
        </div>
      </div>
    );
  }

  return (
    <Router basename="/Chat-App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to={`/chat/${user.uid}`} /> : <LoginPage />}
        />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/chat/:userId"
          element={user ? <ChatPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import SignUp from "./components/SignUp";
// import ChatPage from "./components/ChatPage";

// function App() {
//   return (
//     <Router basename="/Chat-App">
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/chat" element={<ChatPage />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import SignUp from "./components/SignUp";
// import ChatPage from "./components/ChatPage";

// function App() {
//   const [chatUser, setChatUser] = useState(null); // State to track the logged-in user

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage setChatUser={setChatUser} />} />
//         {/* <Route path="/signup" element={<SignUp />} /> */}
//         <Route path="/chat" element={<ChatPage chatUser={chatUser} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
