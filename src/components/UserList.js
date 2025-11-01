// export default ChatList;
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
import { Dropdown, Modal, Button, Form, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChatList = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [lastMessages, setLastMessages] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Safe helper for profile image
  const getUserProfileImage = (email) => {
    const firstLetter = email?.charAt(0).toUpperCase() || "?";
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

  const updateUserStatus = async (status) => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, { isOnline: status });
  };

  // Fetch current user and all online users
  // useEffect(() => {
  //   const fetchCurrentUser = async (user) => {
  //     // Fetch only if we actually have a user from Firebase
  //     if (!user) return;
  //     const userRef = doc(db, "users", user.uid);
  //     const userSnap = await getDoc(userRef);
  //     if (userSnap.exists()) {
  //       setCurrentUserData({ id: user.uid, ...userSnap.data() });
  //       await updateUserStatus(true);
  //     }
  //   };

  //   // ✅ run fetch only after Firebase confirms user login
  //   const unsubscribeAuth = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       fetchCurrentUser(user); // 🔥 now always runs at the right time
  //     } else {
  //       navigate("/");
  //     }
  //   });

  //   // listen to all users
  //   const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
  //     const allUsers = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     const onlineUsers = allUsers.filter(
  //       (u) => u.isOnline && u.id !== auth.currentUser?.uid
  //     );
  //     setUsers(onlineUsers);

  //     if (auth.currentUser) fetchLastMessages(onlineUsers);
  //   });

  //   return () => {
  //     unsubscribe();
  //     unsubscribeAuth();
  //   };
  // }, [navigate]);

  //new code
  useEffect(() => {
    let isMounted = true; // ✅ to prevent state updates after unmount
     let currentUser = null;

    const fetchCurrentUser = async (firebaseUser) => {
      if (!firebaseUser) return;

      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: userSnap.data().name || firebaseUser.displayName || "User",
          photoURL: userSnap.data().photoURL || firebaseUser.photoURL || null,
          isOnline: true,
        };

        setCurrentUserData(userData);
        await updateUserStatus(true);

        // 🧠 Save Firestore user data, not Auth object
        localStorage.setItem("currentUserData", JSON.stringify(userData));
      }
    };

    // ✅ Instantly load cached user (if exists)
    const savedUser = localStorage.getItem("currentUserData");
    if (savedUser) {
      setCurrentUserData(JSON.parse(savedUser));
    }

    // ✅ Listen to auth state changes
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      currentUser = user;
      if (user) {
        fetchCurrentUser(user);
      } else {
        localStorage.removeItem("currentUserData"); // 🧹 clear on logout
        navigate("/");
      }
    });

    // ✅ Listen to all users for real-time updates
    const unsubscribe = onSnapshot(collection(db, "users"), async (snapshot) => {
      if (!isMounted || !currentUser) return; // ✅ stop if unmounted or logged out

      const allUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // const currentUid = auth.currentUser?.uid;
      const currentUid = currentUser.uid;

       if (!currentUid) return; // ✅ skip if user logged out
      const onlineUsers = allUsers.filter(
        (u) => u.isOnline && u.id !== currentUid
      );
      setUsers(onlineUsers);

    //  fetchLastMessages(onlineUsers);
    try {
      await fetchLastMessages(onlineUsers, currentUid); // ✅ pass uid manually
    } catch (err) {
      console.warn("Skipping fetchLastMessages due to logout or race:", err);
    }
    });

    return () => {
       isMounted = false;
      unsubscribe();
      unsubscribeAuth();
    };
  }, [navigate]);

  const fetchLastMessages = async (onlineUsers, currentUid) => {
    // if (!auth.currentUser) return;
    //   const currentUser = auth.currentUser;
    // if (!currentUser) return;
    if (!currentUid) return; // ✅ skip if null
    
    for (const user of onlineUsers) {
       if (!currentUid) break; // ✅ stop immediately if logged out mid-loop

      const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", currentUid),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const lastMessageDoc = querySnapshot.docs[0].data();
        setLastMessages((prev) => ({
          ...prev,
          [user.id]: {
            text: lastMessageDoc.text || "No message",
            timestamp: lastMessageDoc.timestamp?.toDate() || null,
          },
        }));
        const unreadQuery = query(
          collection(db, "chats"),
          where("userId", "==", currentUid),
          where("senderId", "==", user.id),
          where("isRead", "==", false)
        );
        const unreadSnapshot = await getDocs(unreadQuery);
        setUnreadCounts((prev) => ({
          ...prev,
          [user.id]: unreadSnapshot.size,
        }));
      } else {
        setLastMessages((prev) => ({
          ...prev,
          [user.id]: { text: "No messages yet", timestamp: null },
        }));
      }
    }
  };

  // ----------------------
  // LIVE UNREAD COUNT LISTENER
  // ----------------------
  // useEffect(() => {
  //   if (!auth.currentUser) return;

  //   const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
  //     const newCounts = {};

  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === "added" || change.type === "modified") {
  //         const msg = change.doc.data();
  //         // Count unread messages only for current user
  //         if (msg.userId === auth.currentUser.uid && !msg.isRead) {
  //           newCounts[msg.senderId] = (newCounts[msg.senderId] || 0) + 1;
  //         }
  //       }
  //     });

  //     setUnreadCounts((prev) => ({ ...prev, ...newCounts }));
  //   });

  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      const counts = {};

      snapshot.docs.forEach((doc) => {
        const msg = doc.data();
        if (msg.userId === auth.currentUser.uid && !msg.isRead) {
          counts[msg.senderId] = (counts[msg.senderId] || 0) + 1;
        }
      });

      setUnreadCounts(counts); // update unread counts live
    });

    return () => unsubscribe();
  }, []);

  // ----------------------
  // OPEN CHAT AND RESET UNREAD
  // ----------------------
  const openChat = async (user) => {
    setSelectedUser(user);

    // Reset unread messages for this chat in Firestore
    const unreadQuery = query(
      collection(db, "chats"),
      where("senderId", "==", user.id),
      where("userId", "==", auth.currentUser.uid),
      where("isRead", "==", false)
    );

    const unreadSnapshot = await getDocs(unreadQuery);
    unreadSnapshot.forEach(async (docSnap) => {
      await updateDoc(doc(db, "chats", docSnap.id), { isRead: true });
    });

    // Reset local unread count immediately
    setUnreadCounts((prev) => ({ ...prev, [user.id]: 0 }));
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createGroup = async () => {
    if (!groupName || selectedParticipants.length === 0) {
      alert("Provide a group name and select participants.");
      return;
    }
    const groupData = {
      name: groupName,
      participants: [auth.currentUser.uid, ...selectedParticipants],
      createdAt: new Date(),
      createdBy: auth.currentUser.uid,
      participantCount: selectedParticipants.length + 1,
    };
    await addDoc(collection(db, "groups"), groupData);
    setShowGroupModal(false);
    setGroupName("");
    setSelectedParticipants([]);
    alert("Group created successfully!");
  };

  const logout = async () => {
    await updateUserStatus(false);
    await auth.signOut();
    navigate("/");
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list text-white">
      <div className="d-flex justify-content-between align-items-center">
        <Col xs={6} md={4}>
          <h3 className="fw-bold mb-0">Chat</h3>
        </Col>

        {/* 🧩 Show loading text until currentUserData is fetched */}
        {!currentUserData && (
          <div className="text-white text-end">
            <small>Loading user...</small>
          </div>
        )}

        {/* 🧩 Once user data is available, show user profile + menu */}
        {currentUserData && (
          <div className="current-user-profile d-flex align-items-center">
            <span
              className={`status-indicator ${
                currentUserData.isOnline ? "online" : "offline"
              }`}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                marginRight: 8,
                backgroundColor: currentUserData.isOnline ? "green" : "red",
              }}
            />
            <div style={{ marginRight: 8 }}>
              {getUserProfileImage(currentUserData.email)}
            </div>
            <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="button"
                bsPrefix="p-2"
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
      <Form className="mb-3 shadow-sm rounded-2">
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      {filteredUsers.map((user) => {
        const lastMessage = lastMessages[user.id] || {};
        const unreadCount = unreadCounts[user.id] || 0;
        return (
          <div
            key={user.id}
            onClick={() => openChat(user)}
            className="chat-item rounded-3 mb-2 p-3
            "
          >
            <div className="chat-item-info d-flex align-items-start gap-3">
              {getUserProfileImage(user.email)}

              <div className="flex-grow-1 d-flex flex-column">
                {/* Top row: Name and Time */}
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h6 className="mb-0 fw-semibold text-truncate me-2">
                    {user.name || "Unknown User"}
                  </h6>
                  <small
                    className="text-muted text-white-50 fw-bold"
                    style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}
                  >
                    {formatTimestamp(lastMessage.timestamp)}
                  </small>
                </div>

                {/* Bottom row: Last message and unread count */}
                <div className="d-flex align-items-center justify-content-between">
                  <p
                    className="mb-0 text-muted text-white-50 text-truncate"
                    style={{
                      fontSize: "0.775rem",
                      maxWidth: "200px",
                    }}
                  >
                    {lastMessage.text || "No messages yet"}
                  </p>

                  {unreadCount > 0 && (
                    <span
                      className="unread-count badge bg-success rounded-pill ms-2"
                      style={{
                        minWidth: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
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
