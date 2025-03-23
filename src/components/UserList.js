// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig"; // Firebase Auth and Firestore
// import { collection, onSnapshot } from "firebase/firestore";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate(); // React Router v6 hook for navigation

//   useEffect(() => {
//     // Listen for changes in the 'users' collection
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline); // Filter for users who are online

//       setUsers(onlineUsers);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Logout function
//   const logout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         // After logging out, redirect to login page (root path)
//         navigate("/", { replace: true }); // Using { replace: true } to prevent going back
//       })
//       .catch((error) => {
//         console.error("Error during logout:", error);
//       });
//   };

//   return (
//     <div className="chat-list">
//       <h2>Chats</h2>
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{user.lastMessage || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//           ></span>
//         </div>
//       ))}
//       <button className="logout-btn" onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

//This code is Talk to yourself is available feature

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import { collection, onSnapshot } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline);

//       setUsers(onlineUsers);
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigate("/", { replace: true });
//       })
//       .catch((error) => {
//         console.error("Error during logout:", error);
//       });
//   };

//   return (
//     <div className="chat-list">
//       <h2>Chats</h2>
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{user.lastMessage || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//           ></span>
//         </div>
//       ))}
//       <button className="logout-btn" onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

//this code is talk yourself not available

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the current user data
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//       }
//     };

//     fetchCurrentUser();

//     // Subscribe to the "users" collection to show online users
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigate("/", { replace: true });
//       })
//       .catch((error) => {
//         console.error("Error during logout:", error);
//       });
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="fw-bold">Chats</h3>

//         {/* Display the current user's profile at the top */}
//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
//           </div>
//         )}
//       </div>

//       <hr />

//       {/* Display online users */}
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{user.lastMessage || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//           ></span>
//         </div>
//       ))}

//       <button
//         className="logout-btn position-absolute bottom-0"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

///Test Perpose code WIth login

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the current user data
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//       }
//     };

//     fetchCurrentUser();

//     // Subscribe to the "users" collection to show online users
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigate("/", { replace: true });
//       })
//       .catch((error) => {
//         console.error("Error during logout:", error);
//       });
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="fw-bold">Chats</h3>

//         {/* Display the current user's profile at the top */}
//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
//           </div>
//         )}
//       </div>

//       <hr />

//       {/* Display online users */}
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{user.lastMessage || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//           ></span>
//         </div>
//       ))}

//       <button
//         className="logout-btn position-absolute bottom-0"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   getDoc,
//   query,
//   orderBy,
//   limit,
//   where,
// } from "firebase/firestore"; // Import where here
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const [lastMessages, setLastMessages] = useState({}); // Store last messages for each user
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the current user data
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//       }
//     };

//     fetchCurrentUser();

//     // Subscribe to the "users" collection to show online users
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//       fetchLastMessages(onlineUsers); // Fetch last messages when users are updated
//     });

//     return () => unsubscribe();
//   }, []);

//   // Fetch the last message for each user
//   const fetchLastMessages = (onlineUsers) => {
//     onlineUsers.forEach((user) => {
//       const q = query(
//         collection(db, "chats"),
//         orderBy("timestamp", "desc"),
//         limit(1),
//         where("userId", "in", [auth.currentUser.uid, user.id]),
//         where("senderId", "in", [auth.currentUser.uid, user.id])
//       );

//       onSnapshot(q, (snapshot) => {
//         const lastMessage = snapshot.docs[0]?.data()?.text || "No messages yet";
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: lastMessage,
//         }));
//       });
//     });
//   };

//   const logout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigate("/", { replace: true });
//       })
//       .catch((error) => {
//         console.error("Error during logout:", error);
//       });
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="fw-bold">Chats</h3>

//         {/* Display the current user's profile at the top */}
//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
//           </div>
//         )}
//       </div>

//       <hr />

//       {/* Display online users */}
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{lastMessages[user.id] || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//           ></span>
//         </div>
//       ))}

//       <button
//         className="logout-btn position-absolute bottom-0"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

// ChatList.js
// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   where,
//   updateDoc,
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const [lastMessages, setLastMessages] = useState({});
//   const navigate = useNavigate();

//   // Function to update the user's online status
//   const updateUserStatus = async (status) => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       try {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         await updateDoc(userDocRef, { isOnline: status });
//       } catch (error) {
//         console.error("Error updating user status:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     // Fetch current user data and update the user status
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//         await updateUserStatus(true); // Set online when logged in
//       } else {
//         console.log("No user is currently logged in.");
//       }
//     };

//     fetchCurrentUser();

//     // Subscribe to the "users" collection to show online users
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//       fetchLastMessages(onlineUsers);
//     });

//     // Set up listener for changes in authentication state
//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (user) {
//         updateUserStatus(true);
//         fetchCurrentUser();
//       } else {
//         setCurrentUserData(null);
//         navigate("/login"); // Redirect to login if logged out
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeAuth();
//     };
//   }, [navigate]);

//   // Fetch the last message for each user
//   const fetchLastMessages = async (onlineUsers) => {
//     for (const user of onlineUsers) {
//       const q = query(
//         collection(db, "chats"),
//         where("userId", "in", [auth.currentUser.uid, user.id]),
//         orderBy("timestamp", "desc"),
//         limit(1)
//       );

//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         const lastMessage = querySnapshot.docs[0].data().text;
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: lastMessage,
//         }));
//       } else {
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: "No messages yet",
//         }));
//       }
//     }

//     const qRealTime = query(
//       collection(db, "chats"),
//       where("userId", "in", [auth.currentUser.uid]),
//       orderBy("timestamp", "desc")
//     );

//     onSnapshot(qRealTime, (snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         const { userId, text } = doc.data();
//         if (userId !== auth.currentUser.uid) {
//           setLastMessages((prevMessages) => ({
//             ...prevMessages,
//             [userId]: text,
//           }));
//         }
//       });
//     });
//   };

//   const logout = async () => {
//     try {
//       // Update user status to offline before signing out
//       await updateUserStatus(false);
//       await auth.signOut();
//       navigate("/", { replace: true });
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="fw-bold">Chats</h3>

//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
//           </div>
//         )}
//       </div>

//       <hr />

//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{lastMessages[user.id] || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//             style={{
//               width: "12px",
//               height: "12px",
//               borderRadius: "50%",
//               backgroundColor: user.isOnline ? "green" : "red",
//             }}
//           ></span>
//         </div>
//       ))}

//       <button
//         className="logout-btn position-absolute bottom-0"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

//This is Updated Code This Error: Cannot read properties of null (reading 'uid') Solve.

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   where,
//   updateDoc,
// } from "firebase/firestore";
// import Col from "react-bootstrap/Col";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const [lastMessages, setLastMessages] = useState({});
//   const navigate = useNavigate();

//   const updateUserStatus = async (status) => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       try {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         await updateDoc(userDocRef, { isOnline: status });
//       } catch (error) {
//         console.error("Error updating user status:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//         await updateUserStatus(true);
//       } else {
//         console.log("No user is currently logged in.");
//       }
//     };

//     fetchCurrentUser();

//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//       if (auth.currentUser) fetchLastMessages(onlineUsers);
//     });

//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (user) {
//         updateUserStatus(true);
//         fetchCurrentUser();
//       } else {
//         setCurrentUserData(null);
//         navigate("/login");
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeAuth();
//     };
//   }, [navigate]);

//   const fetchLastMessages = async (onlineUsers) => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return; // Exit if currentUser is null

//     for (const user of onlineUsers) {
//       const q = query(
//         collection(db, "chats"),
//         where("userId", "in", [currentUser.uid, user.id]),
//         orderBy("timestamp", "desc"),
//         limit(1)
//       );

//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         const lastMessage = querySnapshot.docs[0].data().text;
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: lastMessage,
//         }));
//       } else {
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: "No messages yet",
//         }));
//       }
//     }

//     const qRealTime = query(
//       collection(db, "chats"),
//       where("userId", "in", [currentUser.uid]),
//       orderBy("timestamp", "desc")
//     );

//     onSnapshot(qRealTime, (snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         const { userId, text } = doc.data();
//         if (userId !== currentUser.uid) {
//           setLastMessages((prevMessages) => ({
//             ...prevMessages,
//             [userId]: text,
//           }));
//         }
//       });
//     });
//   };

//   const logout = async () => {
//     try {
//       await updateUserStatus(false);
//       await auth.signOut();
//       navigate("/", { replace: true });
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <Col xs={6} md={4}>
//           <h3 className="fw-bold">Whatsapp</h3>
//         </Col>

//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <img
//               src={
//                 localStorage.getItem("profileImage") || "/default-profile.jpg"
//               }
//               alt="Profile"
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 marginRight: "8px",
//               }}
//             />
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
//           </div>
//         )}
//       </div>

//       <hr />

//       {users.map((user) => {
//         const userImage = localStorage.getItem(`profileImage_${user.id}`);
//         return (
//           <div
//             key={user.id}
//             onClick={() => setSelectedUser(user)}
//             className="chat-item"
//           >
//             <div className="chat-item-info">
//               <p>{user.name || "Unknown User"}</p>
//               <p>{lastMessages[user.id] || "No messages yet"}</p>
//             </div>
//             <span
//               className={`status ${user.isOnline ? "online" : "offline"}`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 backgroundColor: user.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <img
//               src={userImage || "/default-profile.jpg"}
//               alt="User Profile"
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 marginLeft: "8px",
//               }}
//             />
//           </div>
//         );
//       })}

//       <button
//         className="logout-btn log-out position-absolute px-3 rounded-3 text-bg-danger"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

//user profile uploaded image localstorage get (13/12/2024)

// Importing necessary dependencies and Firebase configurations
// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   where,
//   updateDoc,
//   addDoc,
// } from "firebase/firestore";
// import Dropdown from "react-bootstrap/Dropdown";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const [lastMessages, setLastMessages] = useState({});
//   const [showGroupModal, setShowGroupModal] = useState(false);
//   const [groupName, setGroupName] = useState("");
//   const [selectedParticipants, setSelectedParticipants] = useState([]);
//   const navigate = useNavigate();

//   const updateUserStatus = async (status) => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       try {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         await updateDoc(userDocRef, { isOnline: status });
//       } catch (error) {
//         console.error("Error updating user status:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//         await updateUserStatus(true);
//       } else {
//         console.log("No user is currently logged in.");
//       }
//     };

//     fetchCurrentUser();

//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//       if (auth.currentUser) fetchLastMessages(onlineUsers);
//     });

//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (user) {
//         updateUserStatus(true);
//         fetchCurrentUser();
//       } else {
//         setCurrentUserData(null);
//         navigate("/login");
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeAuth();
//     };
//   }, [navigate]);

//   const fetchLastMessages = async (onlineUsers) => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return;

//     for (const user of onlineUsers) {
//       const q = query(
//         collection(db, "chats"),
//         where("userId", "in", [currentUser.uid, user.id]),
//         orderBy("timestamp", "desc"),
//         limit(1)
//       );

//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         const lastMessage = querySnapshot.docs[0].data().text;
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: lastMessage,
//         }));
//       } else {
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: "No messages yet",
//         }));
//       }
//     }
//   };

//   const createGroup = async () => {
//     if (!groupName || selectedParticipants.length === 0) {
//       alert("Please provide a group name and select participants.");
//       return;
//     }

//     try {
//       const groupData = {
//         name: groupName,
//         participants: [auth.currentUser.uid, ...selectedParticipants],
//         createdAt: new Date(),
//         // NEW: Add additional fields to group data
//         createdBy: auth.currentUser.uid, // Track the creator of the group
//         participantCount: selectedParticipants.length + 1, // Including the creator
//       };

//       await addDoc(collection(db, "groups"), groupData);

//       // Clear inputs after creation
//       setShowGroupModal(false);
//       setGroupName("");
//       setSelectedParticipants([]);
//       alert("Group created successfully!");
//     } catch (error) {
//       console.error("Error creating group:", error);
//     }
//   };

//   // NEW: Utility function to clear modal state
//   const clearGroupModal = () => {
//     setGroupName("");
//     setSelectedParticipants([]);
//     setShowGroupModal(false);
//   };

//   const logout = async () => {
//     try {
//       await updateUserStatus(false);
//       await auth.signOut();
//       navigate("/", { replace: true });
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <Col xs={6} md={4}>
//           <h3 className="fw-bold">Whatsapp</h3>
//         </Col>
//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <img
//               src={
//                 localStorage.getItem("profileImage") || "/default-profile.jpg"
//               }
//               alt="Profile"
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 marginRight: "8px",
//               }}
//             />
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>

//             <Dropdown align="end">
//               <Dropdown.Toggle
//                 variant="button"
//                 bsPrefix="p-2"
//                 id="dropdown-basic"
//                 className="text-black fw-bold fs-5"
//               >
//                 &#8942;
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
//                 <Dropdown.Item onClick={() => setShowGroupModal(true)}>
//                   Create Group
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//         )}
//       </div>

//       <hr />

//       {users.map((user) => {
//         const userImage = localStorage.getItem(`profileImage_${user.id}`);
//         return (
//           <div
//             key={user.id}
//             onClick={() => setSelectedUser(user)}
//             className="chat-item rounded-3 mb-2"
//           >
//             <div className="chat-item-info">
//               <p>{user.name || "Unknown User"}</p>
//               <p>{lastMessages[user.id] || "No messages yet"}</p>
//             </div>
//             <span
//               className={`status ${user.isOnline ? "online" : "offline"}`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 backgroundColor: user.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <img
//               src={userImage || "/default-profile.jpg"}
//               alt="User Profile"
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 marginLeft: "8px",
//               }}
//             />
//           </div>
//         );
//       })}

//       <Modal show={showGroupModal} onHide={clearGroupModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Group</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Group Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter group name"
//                 value={groupName}
//                 onChange={(e) => setGroupName(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Select Participants</Form.Label>
//               {users.map((user) => (
//                 <Form.Check
//                   key={user.id}
//                   type="checkbox"
//                   label={user.name}
//                   value={user.id}
//                   onChange={(e) => {
//                     const checked = e.target.checked;
//                     setSelectedParticipants((prev) =>
//                       checked
//                         ? [...prev, user.id]
//                         : prev.filter((id) => id !== user.id)
//                     );
//                   }}
//                 />
//               ))}
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={clearGroupModal}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={createGroup}>
//             Create Group
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ChatList;

//user profile use email first latter not uploaded image localstorage get (13/12/2024) Updated.

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   where,
//   updateDoc,
//   addDoc,
// } from "firebase/firestore";
// import Dropdown from "react-bootstrap/Dropdown";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const [lastMessages, setLastMessages] = useState({});
//   const [showGroupModal, setShowGroupModal] = useState(false);
//   const [groupName, setGroupName] = useState("");
//   const [selectedParticipants, setSelectedParticipants] = useState([]);
//   const navigate = useNavigate();

//   const updateUserStatus = async (status) => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       try {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         await updateDoc(userDocRef, { isOnline: status });
//       } catch (error) {
//         console.error("Error updating user status:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//         await updateUserStatus(true);
//       } else {
//         console.log("No user is currently logged in.");
//       }
//     };

//     fetchCurrentUser();

//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//       if (auth.currentUser) fetchLastMessages(onlineUsers);
//     });

//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (user) {
//         updateUserStatus(true);
//         fetchCurrentUser();
//       } else {
//         setCurrentUserData(null);
//         navigate("/login");
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeAuth();
//     };
//   }, [navigate]);

//   const fetchLastMessages = async (onlineUsers) => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return;

//     for (const user of onlineUsers) {
//       const q = query(
//         collection(db, "chats"),
//         where("userId", "in", [currentUser.uid, user.id]),
//         orderBy("timestamp", "desc"),
//         limit(1)
//       );

//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         const lastMessage = querySnapshot.docs[0].data().text;
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: lastMessage,
//         }));
//       } else {
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: "No messages yet",
//         }));
//       }
//     }
//   };

//   const createGroup = async () => {
//     if (!groupName || selectedParticipants.length === 0) {
//       alert("Please provide a group name and select participants.");
//       return;
//     }

//     try {
//       const groupData = {
//         name: groupName,
//         participants: [auth.currentUser.uid, ...selectedParticipants],
//         createdAt: new Date(),
//         createdBy: auth.currentUser.uid,
//         participantCount: selectedParticipants.length + 1,
//       };

//       await addDoc(collection(db, "groups"), groupData);

//       // Clear inputs after creation
//       setShowGroupModal(false);
//       setGroupName("");
//       setSelectedParticipants([]);
//       alert("Group created successfully!");
//     } catch (error) {
//       console.error("Error creating group:", error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await updateUserStatus(false);
//       await auth.signOut();
//       navigate("/", { replace: true });
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   // Function to generate the user's profile image with initials and background color
//   const getUserProfileImage = (email) => {
//     const firstLetter = email.charAt(0).toUpperCase();
//     // const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16); // Random background color
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "40px",
//           height: "40px",
//           borderRadius: "50%",
//           backgroundColor: "rgb(224, 231, 255, 1)",
//           color: "#4f46e5",
//           fontWeight: "bold",
//         }}
//       >
//         {firstLetter}
//       </div>
//     );
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <Col xs={6} md={4}>
//           <h3 className="fw-bold">Whatsapp</h3>
//         </Col>
//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <div style={{ marginRight: "8px" }}>
//               {getUserProfileImage(currentUserData.email)}{" "}
//               {/* Display profile image */}
//             </div>
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>

//             <Dropdown align="end">
//               <Dropdown.Toggle
//                 variant="button"
//                 bsPrefix="p-2"
//                 id="dropdown-basic"
//                 className="text-black fw-bold fs-5"
//               >
//                 &#8942;
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
//                 <Dropdown.Item onClick={() => setShowGroupModal(true)}>
//                   Create Group
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//         )}
//       </div>

//       <hr />

//       {users.map((user) => {
//         return (
//           <div
//             key={user.id}
//             onClick={() => setSelectedUser(user)}
//             className="chat-item rounded-3 mb-2"
//           >
//             <div className="chat-item-info d-flex gap-2 align-items-center">
//               <div style={{ marginLeft: "8px" }}>
//                 {getUserProfileImage(user.email)} {/* Display profile image */}
//               </div>

//               <div>
//                 <p className="mb-0 fw-semibold" style={{ fontSize: "18px" }}>
//                   {user.name || "Unknown User"}
//                 </p>
//                 <p>{lastMessages[user.id] || "No messages yet"}</p>
//               </div>
//             </div>
//             <span
//               className={`status ${user.isOnline ? "online" : "offline"}`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 backgroundColor: user.isOnline ? "green" : "red",
//               }}
//             ></span>
//           </div>
//         );
//       })}

//       <Modal show={showGroupModal} onHide={() => setShowGroupModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Group</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Group Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter group name"
//                 value={groupName}
//                 onChange={(e) => setGroupName(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Select Participants</Form.Label>
//               {users.map((user) => (
//                 <Form.Check
//                   key={user.id}
//                   type="checkbox"
//                   label={user.name}
//                   value={user.id}
//                   onChange={(e) => {
//                     const checked = e.target.checked;
//                     setSelectedParticipants((prev) =>
//                       checked
//                         ? [...prev, user.id]
//                         : prev.filter((id) => id !== user.id)
//                     );
//                   }}
//                 />
//               ))}
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowGroupModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={createGroup}>
//             Create Group
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ChatList;

//User last message time show (16/12/2024) Updated code

import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  Dropdown,
  Modal,
  Button,
  Form,
  Col,
  // InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChatList = ({ setSelectedUser, getUserProfileImage }) => {
  const [users, setUsers] = useState([]); // Stores the list of online users
  const [currentUserData, setCurrentUserData] = useState(null); // Stores current user data
  const [lastMessages, setLastMessages] = useState({}); // Stores last message data (text + timestamp)
  const [showGroupModal, setShowGroupModal] = useState(false); // Modal state for creating groups
  const [groupName, setGroupName] = useState(""); // Group name input state
  const [selectedParticipants, setSelectedParticipants] = useState([]); // Selected participants for group
  const [unreadCounts, setUnreadCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // ✅ New state for search input

  const navigate = useNavigate();

  // Helper function to update the user's online status
  const updateUserStatus = async (status) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, { isOnline: status });
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }
  };

  // Fetch current user data and set online status
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
        }
        await updateUserStatus(true);
      } else {
        console.log("No user is currently logged in.");
      }
    };

    fetchCurrentUser();

    // Subscribe to online users and fetch their last messages
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const onlineUsers = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

      setUsers(onlineUsers);

      // Fetch last messages for online users
      if (auth.currentUser) fetchLastMessages(onlineUsers);
    });

    // Subscribe to auth state changes
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        updateUserStatus(true);
        fetchCurrentUser();
      } else {
        setCurrentUserData(null);
        navigate("/login");
      }
    });

    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, [navigate]);

  // Fetch the last message for each user, including the timestamp
  const fetchLastMessages = async (onlineUsers) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    for (const user of onlineUsers) {
      const q = query(
        collection(db, "chats"),
        where("userId", "in", [currentUser.uid, user.id]),
        orderBy("timestamp", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const lastMessageDoc = querySnapshot.docs[0].data();
        setLastMessages((prevMessages) => ({
          ...prevMessages,
          [user.id]: {
            text: lastMessageDoc.text || "No message",
            timestamp: lastMessageDoc.timestamp?.toDate() || null, // Store timestamp
          },
        }));

        // Count unread messages for the current user (18/12/2024)
        const unreadMessagesQuery = query(
          collection(db, "chats"),
          where("userId", "==", currentUser.uid),
          where("senderId", "==", user.id),
          where("isRead", "==", false)
        );
        const unreadSnapshot = await getDocs(unreadMessagesQuery);
        setUnreadCounts((prevCounts) => ({
          ...prevCounts,
          [user.id]: unreadSnapshot.size, // Update unread message count
        }));
      } else {
        setLastMessages((prevMessages) => ({
          ...prevMessages,
          [user.id]: { text: "No messages yet", timestamp: null },
        }));
      }
    }
  };

  // const fetchLastMessages = async (onlineUsers) => {
  //   const currentUser = auth.currentUser;
  //   if (!currentUser) return;

  //   let messagesData = {}; // Store messages separately

  //   for (const user of onlineUsers) {
  //     // ✅ Create a unique conversation ID (sorted to ensure consistency)
  //     const conversationId =
  //       currentUser.uid < user.id
  //         ? [currentUser.uid, user.id]
  //         : [user.id, currentUser.uid];

  //     // ✅ Fetch the last message between the specific two users
  //     const q = query(
  //       collection(db, "chats"),
  //       where("participants", "array-contains-any", [currentUser.uid, user.id]), // ✅ Fetch messages between these users
  //       orderBy("timestamp", "desc"),
  //       limit(1)
  //     );

  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       const lastMessageDoc = querySnapshot.docs[0].data();
  //       messagesData[user.id] = {
  //         text: lastMessageDoc.text || "No message",
  //         timestamp: lastMessageDoc.timestamp?.toDate() || null,
  //       };
  //     } else {
  //       // ✅ If no messages exist, set default value
  //       messagesData[user.id] = { text: "No messages yet", timestamp: null };
  //     }
  //   }

  //   // ✅ Update last messages for all users properly
  //   setLastMessages(messagesData);
  // };

  // Format the timestamp for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return ""; // Return empty string if no timestamp
    const date = new Date(timestamp);
    const options = { hour: "2-digit", minute: "2-digit" }; // Format: HH:MM AM/PM
    return date.toLocaleTimeString([], options);
  };

  // Handle group creation
  const createGroup = async () => {
    if (!groupName || selectedParticipants.length === 0) {
      alert("Please provide a group name and select participants.");
      return;
    }

    try {
      const groupData = {
        name: groupName,
        participants: [auth.currentUser.uid, ...selectedParticipants],
        createdAt: new Date(),
        createdBy: auth.currentUser.uid,
        participantCount: selectedParticipants.length + 1,
      };

      await addDoc(collection(db, "groups"), groupData);

      // Clear inputs after creation
      setShowGroupModal(false);
      setGroupName("");
      setSelectedParticipants([]);
      alert("Group created successfully!");
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  // Handle user logout
  const logout = async () => {
    try {
      await updateUserStatus(false);
      await auth.signOut();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // ✅ Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list text-white">
      <div className="d-flex justify-content-between align-items-center">
        <Col xs={6} md={4}>
          <h3 className="fw-bold mb-0">Chat</h3>
        </Col>
        {currentUserData && (
          <div className="current-user-profile d-flex align-items-center">
            <span
              className={`status-indicator ${
                currentUserData.isOnline ? "online" : "offline"
              }`}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                marginRight: "8px",
                backgroundColor: currentUserData.isOnline ? "green" : "red",
              }}
            ></span>
            <div style={{ marginRight: "8px" }}>
              {getUserProfileImage(currentUserData.email)}
            </div>
            <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="button"
                bsPrefix="p-2"
                id="dropdown-basic"
                className="text-white fw-bold fs-5"
              >
                &#8942;
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                <Dropdown.Item onClick={() => setShowGroupModal(true)}>
                  Create Group
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>

      <hr />

      {/* ✅ Search Input */}
      <Form className="mb-3 shadow-sm rounded-2" style={{ outline: "none" }}>
        <Form.Control
          className="shadow-none"
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      {/* Render online users with last message and timestamp */}
      {filteredUsers.map((user) => {
        const lastMessage = lastMessages[user.id] || {};
        const unreadCount = unreadCounts[user.id] || 0;

        return (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="chat-item rounded-3 mb-2"
          >
            <div className="chat-item-info d-flex gap-2 ">
              <div style={{ marginLeft: "8px" }}>
                {getUserProfileImage(user.email)}
              </div>

              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 fw-semibold" style={{ fontSize: "16px" }}>
                    {user.name || "Unknown User"}
                  </p>
                  <span
                    className="text-white"
                    style={{ fontSize: "12px", color: "gray" }}
                  >
                    {formatTimestamp(lastMessage.timestamp)}
                  </span>
                </div>

                <p
                  className="text-white-50"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    fontSize: "13px",
                    letterSpacing: "0.7px",
                  }}
                >
                  {lastMessage.text || "No messages yet"}{" "}
                </p>
              </div>
            </div>

            {/* Unread Message Count */}
            {unreadCount > 0 && (
              <span className="unread-count">{unreadCount}</span>
            )}

            {/* <span
              className={`status ${user.isOnline ? "online" : "offline"}`}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: user.isOnline ? "green" : "red",
              }}
            ></span> */}
          </div>
        );
      })}

      <Modal show={showGroupModal} onHide={() => setShowGroupModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Participants</Form.Label>
              {users.map((user) => (
                <Form.Check
                  key={user.id}
                  type="checkbox"
                  label={user.name}
                  value={user.id}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelectedParticipants((prev) =>
                      checked
                        ? [...prev, user.id]
                        : prev.filter((id) => id !== user.id)
                    );
                  }}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGroupModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createGroup}>
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChatList;

//Unread Message Counter show code

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   where,
//   updateDoc,
// } from "firebase/firestore";
// import { writeBatch } from "firebase/firestore";
// import Col from "react-bootstrap/Col";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const [lastMessages, setLastMessages] = useState({});
//   const [unreadCounts, setUnreadCounts] = useState({});
//   const navigate = useNavigate();

//   const updateUserStatus = async (status) => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       try {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         await updateDoc(userDocRef, { isOnline: status });
//       } catch (error) {
//         console.error("Error updating user status:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//         await updateUserStatus(true);
//       } else {
//         console.log("No user is currently logged in.");
//       }
//     };

//     fetchCurrentUser();

//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//       if (auth.currentUser) {
//         fetchLastMessages(onlineUsers);
//         fetchUnreadCounts(onlineUsers);
//       }
//     });

//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (user) {
//         updateUserStatus(true);
//         fetchCurrentUser();
//       } else {
//         setCurrentUserData(null);
//         navigate("/login");
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeAuth();
//     };
//   }, [navigate]);

//   const fetchLastMessages = async (onlineUsers) => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return;

//     for (const user of onlineUsers) {
//       const q = query(
//         collection(db, "chats"),
//         where("participants", "array-contains", currentUser.uid),
//         orderBy("timestamp", "desc"),
//         limit(1)
//       );

//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         const lastMessage = querySnapshot.docs[0].data().text;
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: lastMessage,
//         }));
//       } else {
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: "No messages yet",
//         }));
//       }
//     }
//   };

//   const fetchUnreadCounts = async (onlineUsers) => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return;

//     const unreadCountsTemp = {};
//     for (const user of onlineUsers) {
//       const q = query(
//         collection(db, "chats"),
//         where("receiverId", "==", currentUser.uid),
//         where("senderId", "==", user.id),
//         where("isRead", "==", false) // Only unread messages
//       );

//       const querySnapshot = await getDocs(q);
//       unreadCountsTemp[user.id] = querySnapshot.size; // Count unread messages
//     }
//     setUnreadCounts(unreadCountsTemp);
//   };

//   const markMessagesAsRead = async (selectedUser) => {
//     const currentUser = auth.currentUser;
//     if (!currentUser || !selectedUser) return;

//     try {
//       // Create a batch instance
//       const batch = writeBatch(db);

//       // Query for unread messages
//       const q = query(
//         collection(db, "chats"),
//         where("receiverId", "==", currentUser.uid),
//         where("senderId", "==", selectedUser.id),
//         where("isRead", "==", false)
//       );

//       const querySnapshot = await getDocs(q);

//       // Add each message to the batch for updating
//       querySnapshot.forEach((doc) => {
//         const messageRef = doc.ref;
//         batch.update(messageRef, { isRead: true });
//       });

//       // Commit the batch
//       await batch.commit();
//       console.log("All messages marked as read.");
//     } catch (error) {
//       console.error("Error marking messages as read:", error);
//     }
//   };

//   const handleUserClick = (user) => {
//     setSelectedUser(user);
//     markMessagesAsRead(user); // Mark messages as read
//     setUnreadCounts((prevCounts) => ({ ...prevCounts, [user.id]: 0 })); // Reset unread count
//   };

//   const logout = async () => {
//     try {
//       await updateUserStatus(false);
//       await auth.signOut();
//       navigate("/", { replace: true });
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <Col xs={6} md={4}>
//           <h3 className="fw-bold">Whatsapp</h3>
//         </Col>

//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <img
//               src={
//                 localStorage.getItem("profileImage") || "/default-profile.jpg"
//               }
//               alt="Profile"
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 marginRight: "8px",
//               }}
//             />
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
//           </div>
//         )}
//       </div>

//       <hr />

//       {users.map((user) => {
//         const userImage = localStorage.getItem(`profileImage_${user.id}`);
//         return (
//           <div
//             key={user.id}
//             onClick={() => handleUserClick(user)}
//             className="chat-item"
//           >
//             <div className="chat-item-info">
//               <p>{user.name || "Unknown User"}</p>
//               <p>{lastMessages[user.id] || "No messages yet"}</p>
//               {unreadCounts[user.id] > 0 && (
//                 <span className="badge bg-danger ms-2">
//                   {unreadCounts[user.id]} new
//                 </span>
//               )}
//             </div>
//             <img
//               src={userImage || "/default-profile.jpg"}
//               alt="User Profile"
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 marginLeft: "8px",
//               }}
//             />
//           </div>
//         );
//       })}

//       <button
//         className="logout-btn log-out position-absolute px-3 rounded-3 text-bg-danger"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;
