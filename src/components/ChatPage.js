// // ChatPage.js
// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebaseConfig";
// import { updateDoc, doc } from "firebase/firestore";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";

// const ChatPage = () => {
//   useEffect(() => {
//     // Check if the user is logged in
//     const user = auth.currentUser;
//     if (user) {
//       ChatList(user.uid, true); // Set user status to online
//     }

//     // Set user offline on component unmount or logout
//     return () => {
//       if (auth.currentUser) {
//         ChatList(auth.currentUser.uid, false); // Set user status to offline
//       }
//     };
//   }, []);

//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     const setStatusOnline = async () => {
//       await updateDoc(doc(db, "users", auth.currentUser.uid), {
//         isOnline: true,
//       });
//     };

//     const setStatusOffline = async () => {
//       await updateDoc(doc(db, "users", auth.currentUser.uid), {
//         isOnline: false,
//       });
//     };

//     setStatusOnline();
//     window.addEventListener("beforeunload", setStatusOffline);

//     return () => {
//       setStatusOffline();
//       window.removeEventListener("beforeunload", setStatusOffline);
//     };
//   }, []);

//   return (
//     <div className="chat-page">
//       <ChatList setSelectedUser={setSelectedUser} />
//       {selectedUser && <MessageArea selectedUser={selectedUser} />}
//     </div>
//   );
// };

// export default ChatPage;

//this old code that user is without login enter the chat room page that's call Error

// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebaseConfig";
// import { updateDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import "./ChatPage.css";
// import MessageArea from "./MessageArea";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null); // Track the current user

//   useEffect(() => {
//     // Listen to authentication state changes
//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user); // Set the logged-in user
//         setStatusOnline(user.uid); // Set user status to online
//       } else {
//         setCurrentUser(null); // Reset if no user is logged in
//       }
//     });

//     // Cleanup on component unmount
//     return () => {
//       unsubscribeAuth();
//       if (currentUser) {
//         setStatusOffline(currentUser.uid); // Set user offline on unmount
//       }
//     };
//   }, [currentUser]);

//   // Helper functions for setting online/offline status
//   const setStatusOnline = async (uid) => {
//     await updateDoc(doc(db, "users", uid), {
//       isOnline: true,
//     });
//   };

//   const setStatusOffline = async (uid) => {
//     await updateDoc(doc(db, "users", uid), {
//       isOnline: false,
//     });
//   };

//   useEffect(() => {
//     // Handle setting user offline before window unload
//     const handleBeforeUnload = () => {
//       if (currentUser) {
//         setStatusOffline(currentUser.uid);
//       }
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [currentUser]);

//   return (
//     <div className="chat-page">
//       <ChatList setSelectedUser={setSelectedUser} />
//       {selectedUser && <MessageArea selectedUser={selectedUser} />}
//     </div>
//   );
// };

// export default ChatPage;

//new code this User is Anonymus enter without login error fix

// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate } from "react-router-dom";
// import "./ChatPage.css";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to check if the user has a complete profile
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           // Redirect to profile completion page if profile is incomplete
//           navigate("/");
//         }
//       }
//     };

//     // Listen to authentication state changes
//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user); // Set the logged-in user
//         checkUserProfile(user); // Check user profile
//       } else {
//         setCurrentUser(null); // Reset if no user is logged in
//       }
//     });

//     // Cleanup on component unmount
//     return () => {
//       unsubscribeAuth();
//     };
//   }, [navigate]);

//   return (
//     <div className="chat-page">
//       {currentUser ? (
//         <>
//           <ChatList setSelectedUser={setSelectedUser} />
//           {selectedUser && <MessageArea selectedUser={selectedUser} />}
//         </>
//       ) : (
//         <p>Please log in to access the chat.</p>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate } from "react-router-dom";
// import "./ChatPage.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to check if the user has a complete profile
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         // Check if user data exists and has the required fields
//         if (!userData.name || !userData.email) {
//           // Redirect to profile completion page if profile is incomplete
//           navigate("/profile-completion");
//         }
//       } else {
//         // Handle case where user data is missing
//         navigate("/profile-completion");
//       }
//     };

//     // Listen to authentication state changes
//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user); // Set the logged-in user
//         checkUserProfile(user); // Check user profile data in Firestore
//       } else {
//         setCurrentUser(null); // Reset if no user is logged in
//         navigate("/login"); // Redirect to login page if not authenticated
//       }
//     });

//     // Cleanup on component unmount
//     return () => {
//       unsubscribeAuth();
//     };
//   }, [navigate]);

//   return (
//     <div className="chat-page">
//       {currentUser ? (
//         <>
//           <ChatList setSelectedUser={setSelectedUser} />
//           {selectedUser && <MessageArea selectedUser={selectedUser} />}
//         </>
//       ) : (
//         // <p>Please log in to access the chat.</p>

//         <Spinner className="" animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

//This Code is User Not select other user so then show Placeholder message

// ChatPage.js
// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           navigate("/profile-completion");
//         }
//       } else {
//         navigate("/profile-completion");
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         checkUserProfile(user);
//       } else {
//         setCurrentUser(null);
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth();
//   }, [navigate]);

//   return (
//     <div className="chat-page">
//       {currentUser ? (
//         <>
//           <ChatList setSelectedUser={setSelectedUser} />
//           {selectedUser ? (
//             <MessageArea selectedUser={selectedUser} />
//           ) : (
//             <div className="message-area">
//               <div
//                 className="placeholder-message"
//                 style={{ textAlign: "center", paddingTop: "20%" }}
//               >
//                 <h2>WhatsApp for Web</h2>
//                 <p>
//                   Send and receive messages without keeping your phone online.
//                 </p>
//                 <p>
//                   Use WhatsApp on up to 4 linked devices and 1 phone at the same
//                   time.
//                 </p>
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

//If i refresh page navigate to Chatlist not stay in messageArea
// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Prevent page refresh
//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = ""; // This is required for some browsers to display the warning
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   useEffect(() => {
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           navigate("/profile-completion");
//         }
//       } else {
//         navigate("/profile-completion");
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         checkUserProfile(user);
//       } else {
//         setCurrentUser(null);
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth();
//   }, [navigate]);

//   return (
//     <div className="chat-page d-flex flex-column">
//       {currentUser ? (
//         <>
//           {/* Chat List */}
//           <div
//             className="chat-list-container"
//             style={{
//               display: selectedUser ? "none" : "block", // Hide ChatList when MessageArea is shown
//               width: "100%",
//             }}
//           >
//             <ChatList setSelectedUser={setSelectedUser} />
//           </div>

//           {/* Message Area */}
//           <div
//             className="message-area-container"
//             style={{
//               display: selectedUser ? "block" : "none", // Show MessageArea only when a user is selected
//               width: "100%",
//             }}
//           >
//             {selectedUser ? (
//               <MessageArea
//                 selectedUser={selectedUser}
//                 setSelectedUser={setSelectedUser}
//               />
//             ) : null}
//           </div>
//         </>
//       ) : (
//         <div className="loading-spinner text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

//This code is Refresh page so refreshing after stay in user messageArea dahsboard
// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(
//     JSON.parse(localStorage.getItem("selectedUser")) || null
//   );
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           navigate("/profile-completion");
//         }
//       } else {
//         navigate("/profile-completion");
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         checkUserProfile(user);
//       } else {
//         setCurrentUser(null);
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth();
//   }, [navigate]);

//   // Persist selectedUser to localStorage whenever it changes
//   useEffect(() => {
//     if (selectedUser) {
//       localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
//     } else {
//       localStorage.removeItem("selectedUser");
//     }
//   }, [selectedUser]);

//   return (
//     <div className="chat-page d-flex flex-column">
//       {currentUser ? (
//         <>
//           {/* Chat List */}
//           <div
//             className="chat-list-container"
//             style={{
//               display: selectedUser ? "none" : "block", // Hide ChatList when MessageArea is shown
//               width: "100%",
//             }}
//           >
//             <ChatList setSelectedUser={setSelectedUser} />
//           </div>

//           {/* Message Area */}
//           <div
//             className="message-area-container"
//             style={{
//               display: selectedUser ? "block" : "none", // Show MessageArea only when a user is selected
//               width: "100%",
//             }}
//           >
//             {selectedUser ? (
//               <MessageArea
//                 selectedUser={selectedUser}
//                 setSelectedUser={setSelectedUser}
//               />
//             ) : null}
//           </div>
//         </>
//       ) : (
//         <div className="loading-spinner text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const { userId } = useParams(); // Use URL parameter for userId
//   const [selectedUser, setSelectedUser] = useState(
//     JSON.parse(localStorage.getItem("selectedUser")) || null
//   );
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("currentUser")) || null // Retrieve currentUser from localStorage
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to check user profile
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           navigate("/profile-completion");
//         }
//       } else {
//         navigate("/profile-completion");
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         localStorage.setItem("currentUser", JSON.stringify(user)); // Save user to localStorage
//         checkUserProfile(user);
//         if (!userId || userId !== user.uid) {
//           navigate(`/chat/${user.uid}`); // Redirect to correct userId if the URL doesn't match
//         }
//       } else {
//         setCurrentUser(null);
//         localStorage.removeItem("currentUser"); // Remove user from localStorage
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth(); // Clean up the auth listener on unmount
//   }, [navigate, userId]);

//   // Persist selectedUser to localStorage whenever it changes
//   useEffect(() => {
//     if (selectedUser) {
//       localStorage.setItem("selectedUser", JSON.stringify(selectedUser)); // Save selectedUser to localStorage
//     } else {
//       localStorage.removeItem("selectedUser"); // Remove selectedUser from localStorage
//     }
//   }, [selectedUser]);

//   return (
//     <div className="chat-page d-flex flex-column">
//       {currentUser ? (
//         <>
//           {/* Chat List */}
//           <div
//             className="chat-list-container"
//             style={{
//               display: selectedUser ? "none" : "block", // Hide ChatList when MessageArea is shown
//               width: "100%",
//             }}
//           >
//             <ChatList setSelectedUser={setSelectedUser} />
//           </div>

//           {/* Message Area */}
//           <div
//             className="message-area-container"
//             style={{
//               display: selectedUser ? "block" : "none", // Show MessageArea only when a user is selected
//               width: "100%",
//             }}
//           >
//             {selectedUser ? (
//               <MessageArea
//                 selectedUser={selectedUser}
//                 setSelectedUser={setSelectedUser}
//               />
//             ) : null}
//           </div>
//         </>
//       ) : (
//         <div className="loading-spinner text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

//Notifation Add Responsive UI and Typing effect created 22/02/2025

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import {
//   getDoc,
//   doc,
//   onSnapshot,
//   updateDoc,
//   arrayRemove,
// } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";
// import { useLocation } from "react-router-dom";

// const ChatPage = () => {
//   const { userId } = useParams(); // Use URL parameter for userId
//   const [selectedUser, setSelectedUser] = useState(
//     JSON.parse(localStorage.getItem("selectedUser")) || null
//   );
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("currentUser")) || null
//   );
//   const navigate = useNavigate();

//   const location = useLocation();
//   const successMessage = location.state?.successMessage || null; // Retrieve success message from state
//   const [showToast, setShowToast] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           navigate("/profile-completion");
//         }
//       } else {
//         navigate("/profile-completion");
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         localStorage.setItem("currentUser", JSON.stringify(user));
//         checkUserProfile(user);
//         if (!userId || userId !== user.uid) {
//           navigate(`/chat/${user.uid}`);
//         }
//       } else {
//         setCurrentUser(null);
//         localStorage.removeItem("currentUser");
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth();
//   }, [navigate, userId]);

//   useEffect(() => {
//     if (successMessage) {
//       setShowToast(true);
//       const timer = setTimeout(() => {
//         setShowToast(false);
//       }, 3000); // Close toast after 3 seconds

//       return () => clearTimeout(timer); // Cleanup timeout on component unmount
//     }
//   }, [successMessage]);

//   useEffect(() => {
//     if (currentUser) {
//       const notificationRef = doc(db, "notifications", currentUser.uid);

//       const unsubscribe = onSnapshot(notificationRef, (docSnap) => {
//         if (docSnap.exists()) {
//           const notifications = docSnap.data().messages || [];

//           if (notifications.length > 0) {
//             const latestNotification = notifications[notifications.length - 1];
//             alert(
//               `New message from ${latestNotification.senderName}: ${latestNotification.text}`
//             );

//             // Remove the displayed notification
//             updateDoc(notificationRef, {
//               messages: arrayRemove(latestNotification),
//             });
//           }
//         }
//       });

//       return () => unsubscribe();
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     // Get the success message from sessionStorage
//     const successMessage = sessionStorage.getItem("successMessage");

//     if (successMessage) {
//       setMessage(successMessage);
//       setShowToast(true);
//       sessionStorage.removeItem("successMessage"); // Remove message after it's shown

//       // Hide the toast after 3 seconds
//       setTimeout(() => {
//         console.log("Hiding toast after 3 seconds");
//         setShowToast(false);
//       }, 3000);
//     }
//   }, []);

//   // ✅ Fix: Persist selected user after page refresh
//   useEffect(() => {
//     if (selectedUser) {
//       localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
//     }
//   }, [selectedUser]);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("selectedUser");
//     if (storedUser) {
//       setSelectedUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const isMobile = window.innerWidth <= 600;

//   // Generate user's profile image with initials
//   const getUserProfileImage = (email) => {
//     const firstLetter = email.charAt(0).toUpperCase();
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
//     <div className="chat-page bg-dark px-0 container-fluid">
//       {currentUser ? (
//         <div className="d-flex flex-wrap">
//           {/* Chat List */}
//           <div
//             className="col-12 col-md-4"
//             // style={{ maxWidth: "25%", minWidth: "280px" }}
//             style={{
//               display: isMobile && selectedUser ? "none" : "block",
//               // width: "100%",
//             }}
//           >
//             <ChatList
//               setSelectedUser={setSelectedUser}
//               getUserProfileImage={getUserProfileImage}
//             />
//           </div>

//           {/* Message Area */}
//           <div
//             className="col-12 col-md-8 message-area-container"
//             // style={{ flexGrow: 1 }}
//             style={{
//               flexGrow: 1,
//               display: isMobile && !selectedUser ? "none" : "block",
//               // width: "100%",
//             }}
//           >
//             {selectedUser ? (
//               <MessageArea
//                 selectedUser={selectedUser}
//                 setSelectedUser={setSelectedUser}
//                 getUserProfileImage={getUserProfileImage}
//               />
//             ) : (
//               <div
//                 className="d-flex flex-column align-items-center justify-content-center text-center"
//                 style={{ height: "100%", color: "#aaa" }}
//               >
//                 <i
//                   className="fa-brands fa-whatsapp"
//                   style={{ fontSize: "60px", marginBottom: "10px" }}
//                 ></i>
//                 <h4>Start a Chat</h4>
//                 <p>
//                   Send and receive messages without keeping your phone online.
//                 </p>
//                 <p>Use this chat on multiple devices at the same time.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className="loading-spinner text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}

//       {/* Toast Message */}
//       {showToast && message && (
//         <div
//           className="d-flex align-items-center text-bg-success rounded-5 translate-middle-x m-3 show-mobile"
//           role="alert"
//           aria-live="assertive"
//           aria-atomic="true"
//         >
//           <div className="toast-body">{message}</div>
//           <button
//             type="button"
//             className="btn-close btn-close-white me-2 m-auto"
//             style={{ fontSize: "14px" }}
//             aria-label="Close"
//             onClick={() => setShowToast(false)}
//           ></button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

//23/02/2025

import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { onSnapshot, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ChatList from "./UserList";
import MessageArea from "./MessageArea";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

const ChatPage = () => {
  const { userId } = useParams();
  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem("selectedUser")) || null
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage || null;
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  // Listen to auth state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        if (!userId || userId !== user.uid) {
          navigate(`/chat/${user.uid}`);
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
        navigate("/");
      }
    });

    return () => unsubscribeAuth();
  }, [navigate, userId]);

  // Show success toast if available
  useEffect(() => {
    if (successMessage) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Notifications listener
  useEffect(() => {
    if (currentUser) {
      const notificationRef = doc(db, "notifications", currentUser.uid);

      const unsubscribe = onSnapshot(notificationRef, (docSnap) => {
        if (docSnap.exists()) {
          const notifications = docSnap.data().messages || [];

          if (notifications.length > 0) {
            const latestNotification = notifications[notifications.length - 1];
            alert(
              `New message from ${latestNotification.senderName}: ${latestNotification.text}`
            );

            updateDoc(notificationRef, {
              messages: arrayRemove(latestNotification),
            });
          }
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  // Show session success message
  useEffect(() => {
    const successMessage = sessionStorage.getItem("successMessage");

    if (successMessage) {
      setMessage(successMessage);
      setShowToast(true);
      sessionStorage.removeItem("successMessage");
      setTimeout(() => setShowToast(false), 3000);
    }
  }, []);

  // Persist selected user after refresh
  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    }
  }, [selectedUser]);

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser));
    }
  }, []);

  const isMobile = window.innerWidth <= 600;

  // Profile image placeholder
  const getUserProfileImage = (email) => {
    const firstLetter = email?.charAt(0).toUpperCase() || "?"; // Use '?' if email is missing
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "rgb(224, 231, 255, 1)",
          color: "#4f46e5",
          fontWeight: "bold",
        }}
      >
        {firstLetter}
      </div>
    );
  };

  return (
    <div className="chat-page bg-dark px-0 container-fluid">
      {currentUser ? (
        <div className="d-flex flex-wrap">
          <div
            className="col-12 col-md-4 col-xl-3"
            style={{
              display: isMobile && selectedUser ? "none" : "block",
              paddingRight: "1px",
            }}
          >
            <ChatList
              setSelectedUser={setSelectedUser}
              getUserProfileImage={getUserProfileImage}
            />
          </div>

          <div
            className="col-12 col-md-8 col-xl-9 message-area-container"
            style={{
              flexGrow: 1,
              display: isMobile && !selectedUser ? "none" : "block",
            }}
          >
            {selectedUser ? (
              <MessageArea
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                getUserProfileImage={getUserProfileImage}
              />
            ) : (
              <div
                className="d-flex flex-column align-items-center justify-content-center text-center"
                style={{ height: "100%", color: "#aaa" }}
              >
                <i
                  className="fa-brands fa-whatsapp"
                  style={{ fontSize: "60px", marginBottom: "10px" }}
                ></i>
                <h4>Start a Chat</h4>
                <p>
                  Send and receive messages without keeping your phone online.
                </p>
                <p>Use this chat on multiple devices at the same time.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loading-spinner text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {showToast && message && (
        <div
          className="d-flex align-items-center text-bg-success rounded-5 translate-middle-x m-3 show-mobile"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            style={{ fontSize: "14px" }}
            aria-label="Close"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const { userId } = useParams(); // Get userId from the URL
//   const [selectedUser, setSelectedUser] = useState(
//     JSON.parse(localStorage.getItem("selectedUser")) || null
//   );
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("currentUser")) || null
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUserProfile = async (user) => {
//       try {
//         const userDocRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(userDocRef);

//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           if (!userData.name || !userData.email) {
//             navigate("/profile-completion");
//           }
//         } else {
//           navigate("/profile-completion");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser({ uid: user.uid });
//         localStorage.setItem("currentUser", JSON.stringify({ uid: user.uid }));

//         checkUserProfile(user);

//         // If the URL doesn't match the current user's ID, update it
//         if (!userId || userId !== user.uid) {
//           navigate(`/chat/${user.uid}`);
//         }
//       } else {
//         setCurrentUser(null);
//         localStorage.removeItem("currentUser");
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth();
//   }, [navigate, userId]);

//   // Persist selectedUser to localStorage whenever it changes
//   useEffect(() => {
//     if (selectedUser) {
//       localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
//     } else {
//       localStorage.removeItem("selectedUser");
//     }
//   }, [selectedUser]);

//   return (
//     <div className="chat-page d-flex flex-column">
//       {currentUser ? (
//         <>
//           <div
//             className="chat-list-container"
//             style={{
//               display: selectedUser ? "none" : "block",
//               width: "100%",
//             }}
//           >
//             <ChatList setSelectedUser={setSelectedUser} />
//           </div>

//           <div
//             className="message-area-container"
//             style={{
//               display: selectedUser ? "block" : "none",
//               width: "100%",
//             }}
//           >
//             {selectedUser ? (
//               <MessageArea
//                 selectedUser={selectedUser}
//                 setSelectedUser={setSelectedUser}
//               />
//             ) : (
//               <p className="text-center">
//                 Please select a user to start chatting!
//               </p>
//             )}
//           </div>
//         </>
//       ) : (
//         <div className="loading-spinner text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;
