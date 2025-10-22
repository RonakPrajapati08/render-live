//Popup message Show sender and reciever side 05/12/2024

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
// import { httpsCallable } from "firebase/functions"; // 🔹 Added import
// import { functions } from "../firebaseConfig"; // 🔹 Added import
// import { Dropdown, Image } from "react-bootstrap";
// import "../App.css";
// import sendIcon from "./images/send.png";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MessageArea = ({
//   selectedUser,
//   setSelectedUser,
//   getUserProfileImage,
// }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [otherUserTyping, setOtherUserTyping] = useState(false);
//   const [editingMessageId, setEditingMessageId] = useState(null);
//   const messagesEndRef = useRef(null);

//   const goBack = () => {
//     setSelectedUser(null); // Reset the selected user to return to ChatList
//     localStorage.removeItem("selectedUser"); // Remove it so it's reset when user goes
//   };

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

//   // const sendMessage = async () => {
//   //   if (message.trim() && auth.currentUser) {
//   //     const newMessage = {
//   //       text: message,
//   //       userId: selectedUser.id,
//   //       senderId: auth.currentUser.uid,
//   //       timestamp: serverTimestamp(),
//   //       isRead: false,
//   //     };

//   //     // Save the message in Firestore
//   //     await addDoc(collection(db, "chats"), newMessage);

//   //     // Send push notification
//   //     const notificationRef = doc(db, "notifications", selectedUser.id);
//   //     await setDoc(
//   //       notificationRef,
//   //       {
//   //         messages: arrayUnion({
//   //           text: message,
//   //           senderId: auth.currentUser.uid,
//   //           senderName: auth.currentUser.displayName || "Anonymous",
//   //           timestamp: new Date(),
//   //         }),
//   //       },
//   //       { merge: true }
//   //     );

//   //     // Send a push notification to the recipient (if their token exists)
//   //     const recipientDocRef = doc(db, "users", selectedUser.id);
//   //     const recipientSnapshot = await getDoc(recipientDocRef); // Fixed missing getDoc import
//   //     const recipientData = recipientSnapshot.data();
//   //     const recipientToken = recipientData?.fcmToken;

//   //     if (recipientToken) {
//   //       const payload = {
//   //         notification: {
//   //           title: `${auth.currentUser.displayName} sent you a message`,
//   //           body: message,
//   //         },
//   //         token: recipientToken,
//   //       };
//   //       // Send notification
//   //       await sendPushNotification(payload);
//   //     }

//   //     setMessage("");
//   //     updateTypingStatus(false);
//   //   }
//   // };
//   // const sendMessage = async () => {
//   //   if (!message.trim() || !auth.currentUser) return;

//   //   const newMessage = {
//   //     text: message,
//   //     userId: selectedUser.id,
//   //     senderId: auth.currentUser.uid,
//   //     senderName: auth.currentUser.displayName || "Anonymous",
//   //     timestamp: serverTimestamp(),
//   //     isRead: false,
//   //   };

//   //   // Save message in Firestore
//   //   await addDoc(collection(db, "chats"), newMessage);

//   //   // Save notification in Firestore (optional)
//   //   await setDoc(
//   //     doc(db, "notifications", selectedUser.id),
//   //     {
//   //       messages: arrayUnion({
//   //         text: message,
//   //         senderId: auth.currentUser.uid,
//   //         senderName: auth.currentUser.displayName || "Anonymous",
//   //         timestamp: new Date(),
//   //       }),
//   //     },
//   //     { merge: true }
//   //   );

//   //   // Get recipient FCM token
//   //   const recipientSnapshot = await getDoc(doc(db, "users", selectedUser.id));
//   //   const recipientToken = recipientSnapshot.data()?.fcmToken;

//   //   if (recipientToken) {
//   //     const payload = {
//   //       notification: {
//   //         title: `${auth.currentUser.displayName} sent you a message`,
//   //         body: message,
//   //       },
//   //       token: recipientToken,
//   //     };

//   //     await sendPushNotification(payload);
//   //   }

//   //   setMessage("");
//   //   updateTypingStatus(false);
//   // };

//   const sendMessage = async () => {
//     if (!message.trim() || !auth.currentUser) return;
  
//     const newMessage = {
//       text: message,
//       userId: selectedUser.id,
//       senderId: auth.currentUser.uid,
//       senderName: auth.currentUser.displayName || "Anonymous",
//       timestamp: serverTimestamp(),
//       isRead: false,
//     };
  
//     // Save message in Firestore (triggers Cloud Function)
//     await addDoc(collection(db, "chats"), newMessage);
  
//     setMessage("");
//     updateTypingStatus(false);
//   };
  

//   // const sendPushNotification = async (payload) => {
//   //   // Logic to send push notification using FCM
//   //   try {
//   //     await fetch("https://fcm.googleapis.com/fcm/send", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `BBDvONRa7kLZ6Oq334_gd1lb4VAls6uhcxxZ0kDzm12N38T09sb7rKEbbkK8Dmxl27unIN_tBu7Lr9DoqvP7XGg`, // Replace with your Firebase server key
//   //       },
//   //       body: JSON.stringify(payload),
//   //     });
//   //   } catch (error) {
//   //     console.error("Error sending push notification:", error);
//   //   }
//   // };
//   // const sendPushNotification = async (payload) => {
//   //   try {
//   //     // 🔹 Call Firebase Cloud Function instead of fetch
//   //     const sendNotification = httpsCallable(functions, "sendPushNotification");
//   //     await sendNotification({
//   //       token: payload.token,
//   //       title: payload.notification.title,
//   //       body: payload.notification.body,
//   //     });
//   //     console.log("Notification request sent successfully"); // Optional log
//   //   } catch (error) {
//   //     console.error("Error sending push notification:", error); // Log errors
//   //   }
//   // };

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
//                     marginBottom: "0",
//                     backgroundColor: "transparent",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   <i className="fa-solid fa-arrow-left fs-5 me-1"></i>
//                 </button>
//               </div>

//               {/* Profile Image */}
//               <div className="me-2">
//                 {getUserProfileImage(selectedUser.email)}
//               </div>

//               <div>
//                 <h4 className="text-white mb-0">{selectedUser?.name}</h4>
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
//               <div className="d-flex align-items-center flex-row flex-wrap justify-content-end">
//                 <p className="msg-marg">{msg.text}</p>
//                 {/* <span className="text-dark">{msg.timestamp}</span> */}
//                 <span className="text-dark ms-2" style={{ fontSize: "12px" }}>
//                   {msg.timestamp?.toDate
//                     ? msg.timestamp.toDate().toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })
//                     : ""}
//                 </span>

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
//         {otherUserTyping && (
//           <div class="d-flex align-items-center mb-2">
//             <div class="typing-bubble bg-light rounded-pill px-1 py-1">
//               <span class="dot bg-secondary rounded-circle mx-1"></span>
//               <span class="dot bg-secondary rounded-circle mx-1"></span>
//               <span class="dot bg-secondary rounded-circle mx-1"></span>
//             </div>
//           </div>
//         )}
//       </div>

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
//               <i className="fa-solid fa-check fs-5"></i>
//             </button>
//             <button
//               className="bg-danger"
//               style={{ padding: "10px 12px 7px" }}
//               onClick={cancelEditing}
//             >
//               <i className="fa-solid fa-xmark fs-5 "></i>
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

//NEW CODE 21/10/2025
// MessageArea.js
import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
  getDoc,
  deleteDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { Dropdown, Image } from "react-bootstrap";
import "../App.css";
import sendIcon from "./images/send.png";
import "bootstrap/dist/css/bootstrap.min.css";

const MessageArea = ({ selectedUser, setSelectedUser, getUserProfileImage }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  const goBack = () => {
    setSelectedUser(null);
    localStorage.removeItem("selectedUser");
  };

  // Fetch messages & typing status
  useEffect(() => {
    if (!selectedUser || !auth.currentUser) return;

    const q = query(collection(db, "chats"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Mark unread messages as read
      const unreadMessages = messagesData.filter(
        (msg) =>
          msg.senderId === selectedUser.id &&
          msg.userId === auth.currentUser.uid &&
          !msg.isRead
      );

      if (unreadMessages.length > 0) {
        const batchUpdate = unreadMessages.map((msg) =>
          updateDoc(doc(db, "chats", msg.id), { isRead: true })
        );
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

  // Send message (Firestore only; Cloud Function handles push)
  // const sendMessage = async () => {
  //   if (!message.trim() || !auth.currentUser) return;

  //   const newMessage = {
  //     text: message,
  //     userId: selectedUser.id,
  //     senderId: auth.currentUser.uid,
  //     senderName: auth.currentUser.displayName || "Anonymous",
  //     timestamp: serverTimestamp(),
  //     isRead: false,
  //   };

  //   await addDoc(collection(db, "chats"), newMessage);

  //   // Optional: store notification in Firestore for logging
  //   await setDoc(
  //     doc(db, "notifications", selectedUser.id),
  //     {
  //       messages: arrayUnion({
  //         text: message,
  //         senderId: auth.currentUser.uid,
  //         senderName: auth.currentUser.displayName || "Anonymous",
  //         timestamp: new Date(),
  //       }),
  //     },
  //     { merge: true }
  //   );

  //   setMessage("");
  //   updateTypingStatus(false);
  // };
  // const sendMessage = async () => {
  //   if (!message.trim() || !auth.currentUser) return;
  
  //   const newMessage = {
  //     text: message,
  //     userId: selectedUser.id,
  //     senderId: auth.currentUser.uid,
  //     timestamp: serverTimestamp(),
  //     isRead: false,
  //   };
  
  //   // 1️⃣ Save message in Firestore
  //   await addDoc(collection(db, "chats"), newMessage);
  
  //   // 2️⃣ Optional: Save notification in Firestore
  //   await setDoc(
  //     doc(db, "notifications", selectedUser.id),
  //     {
  //       messages: arrayUnion({
  //         text: message,
  //         senderId: auth.currentUser.uid,
  //         senderName: auth.currentUser.displayName || "Anonymous",
  //         timestamp: new Date(),
  //       }),
  //     },
  //     { merge: true }
  //   );
  
  //   // 3️⃣ Get recipient FCM token from Firestore
  //   const recipientSnapshot = await getDoc(doc(db, "users", selectedUser.id));
  //   const recipientToken = recipientSnapshot.data()?.fcmToken;
  
  //   // 4️⃣ Send push notification via FCM REST API (frontend-only)
  //   if (recipientToken) {
  //     const payload = {
  //       notification: {
  //         title: `${auth.currentUser.displayName || "Someone"} sent you a message`,
  //         body: message,
  //         icon: "/favicon.ico", // optional: show your app icon
  //       },
  //       to: recipientToken, // 🔹 frontend uses 'to' instead of 'token' in REST API
  //     };
  
  //     try {
  //       await fetch("https://fcm.googleapis.com/fcm/send", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `key=BBDvONRa7kLZ6Oq334_gd1lb4VAls6uhcxxZ0kDzm12N38T09sb7rKEbbkK8Dmxl27unIN_tBu7Lr9DoqvP7XGg`, // ⚠️ Use your FCM server key
  //         },
  //         body: JSON.stringify(payload),
  //       });
  //       console.log("✅ Push notification sent (frontend-only)");
  //     } catch (error) {
  //       console.error("❌ Error sending push notification:", error);
  //     }
  //   }
  
  //   setMessage("");        // Clear input box
  //   updateTypingStatus(false); // Stop typing status
  // };

  //Node server
  const sendMessage = async () => {
  if (!message.trim() || !auth.currentUser) return;

  const newMessage = {
    text: message,
    userId: selectedUser.id,
    senderId: auth.currentUser.uid,
    timestamp: serverTimestamp(),
    isRead: false,
  };

  try {
    // 1️⃣ Save message in Firestore
    await addDoc(collection(db, "chats"), newMessage);

    // 2️⃣ Optional: Save notification info in Firestore
    await setDoc(
      doc(db, "notifications", selectedUser.id),
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

    // 3️⃣ Get recipient FCM token from Firestore
    const recipientSnapshot = await getDoc(doc(db, "users", selectedUser.id));
    const recipientToken = recipientSnapshot.data()?.fcmToken;

    // 4️⃣ Send push notification via your Node.js server
    if (recipientToken) {
      try {
        await fetch("http://localhost:3000/send-notification", {
          // 🔹 Replace with your localtunnel URL when testing on phone:
          // await fetch("https://your-tunnel-url.loca.lt/send-notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: recipientToken,
            title: `${auth.currentUser.displayName || "Someone"} sent you a message`,
            body: message,
          }),
        });

        console.log("✅ Push notification sent via Node.js server");
      } catch (error) {
        console.error("❌ Error calling local server:", error);
      }
    }

    // 5️⃣ Clear input and stop typing indicator
    setMessage("");
    updateTypingStatus(false);
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
};

  

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    if (e.target.value.trim()) {
      if (!isTyping) updateTypingStatus(true);
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
  };

  const startEditing = (msgId, currentText) => {
    setEditingMessageId(msgId);
    setMessage(currentText);
  };

  const saveEditedMessage = async () => {
    if (editingMessageId && message.trim()) {
      const messageRef = doc(db, "chats", editingMessageId);
      await updateDoc(messageRef, { text: message, edited: true });

      setEditingMessageId(null);
      setMessage("");
      updateTypingStatus(false);
    }
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setMessage("");
    updateTypingStatus(false);
  };

  const deleteMessage = async (messageId) => {
    await deleteDoc(doc(db, "chats", messageId));
  };

  return (
    <div className="message-area ms-auto rounded-0">
      {/* Chat Header */}
      <div
        className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom"
        style={{ backgroundColor: "#075e54" }}
      >
        {selectedUser && (
          <div className="current-user-profile d-flex align-items-center">
            <button
              onClick={goBack}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                marginRight: "8px",
              }}
            >
              <i className="fa-solid fa-arrow-left fs-5"></i>
            </button>
            <div className="me-2">{getUserProfileImage(selectedUser.email)}</div>
            <div>
              <h4 className="text-white mb-0">{selectedUser?.name}</h4>
              <span className="ms-2 text-white" style={{ fontSize: "13px" }}>
                {selectedUser.isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        )}

        <Dropdown align="end">
          <Dropdown.Toggle variant="button" bsPrefix="p-2" id="dropdown-basic">
            &#8942;
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Messages */}
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId === auth.currentUser?.uid ? "sent" : "received"}`}
          >
            <div className="d-flex align-items-baseline">
              <div className="d-flex align-items-center flex-wrap justify-content-end">
                <p className="msg-marg">{msg.text}</p>
                <span className="text-dark ms-2" style={{ fontSize: "12px" }}>
                  {msg.timestamp?.toDate
                    ? msg.timestamp.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
                {msg.edited && (
                  <span className="text-black-50 ms-1" style={{ fontSize: "10px" }}>
                    Edited
                  </span>
                )}
              </div>

              {msg.senderId === auth.currentUser?.uid && (
                <Dropdown>
                  <Dropdown.Toggle variant="button" bsPrefix="p-0 fs-6 text-black fw-bold ms-2">
                    &#8942;
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => startEditing(msg.id, msg.text)} style={{ fontSize: "13px" }}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => deleteMessage(msg.id)} style={{ fontSize: "13px" }}>
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
          <div className="d-flex align-items-center mb-2">
            <div className="typing-bubble bg-light rounded-pill px-1 py-1">
              <span className="dot bg-secondary rounded-circle mx-1"></span>
              <span className="dot bg-secondary rounded-circle mx-1"></span>
              <span className="dot bg-secondary rounded-circle mx-1"></span>
            </div>
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
            e.key === "Enter" && (editingMessageId ? saveEditedMessage() : sendMessage())
          }
        />
        {editingMessageId ? (
          <div className="d-flex gap-2">
            <button onClick={saveEditedMessage} style={{ padding: "10px 12px 7px" }}>
              <i className="fa-solid fa-check fs-5"></i>
            </button>
            <button onClick={cancelEditing} className="bg-danger" style={{ padding: "10px 12px 7px" }}>
              <i className="fa-solid fa-xmark fs-5"></i>
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

