// import React, { useState, useEffect } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import { auth } from "../firebaseConfig";
// import "../App.css";

// const MessageArea = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   // Fetch messages from Firestore
//   useEffect(() => {
//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(snapshot.docs.map((doc) => doc.data()));
//     });

//     return () => unsubscribe();
//   }, [selectedUser]);

//   // Send message to Firestore
//   const sendMessage = async () => {
//     if (message.trim()) {
//       await addDoc(collection(db, "chats"), {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       });
//       setMessage(""); // Clear the message input after sending
//     }
//   };

//   // Handle "Enter" key press
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="message-area">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.text}</p>
//           </div>
//         ))}
//       </div>
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={handleKeyPress} // Handle Enter key press
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

// start Autoscroll funtionality add

// import React, { useState, useEffect, useRef } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import { auth } from "../firebaseConfig";
// import "../App.css";

// const MessageArea = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const messagesEndRef = useRef(null); // Ref to track end of messages for auto-scroll

//   // Fetch messages from Firestore
//   useEffect(() => {
//     if (!selectedUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => doc.data())
//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser.uid)
//           )
//       );
//     });

//     return () => unsubscribe();
//   }, [selectedUser]);

//   // Auto-scroll to bottom when messages update or selected user changes
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, selectedUser]);

//   // Function to scroll to bottom of messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Send message to Firestore
//   const sendMessage = async () => {
//     if (message.trim()) {
//       await addDoc(collection(db, "chats"), {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       });
//       setMessage(""); // Clear the message input after sending
//     }
//   };

//   // Handle "Enter" key press
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="message-area">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.text}</p>
//           </div>
//         ))}
//         {/* Empty div at the bottom to scroll into view */}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={handleKeyPress} // Handle Enter key press
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

// UPDATED CODE start Autoscroll funtionality add

// import React, { useState, useEffect, useRef } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   deleteDoc,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { auth } from "../firebaseConfig";
// import { Dropdown } from "react-bootstrap"; // Import Bootstrap's Dropdown component
// import "../App.css";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

// const MessageArea = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   // Fetch messages from Firestore
//   useEffect(() => {
//     if (!selectedUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser.uid)
//           )
//       );
//     });

//     return () => unsubscribe();
//   }, [selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, selectedUser]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (message.trim()) {
//       await addDoc(collection(db, "chats"), {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       });
//       setMessage("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   // Clear chat function
//   const clearChat = async () => {
//     try {
//       // Query for messages between current user and selected user
//       const q = query(
//         collection(db, "chats"),
//         where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
//         where("userId", "in", [auth.currentUser.uid, selectedUser.id])
//       );
//       const snapshot = await getDocs(q);

//       // Delete each message
//       const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
//       await Promise.all(batchDelete);

//       setMessages([]); // Clear messages from the state
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//     }
//   };

//   return (
//     <div className="message-area">
//       {/* Top bar with three-dot dropdown menu */}
//       <div className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom">
//         <h2>Chat with {selectedUser?.name}</h2>

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="button"
//             bsPrefix="p-2"
//             id="dropdown-basic"
//             className="text-black fw-bold fs-5"
//           >
//             &#8942; {/* Three-dot icon */}
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {/* Messages display */}
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.text}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message input area */}
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={handleKeyPress}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

//TYPING EFFECT ADD in THIS CODE UPDATED CODE But ERROR:- Cannot read properties of null (reading 'uid')

// import React, { useState, useEffect, useRef } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   deleteDoc,
//   where,
//   getDocs,
//   setDoc,
//   doc,
// } from "firebase/firestore";
// import { auth } from "../firebaseConfig";
// import { Dropdown } from "react-bootstrap";
// import "../App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MessageArea = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [otherUserTyping, setOtherUserTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Fetch messages from Firestore
//   useEffect(() => {
//     if (!selectedUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser.uid)
//           )
//       );
//     });

//     // Listen to typing status of the other user
//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${selectedUser.id}_${auth.currentUser.uid}`
//     );
//     const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setOtherUserTyping(docSnap.data().isTyping);
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeTyping();
//     };
//   }, [selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (message.trim()) {
//       await addDoc(collection(db, "chats"), {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       });
//       setMessage("");
//       updateTypingStatus(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);

//     // Update typing status if there is text in the input field
//     if (e.target.value.trim()) {
//       if (!isTyping) {
//         updateTypingStatus(true);
//       }
//     } else {
//       // If the message box is cleared, stop typing status
//       updateTypingStatus(false);
//     }
//   };

//   const updateTypingStatus = async (status) => {
//     setIsTyping(status);
//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${auth.currentUser.uid}_${selectedUser.id}`
//     );
//     await setDoc(typingStatusRef, { isTyping: status }, { merge: true });
//   };

//   // Clear chat function
//   const clearChat = async () => {
//     try {
//       const q = query(
//         collection(db, "chats"),
//         where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
//         where("userId", "in", [auth.currentUser.uid, selectedUser.id])
//       );
//       const snapshot = await getDocs(q);

//       const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
//       await Promise.all(batchDelete);

//       setMessages([]);
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//     }
//   };

//   return (
//     <div className="message-area rounded-0">
//       {/* Top bar with three-dot dropdown menu */}
//       <div
//         className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom"
//         style={{ backgroundColor: "#075e54" }}
//       >
//         {selectedUser && (
//           <div className="current-user-profile align-items-center">
//             <h2 className="text-white">{selectedUser?.name}</h2>
//             <span className="ms-2 text-white">
//               {selectedUser.isOnline ? "Online" : "Offline"}
//             </span>
//           </div>
//         )}

//         {/* <span
//           className={`status-indicator ${
//             selectedUser.isOnline ? "online" : "offline"
//           }`}
//           style={{
//             width: "10px",
//             height: "10px",
//             borderRadius: "50%",
//             marginRight: "8px",
//             backgroundColor: selectedUser.isOnline ? "green" : "red",
//           }}
//         ></span> */}

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="button"
//             bsPrefix="p-2"
//             id="dropdown-basic"
//             className="text-white fw-bold fs-5"
//           >
//             &#8942;
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {/* Messages display */}
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <p className="mb-0">{msg.text}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Typing indicator */}
//       {otherUserTyping && (
//         <div className="typing-indicator">The other user is typing...</div>
//       )}

//       {/* Message input area */}
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyPress}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

//Responsive FOR Mobile VIEW ONLY  //Cannot read properties of null (reading 'uid')

// import React, { useState, useEffect, useRef } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   deleteDoc,
//   where,
//   getDocs,
//   setDoc,
//   doc,
// } from "firebase/firestore";
// import { auth } from "../firebaseConfig";
// import { Dropdown } from "react-bootstrap";
// import "../App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MessageArea = ({ selectedUser, setSelectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [otherUserTyping, setOtherUserTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   const goBack = () => {
//     setSelectedUser(null); // Reset the selected user to return to ChatList
//   };

//   // Prevent page refresh
//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = ""; // Standard way of showing confirmation on page reload
//     };

//     // Attach the event listener
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     // Clean up the event listener when the component is unmounted
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   // Fetch messages from Firestore
//   useEffect(() => {
//     if (!selectedUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))

//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser.uid)
//           )
//       );
//     });

//     // Listen to typing status of the other user
//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${selectedUser.id}_${auth.currentUser.uid}`
//     );
//     const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setOtherUserTyping(docSnap.data().isTyping);
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeTyping();
//     };
//   }, [selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (message.trim()) {
//       await addDoc(collection(db, "chats"), {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       });
//       setMessage("");
//       updateTypingStatus(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);

//     // Update typing status if there is text in the input field
//     if (e.target.value.trim()) {
//       if (!isTyping) {
//         updateTypingStatus(true);
//       }
//     } else {
//       // If the message box is cleared, stop typing status
//       updateTypingStatus(false);
//     }
//   };

//   const updateTypingStatus = async (status) => {
//     setIsTyping(status);
//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${auth.currentUser.uid}_${selectedUser.id}`
//     );
//     await setDoc(typingStatusRef, { isTyping: status }, { merge: true });
//   };

//   // Clear chat function
//   const clearChat = async () => {
//     try {
//       const q = query(
//         collection(db, "chats"),
//         where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
//         where("userId", "in", [auth.currentUser.uid, selectedUser.id])
//       );
//       const snapshot = await getDocs(q);

//       const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
//       await Promise.all(batchDelete);

//       setMessages([]);
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//     }
//   };

//   return (
//     <div className="message-area ms-auto rounded-0">
//       {/* Top bar with three-dot dropdown menu */}
//       <div
//         className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom"
//         style={{ backgroundColor: "#075e54" }}
//       >
//         {selectedUser && (
//           <div className="current-user-profile align-items-center">
//             <div className="d-flex align-items-center">
//               <div>
//                 <button
//                   onClick={goBack}
//                   style={{
//                     display: "block",
//                     marginBottom: "10px",
//                     backgroundColor: "transparent",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   <i className="fa-solid fa-circle-arrow-left fs-5 me-1"></i>
//                 </button>
//               </div>
//               <div>
//                 <h2 className="text-white mb-0">{selectedUser?.name}</h2>
//                 <span className="ms-2 text-white" style={{ fontSize: "13px" }}>
//                   {selectedUser.isOnline ? "Online" : "Offline"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="button"
//             bsPrefix="p-2"
//             id="dropdown-basic"
//             className="text-white fw-bold fs-5"
//           >
//             &#8942;
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {/* Messages display */}
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <p className="mb-0">{msg.text}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Typing indicator */}
//       {otherUserTyping && (
//         <div className="typing-indicator">The other user is typing...</div>
//       )}

//       {/* Message input area */}
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyPress}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

//Popup message Show sender and reciever side 05/12/2024

import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  where,
  getDocs,
  setDoc,
  doc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { Dropdown, Image } from "react-bootstrap";
import "../App.css";
import sendIcon from "./images/send.png";
import "bootstrap/dist/css/bootstrap.min.css";

const MessageArea = ({
  selectedUser,
  setSelectedUser,
  getUserProfileImage,
}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  const goBack = () => {
    setSelectedUser(null); // Reset the selected user to return to ChatList
    localStorage.removeItem("selectedUser"); // Remove it so it's reset when user goes
  };

  // useEffect(() => {
  //   // Request notification permission when component mounts
  //   // if (auth.currentUser) {
  //   //   requestNotificationPermission(); // Request notification permission
  //   // }

  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = ""; // Prevent page refresh
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [selectedUser]);

  // useEffect(() => {
  //   if (!selectedUser || !auth.currentUser) return;

  //   const q = query(collection(db, "chats"), orderBy("timestamp"));

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     setMessages(
  //       snapshot.docs
  //         .map((doc) => ({ id: doc.id, ...doc.data() }))
  //         .filter(
  //           (msg) =>
  //             (msg.senderId === auth.currentUser?.uid &&
  //               msg.userId === selectedUser.id) ||
  //             (msg.senderId === selectedUser.id &&
  //               msg.userId === auth.currentUser?.uid)
  //         )
  //     );
  //   });

  //   const typingStatusRef = doc(
  //     db,
  //     "typingStatus",
  //     `${selectedUser.id}_${auth.currentUser?.uid}`
  //   );
  //   const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
  //     if (docSnap.exists()) {
  //       setOtherUserTyping(docSnap.data().isTyping);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //     unsubscribeTyping();
  //   };
  // }, [selectedUser]);

  //(18/12/2024)
  useEffect(() => {
    if (!selectedUser || !auth.currentUser) return;

    const q = query(collection(db, "chats"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update read status for messages sent by the selected user to the current user
      const unreadMessages = messagesData.filter(
        (msg) =>
          msg.senderId === selectedUser.id &&
          msg.userId === auth.currentUser.uid &&
          !msg.isRead
      );

      if (unreadMessages.length > 0) {
        const batchUpdate = unreadMessages.map((msg) => {
          const msgRef = doc(db, "chats", msg.id);
          return updateDoc(msgRef, { isRead: true });
        });
        await Promise.all(batchUpdate);
      }

      setMessages(
        messagesData.filter(
          (msg) =>
            (msg.senderId === auth.currentUser.uid &&
              msg.userId === selectedUser.id) ||
            (msg.senderId === selectedUser.id &&
              msg.userId === auth.currentUser.uid)
        )
      );
    });

    const typingStatusRef = doc(
      db,
      "typingStatus",
      `${selectedUser.id}_${auth.currentUser?.uid}`
    );
    const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
      if (docSnap.exists()) {
        setOtherUserTyping(docSnap.data().isTyping);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeTyping();
    };
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (message.trim() && auth.currentUser) {
      const newMessage = {
        text: message,
        userId: selectedUser.id,
        senderId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        isRead: false,
      };

      // Save the message in Firestore
      await addDoc(collection(db, "chats"), newMessage);

      // Send push notification
      const notificationRef = doc(db, "notifications", selectedUser.id);
      await setDoc(
        notificationRef,
        {
          messages: arrayUnion({
            text: message,
            senderId: auth.currentUser.uid,
            senderName: auth.currentUser.displayName || "Anonymous",
            timestamp: new Date(),
          }),
        },
        { merge: true }
      );

      // Send a push notification to the recipient (if their token exists)
      const recipientDocRef = doc(db, "users", selectedUser.id);
      const recipientSnapshot = await getDoc(recipientDocRef); // Fixed missing getDoc import
      const recipientData = recipientSnapshot.data();
      const recipientToken = recipientData?.fcmToken;

      if (recipientToken) {
        const payload = {
          notification: {
            title: `${auth.currentUser.displayName} sent you a message`,
            body: message,
          },
          token: recipientToken,
        };
        // Send notification
        await sendPushNotification(payload);
      }

      setMessage("");
      updateTypingStatus(false);
    }
  };

  const sendPushNotification = async (payload) => {
    // Logic to send push notification using FCM
    try {
      await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `BKSGTotW4YVLXEvvbkGDpLaQhWnw-_vd75zprPpxXlwu7Bj02o7L2b_574rqLIepAhChL8Ty4p8TEnyrdzO8rkA`, // Replace with your Firebase server key
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter" && message.trim()) {
  //     sendMessage();
  //   }
  // };

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    if (e.target.value.trim()) {
      if (!isTyping) {
        updateTypingStatus(true);
      }
    } else {
      updateTypingStatus(false);
    }
  };

  const updateTypingStatus = async (status) => {
    setIsTyping(status);
    if (!auth.currentUser) return;

    const typingStatusRef = doc(
      db,
      "typingStatus",
      `${auth.currentUser.uid}_${selectedUser.id}`
    );
    await setDoc(typingStatusRef, { isTyping: status }, { merge: true });
  };

  const clearChat = async () => {
    try {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "chats"),
        where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
        where("userId", "in", [auth.currentUser.uid, selectedUser.id])
      );
      const snapshot = await getDocs(q);

      const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(batchDelete);

      setMessages([]);
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };

  const startEditing = (msgId, currentText) => {
    setEditingMessageId(msgId);
    setMessage(currentText); // Populate input box with the message text
  };

  const saveEditedMessage = async () => {
    if (editingMessageId && message.trim()) {
      const messageRef = doc(db, "chats", editingMessageId);
      await updateDoc(messageRef, {
        text: message,
        edited: true,
      });

      setEditingMessageId(null);
      setMessage("");

      // Turn off typing effect after saving the edit
      updateTypingStatus(false);
    }
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setMessage(""); // Clear the input box

    // Turn off typing effect when canceling
    updateTypingStatus(false);
  };

  const deleteMessage = async (messageId) => {
    const messageRef = doc(db, "chats", messageId);
    await deleteDoc(messageRef);
  };

  return (
    <div className="message-area ms-auto rounded-0">
      <div
        className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom"
        style={{ backgroundColor: "#075e54" }}
      >
        {selectedUser && (
          <div className="current-user-profile align-items-center">
            <div className="d-flex align-items-center">
              <div>
                <button
                  onClick={goBack}
                  style={{
                    display: "block",
                    marginBottom: "0",
                    backgroundColor: "transparent",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  <i className="fa-solid fa-arrow-left fs-5 me-1"></i>
                </button>
              </div>

              {/* Profile Image */}
              <div className="me-2">
                {getUserProfileImage(selectedUser.email)}
              </div>

              <div>
                <h4 className="text-white mb-0">{selectedUser?.name}</h4>
                <span className="ms-2 text-white" style={{ fontSize: "13px" }}>
                  {selectedUser.isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        )}

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
            <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* // <button
          //   style={{ fontSize: "10px" }}
          //   className=""
          //   onClick={() => deleteMessage(msg.id)}
          // >
          //   Delete
          // </button> */}

      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === auth.currentUser?.uid ? "sent" : "received"
            }`}
          >
            <div className="d-flex align-items-baseline">
              <div className="d-flex align-items-center">
                <p className="msg-marg">{msg.text}</p>
                <p className="mb-0">
                  {msg.edited && (
                    <span
                      className="text-black-50 ms-1"
                      style={{ fontSize: "10px" }}
                    >
                      Edited
                    </span>
                  )}
                </p>
              </div>
              {msg.senderId === auth.currentUser?.uid && (
                <Dropdown align="">
                  <Dropdown.Toggle
                    variant="button"
                    bsPrefix="p-0 fs-6 "
                    id="dropdown-basic"
                    className="text-black fw-bold ms-2"
                  >
                    &#8942;
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => startEditing(msg.id, msg.text)}
                      className="edit-btn px-0"
                      style={{ fontSize: "13px" }}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="px-0"
                      style={{ fontSize: "13px" }}
                      onClick={() => deleteMessage(msg.id)}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {otherUserTyping && (
          // <div className="typing-indicator">
          //   <span> The other user is typing...</span>
          //   <div className="typing-dots">
          //     <span></span>
          //     <span></span>
          //     <span></span>
          //   </div>
          // </div>
          <div className="typing-bubble mb-2">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={handleInputChange}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            (editingMessageId ? saveEditedMessage() : sendMessage())
          }
        />
        {editingMessageId ? (
          <div className="d-flex gap-2">
            <button
              className=""
              style={{ padding: "10px 12px 7px" }}
              onClick={saveEditedMessage}
            >
              <i class="fa-solid fa-check fs-5"></i>
            </button>
            <button
              className="bg-danger"
              style={{ padding: "10px 12px 7px" }}
              onClick={cancelEditing}
            >
              <i class="fa-solid fa-xmark fs-5 "></i>
            </button>
          </div>
        ) : (
          <button onClick={sendMessage}>
            <Image src={sendIcon} style={{ width: "20px" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageArea;

//Dummy Code uper no (18/12/2024)
// import React, { useState, useEffect, useRef } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   deleteDoc,
//   updateDoc,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   arrayUnion,
//   getDoc,
// } from "firebase/firestore";
// import { Dropdown, Image } from "react-bootstrap";
// import "../App.css";
// import sendIcon from "./images/send.png";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MessageArea = ({ selectedUser, setSelectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [otherUserTyping, setOtherUserTyping] = useState(false);
//   const [editingMessageId, setEditingMessageId] = useState(null);
//   const [isMessageSent, setIsMessageSent] = useState(false);

//   const messagesEndRef = useRef(null);

//   const goBack = () => {
//     setSelectedUser(null); // Reset the selected user to return to ChatList
//   };

//   useEffect(() => {
//     // Request notification permission when component mounts
//     // if (auth.currentUser) {
//     //   requestNotificationPermission(); // Request notification permission
//     // }

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = ""; // Prevent page refresh
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [selectedUser]);

//   //(18/12/2024)
//   useEffect(() => {
//     if (!selectedUser || !auth.currentUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));

//     const unsubscribe = onSnapshot(q, async (snapshot) => {
//       const messagesData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       // Update read status for messages sent by the selected user to the current user
//       const unreadMessages = messagesData.filter(
//         (msg) =>
//           msg.senderId === selectedUser.id &&
//           msg.userId === auth.currentUser.uid &&
//           !msg.isRead
//       );

//       if (unreadMessages.length > 0) {
//         const batchUpdate = unreadMessages.map((msg) => {
//           const msgRef = doc(db, "chats", msg.id);
//           return updateDoc(msgRef, { isRead: true });
//         });
//         await Promise.all(batchUpdate);
//       }

//       setMessages(
//         messagesData.filter(
//           (msg) =>
//             (msg.senderId === auth.currentUser.uid &&
//               msg.userId === selectedUser.id) ||
//             (msg.senderId === selectedUser.id &&
//               msg.userId === auth.currentUser.uid)
//         )
//       );
//     });

//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${selectedUser.id}_${auth.currentUser?.uid}`
//     );
//     const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setOtherUserTyping(docSnap.data().isTyping);
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeTyping();
//     };
//   }, [selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async (receiverId, messageText) => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return;

//     // Create message object
//     const messageData = {
//       text: messageText,
//       senderId: currentUser.uid,
//       userId: receiverId,
//       timestamp: new Date(),
//       isRead: false, // Initially, mark message as unread
//     };

//     // Send the message to Firestore
//     await addDoc(collection(db, "chats"), messageData);

//     // Set isMessageSent to true to trigger the response logic
//     setIsMessageSent(true);

//     // Update unread count for the recipient immediately after sending
//     setUnreadCounts((prevCounts) => ({
//       ...prevCounts,
//       [receiverId]: (prevCounts[receiverId] || 0) + 1, // Increment unread count for the recipient
//     }));
//   };

//   const sendPushNotification = async (payload) => {
//     // Logic to send push notification using FCM
//     try {
//       await fetch("https://fcm.googleapis.com/fcm/send", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `BKSGTotW4YVLXEvvbkGDpLaQhWnw-_vd75zprPpxXlwu7Bj02o7L2b_574rqLIepAhChL8Ty4p8TEnyrdzO8rkA`, // Replace with your Firebase server key
//         },
//         body: JSON.stringify(payload),
//       });
//     } catch (error) {
//       console.error("Error sending push notification:", error);
//     }
//   };

//   useEffect(() => {
//     if (isMessageSent) {
//       // Trigger the response logic or set the typing status for the counter message
//       sendMessage(selectedUser.id, "This is an automated reply"); // Example: sending a counter message

//       // Reset isMessageSent after sending the counter message
//       setIsMessageSent(false);
//     }
//   }, [isMessageSent, selectedUser]);

//   // const handleKeyPress = (e) => {
//   //   if (e.key === "Enter" && message.trim()) {
//   //     sendMessage();
//   //   }
//   // };

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);

//     if (e.target.value.trim()) {
//       if (!isTyping) {
//         updateTypingStatus(true);
//       }
//     } else {
//       updateTypingStatus(false);
//     }
//   };

//   const updateTypingStatus = async (status) => {
//     setIsTyping(status);
//     if (!auth.currentUser) return;

//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${auth.currentUser.uid}_${selectedUser.id}`
//     );
//     await setDoc(typingStatusRef, { isTyping: status }, { merge: true });
//   };

//   const clearChat = async () => {
//     try {
//       if (!auth.currentUser) return;

//       const q = query(
//         collection(db, "chats"),
//         where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
//         where("userId", "in", [auth.currentUser.uid, selectedUser.id])
//       );
//       const snapshot = await getDocs(q);

//       const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
//       await Promise.all(batchDelete);

//       setMessages([]);
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//     }
//   };

//   const startEditing = (msgId, currentText) => {
//     setEditingMessageId(msgId);
//     setMessage(currentText); // Populate input box with the message text
//   };

//   const saveEditedMessage = async () => {
//     if (editingMessageId && message.trim()) {
//       const messageRef = doc(db, "chats", editingMessageId);
//       await updateDoc(messageRef, {
//         text: message,
//         edited: true,
//       });

//       setEditingMessageId(null);
//       setMessage("");

//       // Turn off typing effect after saving the edit
//       updateTypingStatus(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingMessageId(null);
//     setMessage(""); // Clear the input box

//     // Turn off typing effect when canceling
//     updateTypingStatus(false);
//   };

//   const deleteMessage = async (messageId) => {
//     const messageRef = doc(db, "chats", messageId);
//     await deleteDoc(messageRef);
//   };

//   return (
//     <div className="message-area ms-auto rounded-0">
//       <div
//         className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom"
//         style={{ backgroundColor: "#075e54" }}
//       >
//         {selectedUser && (
//           <div className="current-user-profile align-items-center">
//             <div className="d-flex align-items-center">
//               <div>
//                 <button
//                   onClick={goBack}
//                   style={{
//                     display: "block",
//                     marginBottom: "10px",
//                     backgroundColor: "transparent",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   <i className="fa-solid fa-circle-arrow-left fs-5 me-1"></i>
//                 </button>
//               </div>
//               <div>
//                 <h2 className="text-white mb-0">{selectedUser?.name}</h2>
//                 <span className="ms-2 text-white" style={{ fontSize: "13px" }}>
//                   {selectedUser.isOnline ? "Online" : "Offline"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="button"
//             bsPrefix="p-2"
//             id="dropdown-basic"
//             className="text-white fw-bold fs-5"
//           >
//             &#8942;
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser?.uid ? "sent" : "received"
//             }`}
//           >
//             <div className="d-flex align-items-baseline">
//               <div className="d-flex align-items-center">
//                 <p className="msg-marg">{msg.text}</p>
//                 <p className="mb-0">
//                   {msg.edited && (
//                     <span
//                       className="text-black-50 ms-1"
//                       style={{ fontSize: "10px" }}
//                     >
//                       Edited
//                     </span>
//                   )}
//                 </p>
//               </div>
//               {msg.senderId === auth.currentUser?.uid && (
//                 <Dropdown align="">
//                   <Dropdown.Toggle
//                     variant="button"
//                     bsPrefix="p-0 fs-6 "
//                     id="dropdown-basic"
//                     className="text-black fw-bold ms-2"
//                   >
//                     &#8942;
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu>
//                     <Dropdown.Item
//                       onClick={() => startEditing(msg.id, msg.text)}
//                       className="edit-btn px-0"
//                       style={{ fontSize: "13px" }}
//                     >
//                       Edit
//                     </Dropdown.Item>
//                     <Dropdown.Item
//                       className="px-0"
//                       style={{ fontSize: "13px" }}
//                       onClick={() => deleteMessage(msg.id)}
//                     >
//                       Delete
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {otherUserTyping && (
//         <div className="typing-indicator">
//           <span> The other user is typing...</span>
//           <div className="typing-dots">
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </div>
//       )}

//       {/* Input Area */}
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={handleInputChange}
//           onKeyDown={(e) =>
//             e.key === "Enter" &&
//             (editingMessageId ? saveEditedMessage() : sendMessage())
//           }
//         />
//         {editingMessageId ? (
//           <div className="d-flex gap-2">
//             <button
//               className=""
//               style={{ padding: "10px 12px 7px" }}
//               onClick={saveEditedMessage}
//             >
//               <i class="fa-solid fa-check fs-5"></i>
//             </button>
//             <button
//               className="bg-danger"
//               style={{ padding: "10px 12px 7px" }}
//               onClick={cancelEditing}
//             >
//               <i class="fa-solid fa-xmark fs-5 "></i>
//             </button>
//           </div>
//         ) : (
//           <button onClick={sendMessage}>
//             <Image src={sendIcon} style={{ width: "20px" }} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

//Edits and Delete option add And New UI Calling Add ("07/12/2024")

// import React, { useState, useEffect, useRef } from "react";
// import { db, auth, requestNotificationPermission } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   deleteDoc,
//   updateDoc,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   arrayUnion,
//   getDoc,
// } from "firebase/firestore";
// import SimplePeer from "simple-peer";
// import { Dropdown, Image } from "react-bootstrap";
// import "../App.css";
// import sendIcon from "./images/send.png";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MessageArea = ({ selectedUser, setSelectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [otherUserTyping, setOtherUserTyping] = useState(false);
//   const [editingMessageId, setEditingMessageId] = useState(null);
//   //calling
//   const [isCalling, setIsCalling] = useState(false);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const messagesEndRef = useRef(null);

//   const goBack = () => {
//     setSelectedUser(null); // Reset the selected user to return to ChatList
//   };

//   useEffect(() => {
//     // Request notification permission when component mounts
//     if (auth.currentUser) {
//       requestNotificationPermission(); // Request notification permission
//     }

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = ""; // Prevent page refresh
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [selectedUser]);

//   useEffect(() => {
//     if (!selectedUser || !auth.currentUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser?.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser?.uid)
//           )
//       );
//     });

//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${selectedUser.id}_${auth.currentUser?.uid}`
//     );
//     const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setOtherUserTyping(docSnap.data().isTyping);
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeTyping();
//     };
//   }, [selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (message.trim() && auth.currentUser) {
//       const newMessage = {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       };

//       // Save the message in Firestore
//       await addDoc(collection(db, "chats"), newMessage);

//       // Send push notification
//       const notificationRef = doc(db, "notifications", selectedUser.id);
//       await setDoc(
//         notificationRef,
//         {
//           messages: arrayUnion({
//             text: message,
//             senderId: auth.currentUser.uid,
//             senderName: auth.currentUser.displayName || "Anonymous",
//             timestamp: new Date(),
//           }),
//         },
//         { merge: true }
//       );

//       // Send a push notification to the recipient (if their token exists)
//       const recipientDocRef = doc(db, "users", selectedUser.id);
//       const recipientSnapshot = await getDoc(recipientDocRef); // Fixed missing getDoc import
//       const recipientData = recipientSnapshot.data();
//       const recipientToken = recipientData?.fcmToken;

//       if (recipientToken) {
//         const payload = {
//           notification: {
//             title: `${auth.currentUser.displayName} sent you a message`,
//             body: message,
//           },
//           token: recipientToken,
//         };
//         // Send notification
//         await sendPushNotification(payload);
//       }

//       setMessage("");
//       updateTypingStatus(false);
//     }
//   };

//   const sendPushNotification = async (payload) => {
//     // Logic to send push notification using FCM
//     try {
//       await fetch("https://fcm.googleapis.com/fcm/send", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `BKSGTotW4YVLXEvvbkGDpLaQhWnw-_vd75zprPpxXlwu7Bj02o7L2b_574rqLIepAhChL8Ty4p8TEnyrdzO8rkA`, // Replace with your Firebase server key
//         },
//         body: JSON.stringify(payload),
//       });
//     } catch (error) {
//       console.error("Error sending push notification:", error);
//     }
//   };

//   // const handleKeyPress = (e) => {
//   //   if (e.key === "Enter" && message.trim()) {
//   //     sendMessage();
//   //   }
//   // };

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);

//     if (e.target.value.trim()) {
//       if (!isTyping) {
//         updateTypingStatus(true);
//       }
//     } else {
//       updateTypingStatus(false);
//     }
//   };

//   const updateTypingStatus = async (status) => {
//     setIsTyping(status);
//     if (!auth.currentUser) return;

//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${auth.currentUser.uid}_${selectedUser.id}`
//     );
//     await setDoc(typingStatusRef, { isTyping: status }, { merge: true });
//   };

//   const clearChat = async () => {
//     try {
//       if (!auth.currentUser) return;

//       const q = query(
//         collection(db, "chats"),
//         where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
//         where("userId", "in", [auth.currentUser.uid, selectedUser.id])
//       );
//       const snapshot = await getDocs(q);

//       const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
//       await Promise.all(batchDelete);

//       setMessages([]);
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//     }
//   };

//   const startEditing = (msgId, currentText) => {
//     setEditingMessageId(msgId);
//     setMessage(currentText); // Populate input box with the message text
//   };

//   const saveEditedMessage = async () => {
//     if (editingMessageId && message.trim()) {
//       const messageRef = doc(db, "chats", editingMessageId);
//       await updateDoc(messageRef, {
//         text: message,
//         edited: true,
//       });

//       setEditingMessageId(null);
//       setMessage("");

//       // Turn off typing effect after saving the edit
//       updateTypingStatus(false);
//     }
//   };

//   const cancelEditing = () => {
//     setEditingMessageId(null);
//     setMessage(""); // Clear the input box

//     // Turn off typing effect when canceling
//     updateTypingStatus(false);
//   };

//   const deleteMessage = async (messageId) => {
//     const messageRef = doc(db, "chats", messageId);
//     await deleteDoc(messageRef);
//   };
//   if (
//     typeof process !== "undefined" &&
//     typeof process.nextTick === "function"
//   ) {
//     process.nextTick(() => {
//       console.log("Next tick executed!");
//     });
//   } else {
//     setTimeout(() => {
//       console.log("Fallback for next tick!");
//     }, 0);
//   }

//   //calling
//   const startCall = async () => {
//     try {
//       setIsCalling(true);

//       // Check if navigator.mediaDevices.getUserMedia is available
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         console.error("Media devices API is not available in this browser.");
//         return;
//       }

//       // Get local media stream
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setLocalStream(stream);

//       // Create a peer connection
//       const peer = new SimplePeer({
//         initiator: true,
//         trickle: false,
//         stream,
//       });

//       // Signal offer to Firestore
//       peer.on("signal", async (offer) => {
//         const callDoc = doc(
//           db,
//           "calls",
//           `${auth.currentUser.uid}_${selectedUser.id}`
//         );
//         await setDoc(callDoc, { offer });
//       });

//       // Receive remote stream
//       peer.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//       });

//       setPeerConnection(peer);
//     } catch (error) {
//       console.error("Error starting call:", error);
//       setIsCalling(false);
//     }
//   };

//   const answerCall = async () => {
//     try {
//       setIsCalling(true);

//       // Check if navigator.mediaDevices.getUserMedia is available
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         console.error("Media devices API is not available in this browser.");
//         return;
//       }

//       // Get local media stream
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setLocalStream(stream);

//       const peer = new SimplePeer({
//         initiator: false,
//         trickle: false,
//         stream,
//       });

//       // Listen for offer and respond with answer
//       const callDoc = doc(
//         db,
//         "calls",
//         `${selectedUser.id}_${auth.currentUser.uid}`
//       );
//       const callSnapshot = await getDoc(callDoc);

//       if (callSnapshot.exists()) {
//         peer.signal(callSnapshot.data().offer);
//       }

//       peer.on("signal", async (answer) => {
//         await updateDoc(callDoc, { answer });
//       });

//       peer.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//       });

//       setPeerConnection(peer);
//     } catch (error) {
//       console.error("Error answering call:", error);
//       setIsCalling(false);
//     }
//   };

//   const endCall = () => {
//     if (peerConnection) {
//       peerConnection.destroy();
//       setPeerConnection(null);
//     }
//     if (localStream) {
//       localStream.getTracks().forEach((track) => track.stop()); // Properly stop local media tracks
//     }
//     setLocalStream(null);
//     setRemoteStream(null);
//     setIsCalling(false);
//   };

//   return (
//     <div className="message-area ms-auto rounded-0">
//       <div
//         className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom"
//         style={{ backgroundColor: "#075e54" }}
//       >
//         {selectedUser && (
//           <div className="current-user-profile align-items-center">
//             <div className="d-flex align-items-center">
//               <div>
//                 <button
//                   onClick={goBack}
//                   style={{
//                     display: "block",
//                     marginBottom: "10px",
//                     backgroundColor: "transparent",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   <i className="fa-solid fa-circle-arrow-left fs-5 me-1"></i>
//                 </button>
//               </div>
//               <div>
//                 <h2 className="text-white mb-0">{selectedUser?.name}</h2>
//                 <span className="ms-2 text-white" style={{ fontSize: "13px" }}>
//                   {selectedUser.isOnline ? "Online" : "Offline"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="button"
//             bsPrefix="p-2"
//             id="dropdown-basic"
//             className="text-white fw-bold fs-5"
//           >
//             &#8942;
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {/* // <button
//           //   style={{ fontSize: "10px" }}
//           //   className=""
//           //   onClick={() => deleteMessage(msg.id)}
//           // >
//           //   Delete
//           // </button> */}

//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser?.uid ? "sent" : "received"
//             }`}
//           >
//             <div className="d-flex align-items-baseline">
//               <div className="d-flex align-items-center">
//                 <p className="msg-marg">{msg.text}</p>
//                 <p className="mb-0">
//                   {msg.edited && (
//                     <span
//                       className="text-black-50 ms-1"
//                       style={{ fontSize: "10px" }}
//                     >
//                       Edited
//                     </span>
//                   )}
//                 </p>
//               </div>
//               {msg.senderId === auth.currentUser?.uid && (
//                 <Dropdown align="">
//                   <Dropdown.Toggle
//                     variant="button"
//                     bsPrefix="p-0 fs-6 "
//                     id="dropdown-basic"
//                     className="text-black fw-bold ms-2"
//                   >
//                     &#8942;
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu>
//                     <Dropdown.Item
//                       onClick={() => startEditing(msg.id, msg.text)}
//                       className="edit-btn px-0"
//                       style={{ fontSize: "13px" }}
//                     >
//                       Edit
//                     </Dropdown.Item>
//                     <Dropdown.Item
//                       className="px-0"
//                       style={{ fontSize: "13px" }}
//                       onClick={() => deleteMessage(msg.id)}
//                     >
//                       Delete
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {otherUserTyping && (
//         <div className="typing-indicator">
//           <span> The other user is typing...</span>
//           <div className="typing-dots">
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </div>
//       )}

//       {/* Input Area */}
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={handleInputChange}
//           onKeyDown={(e) =>
//             e.key === "Enter" &&
//             (editingMessageId ? saveEditedMessage() : sendMessage())
//           }
//         />
//         {editingMessageId ? (
//           <div className="d-flex gap-2">
//             <button
//               className=""
//               style={{ padding: "10px 12px 7px" }}
//               onClick={saveEditedMessage}
//             >
//               <i class="fa-solid fa-check fs-5"></i>
//             </button>
//             <button
//               className="bg-danger"
//               style={{ padding: "10px 12px 7px" }}
//               onClick={cancelEditing}
//             >
//               <i class="fa-solid fa-xmark fs-5 "></i>
//             </button>
//           </div>
//         ) : (
//           <div>
//             <button onClick={sendMessage}>
//               <Image src={sendIcon} style={{ width: "20px" }} />
//             </button>
//             <button onClick={startCall} className="btn btn-primary">
//               Call
//             </button>
//             <button onClick={answerCall} className="btn btn-success">
//               Answer
//             </button>
//             <button onClick={endCall} className="btn btn-danger">
//               End Call
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="call-container">
//         {localStream && (
//           <video
//             autoPlay
//             muted
//             playsInline
//             ref={(video) => video && (video.srcObject = localStream)}
//           />
//         )}
//         {remoteStream && (
//           <video
//             autoPlay
//             playsInline
//             ref={(video) => video && (video.srcObject = remoteStream)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

//New Way Notification Up side code is same to same but notification UI Different

// import React, { useState, useEffect, useRef } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   deleteDoc,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   arrayUnion,
// } from "firebase/firestore";
// import { Dropdown } from "react-bootstrap";
// import "../App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { toast } from "react-toastify"; // Import react-toastify

// // Make sure to import the toastify CSS
// import "react-toastify/dist/ReactToastify.css";

// const MessageArea = ({ selectedUser, setSelectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [otherUserTyping, setOtherUserTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   const goBack = () => {
//     setSelectedUser(null); // Reset the selected user to return to ChatList
//   };

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = ""; // Prevent page refresh
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   useEffect(() => {
//     if (!selectedUser || !auth.currentUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser?.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser?.uid)
//           )
//       );
//     });

//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${selectedUser.id}_${auth.currentUser?.uid}`
//     );
//     const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setOtherUserTyping(docSnap.data().isTyping);
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeTyping();
//     };
//   }, [selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (message.trim() && auth.currentUser) {
//       const newMessage = {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       };

//       // Save the message in Firestore
//       await addDoc(collection(db, "chats"), newMessage);

//       // Add a notification for the recipient
//       const notificationRef = doc(db, "notifications", selectedUser.id);
//       await setDoc(
//         notificationRef,
//         {
//           messages: arrayUnion({
//             text: message,
//             senderId: auth.currentUser.uid,
//             senderName: auth.currentUser.displayName || "Anonymous",
//             timestamp: new Date(),
//           }),
//         },
//         { merge: true }
//       );

//       // Show toast notification for the receiver
//       toast.success(`Message sent to ${selectedUser.name}`, {
//         position: "bottom-left",
//         autoClose: 3000,
//       });

//       setMessage("");
//       updateTypingStatus(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);

//     if (e.target.value.trim()) {
//       if (!isTyping) {
//         updateTypingStatus(true);
//       }
//     } else {
//       updateTypingStatus(false);
//     }
//   };

//   const updateTypingStatus = async (status) => {
//     setIsTyping(status);
//     if (!auth.currentUser) return;

//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${auth.currentUser.uid}_${selectedUser.id}`
//     );
//     await setDoc(typingStatusRef, { isTyping: status }, { merge: true });
//   };

//   const clearChat = async () => {
//     try {
//       if (!auth.currentUser) return;

//       const q = query(
//         collection(db, "chats"),
//         where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
//         where("userId", "in", [auth.currentUser.uid, selectedUser.id])
//       );
//       const snapshot = await getDocs(q);

//       const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
//       await Promise.all(batchDelete);

//       setMessages([]);
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//     }
//   };

//   return (
//     <div className="message-area ms-auto rounded-0">
//       <div
//         className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom"
//         style={{ backgroundColor: "#075e54" }}
//       >
//         {selectedUser && (
//           <div className="current-user-profile align-items-center">
//             <div className="d-flex align-items-center">
//               <div>
//                 <button
//                   onClick={goBack}
//                   style={{
//                     display: "block",
//                     marginBottom: "10px",
//                     backgroundColor: "transparent",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   <i className="fa-solid fa-circle-arrow-left fs-5 me-1"></i>
//                 </button>
//               </div>
//               <div>
//                 <h2 className="text-white mb-0">{selectedUser?.name}</h2>
//                 <span className="ms-2 text-white" style={{ fontSize: "13px" }}>
//                   {selectedUser.isOnline ? "Online" : "Offline"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="button"
//             bsPrefix="p-2"
//             id="dropdown-basic"
//             className="text-white fw-bold fs-5"
//           >
//             &#8942;
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser?.uid ? "sent" : "received"
//             }`}
//           >
//             <p className="mb-0">{msg.text}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {otherUserTyping && (
//         <div className="typing-indicator">
//           <span> The other user is typing...</span>
//           <div className="typing-dots">
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </div>
//       )}

//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyPress}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       {/* Render Toast container */}
//       <toast.Container />
//     </div>
//   );
// };

// export default MessageArea;

//Send message Show popup only code 05/12/2024

// import React, { useState, useEffect, useRef } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   deleteDoc,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   arrayUnion,
// } from "firebase/firestore";
// import { Dropdown } from "react-bootstrap";
// import ToastNotification from "./ToastNotification"; // Import the ToastNotification component
// import "../App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MessageArea = ({ selectedUser, setSelectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [otherUserTyping, setOtherUserTyping] = useState(false);
//   const [showToast, setShowToast] = useState(false); // State for toast visibility
//   const [toastMessage, setToastMessage] = useState(""); // State for toast content
//   const messagesEndRef = useRef(null);

//   const goBack = () => {
//     setSelectedUser(null);
//   };

//   useEffect(() => {
//     if (!selectedUser || !auth.currentUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser?.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser?.uid)
//           )
//       );
//     });

//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${selectedUser.id}_${auth.currentUser?.uid}`
//     );
//     const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setOtherUserTyping(docSnap.data().isTyping);
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeTyping();
//     };
//   }, [selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (message.trim() && auth.currentUser) {
//       const newMessage = {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       };

//       // Save the message in Firestore
//       await addDoc(collection(db, "chats"), newMessage);

//       // Add a notification for the recipient
//       const notificationRef = doc(db, "notifications", selectedUser.id);
//       await setDoc(
//         notificationRef,
//         {
//           messages: arrayUnion({
//             text: message,
//             senderId: auth.currentUser.uid,
//             senderName: auth.currentUser.displayName || "Anonymous",
//             timestamp: new Date(),
//           }),
//         },
//         { merge: true }
//       );

//       // Show toast notification
//       setToastMessage(`Message sent to ${selectedUser.name}`);
//       setShowToast(true);

//       setMessage("");
//       updateTypingStatus(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);

//     if (e.target.value.trim()) {
//       if (!isTyping) {
//         updateTypingStatus(true);
//       }
//     } else {
//       updateTypingStatus(false);
//     }
//   };

//   const updateTypingStatus = async (status) => {
//     setIsTyping(status);
//     if (!auth.currentUser) return;

//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${auth.currentUser.uid}_${selectedUser.id}`
//     );
//     await setDoc(typingStatusRef, { isTyping: status }, { merge: true });
//   };

//   const clearChat = async () => {
//     try {
//       if (!auth.currentUser) return;

//       const q = query(
//         collection(db, "chats"),
//         where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
//         where("userId", "in", [auth.currentUser.uid, selectedUser.id])
//       );
//       const snapshot = await getDocs(q);

//       const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
//       await Promise.all(batchDelete);

//       setMessages([]);
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//     }
//   };

//   return (
//     <div className="message-area ms-auto rounded-0">
//       <ToastNotification
//         show={showToast}
//         message={toastMessage}
//         onClose={() => setShowToast(false)}
//       />
//       <div
//         className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom"
//         style={{ backgroundColor: "#075e54" }}
//       >
//         {selectedUser && (
//           <div className="current-user-profile align-items-center">
//             <div className="d-flex align-items-center">
//               <button
//                 onClick={goBack}
//                 style={{
//                   backgroundColor: "transparent",
//                   color: "white",
//                   border: "none",
//                 }}
//               >
//                 <i className="fa-solid fa-circle-arrow-left fs-5 me-1"></i>
//               </button>
//               <h2 className="text-white mb-0">{selectedUser?.name}</h2>
//               <span className="ms-2 text-white" style={{ fontSize: "13px" }}>
//                 {selectedUser.isOnline ? "Online" : "Offline"}
//               </span>
//             </div>
//           </div>
//         )}
//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="button"
//             bsPrefix="p-2"
//             id="dropdown-basic"
//             className="text-white fw-bold fs-5"
//           >
//             &#8942;
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser?.uid ? "sent" : "received"
//             }`}
//           >
//             <p className="mb-0">{msg.text}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       {otherUserTyping && (
//         <div className="typing-indicator">
//           <span>The other user is typing...</span>
//         </div>
//       )}
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyPress}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

//Cannot read properties of null (reading 'uid') ERROR Without Code

// import React, { useState, useEffect, useRef } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   deleteDoc,
//   where,
//   getDocs,
//   setDoc,
//   doc,
// } from "firebase/firestore";
// import { auth } from "../firebaseConfig";
// import { Dropdown } from "react-bootstrap";
// import "../App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MessageArea = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [otherUserTyping, setOtherUserTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Fetch messages from Firestore
//   useEffect(() => {
//     if (!selectedUser || !auth.currentUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser.uid)
//           )
//       );
//     });

//     // Listen to typing status of the other user
//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${selectedUser.id}_${auth.currentUser.uid}`
//     );
//     const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setOtherUserTyping(docSnap.data().isTyping);
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeTyping();
//     };
//   }, [selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (message.trim()) {
//       await addDoc(collection(db, "chats"), {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       });
//       setMessage("");
//       updateTypingStatus(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);

//     // Update typing status if there is text in the input field
//     if (e.target.value.trim()) {
//       if (!isTyping) {
//         updateTypingStatus(true);
//       }
//     } else {
//       // If the message box is cleared, stop typing status
//       updateTypingStatus(false);
//     }
//   };

//   const updateTypingStatus = async (status) => {
//     setIsTyping(status);
//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${auth.currentUser.uid}_${selectedUser.id}`
//     );
//     await setDoc(typingStatusRef, { isTyping: status }, { merge: true });
//   };

//   // Clear chat function
//   const clearChat = async () => {
//     try {
//       const q = query(
//         collection(db, "chats"),
//         where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
//         where("userId", "in", [auth.currentUser.uid, selectedUser.id])
//       );
//       const snapshot = await getDocs(q);

//       const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
//       await Promise.all(batchDelete);

//       setMessages([]);
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//     }
//   };

//   return (
//     <div className="message-area">
//       <div className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom">
//         <h2>Chat with {selectedUser?.name}</h2>

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="button"
//             bsPrefix="p-2"
//             id="dropdown-basic"
//             className="text-black fw-bold fs-5"
//           >
//             &#8942;
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.text}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {otherUserTyping && (
//         <div className="typing-indicator">The other user is typing...</div>
//       )}

//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyPress}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;
