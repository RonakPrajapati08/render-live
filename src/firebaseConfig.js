// // // firebaseConfig.js

// //Without error SDK Firebase notification not support in browser
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   setPersistence,
//   browserLocalPersistence,
//   onAuthStateChanged,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
//   collection,
//   getDocs,
//   onSnapshot,
// } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Add getToken import here
// import { getFunctions } from "firebase/functions"; // 👈 Added

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCpR8pjfUxza301B5zqQVqDr1XrIe8j1XQ",
//   authDomain: "chat-app-d18c2.firebaseapp.com",
//   databaseURL: "https://chat-app-d18c2-default-rtdb.firebaseio.com",
//   projectId: "chat-app-d18c2",
//   storageBucket: "chat-app-d18c2.firebasestorage.app",
//   messagingSenderId: "409837506937",
//   appId: "1:409837506937:web:12768c8b363932946f1fa8",
//   measurementId: "G-FKKPXQJF9Q",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();
// const db = getFirestore(app);
// const storage = getStorage(app);
// const functions = getFunctions(app); // 👈 Added
// const messaging = getMessaging(app);

// const CURRENT_VERSION = "1.0.5"; // 🔹 Change version number on every deploy
// const VERSION_KEY = "app_version";

// if (localStorage.getItem(VERSION_KEY) !== CURRENT_VERSION) {
//   console.log("🧹 New version detected, clearing old caches & SWs...");

//   // Unregister all service workers
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.getRegistrations().then((registrations) => {
//       registrations.forEach((registration) => {
//         registration.unregister().then(() => {
//           console.log("🧹 Old SW unregistered:", registration.scope);
//         });
//       });
//     });
//   }

//   // Delete all caches
//   if (window.caches) {
//     caches.keys().then((cacheNames) => {
//       cacheNames.forEach((name) => {
//         caches.delete(name).then(() => console.log("🧹 Cache deleted:", name));
//       });
//     });
//   }

//   // Save current version to localStorage
//   localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
// }

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/render-live/firebase-messaging-sw.js")
//     .then((registration) => console.log("SW registered", registration))
//     .catch((err) => console.error("SW registration failed", err));
// }

// // 🔥 Set authentication persistence (Keeps user logged in even after refresh)
// setPersistence(auth, browserLocalPersistence)
//   .then(() => {
//     console.log("Auth persistence enabled");
//   })
//   .catch((error) => {
//     console.error("Auth persistence error:", error);
//   });

// const updateChatsWithParticipants = async () => {
//   const chatsCollection = collection(db, "chats");
//   const querySnapshot = await getDocs(chatsCollection);

//   querySnapshot.forEach(async (chatDoc) => {
//     const chatData = chatDoc.data();

//     if (chatData.senderId && chatData.userId) {
//       const participantsArray = [chatData.senderId, chatData.userId];

//       await updateDoc(doc(db, "chats", chatDoc.id), {
//         participants: participantsArray,
//       });

//       // console.log(
//       //   `Updated chat ${chatDoc.id} with participants`,
//       //   participantsArray
//       // );
//     }
//   });

//   console.log("All chat documents updated successfully!");
// };

// updateChatsWithParticipants();

// // Function to check and set user profile
// const checkUserProfile = async (user) => {
//   const userDocRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(userDocRef);

//   if (!docSnap.exists()) {
//     // User does not have a profile, set default profile information
//     await setDoc(userDocRef, {
//       name: user.displayName || "Unknown",
//       email: user.email || "Unknown",
//       isOnline: true,
//       lastMessage: "",
//     });
//   } else {
//     // Profile exists, just update the online status
//     await updateDoc(userDocRef, { isOnline: true });
//   }
// };

// // Listen for authentication state changes (log in/out)
// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     await checkUserProfile(user); // Ensure user has a profile in Firestore
//     await updateUserStatus(user.uid, true);
//     // await requestNotificationPermission(user);
//   } else {
//     // User is signed out, set their status to offline
//     const userId = auth.currentUser?.uid;
//     if (userId) {
//       updateUserStatus(userId.uid, false); // Set the user as offline
//     }
//   }
// });

// // Function to update the user status in Firestore
// const updateUserStatus = async (userId, status) => {
//   const userDocRef = doc(db, "users", userId);

//   try {
//     await updateDoc(userDocRef, { isOnline: status });
//     console.log("User status updated successfully");
//   } catch (error) {
//     console.error("Error updating user status:", error);
//   }
// };

// // Function to request push notification permission and get the FCM token
// // const requestNotificationPermission = async () => {
// //   if ("serviceWorker" in navigator && messaging) {
// //     try {
// //       const token = await getToken(messaging, {
// //         vapidKey:
// //           "BBDvONRa7kLZ6Oq334_gd1lb4VAls6uhcxxZ0kDzm12N38T09sb7rKEbbkK8Dmxl27unIN_tBu7Lr9DoqvP7XGg",
// //       });
// //       if (token && auth.currentUser) {
// //         console.log("Notification Token:", token);
// //         await setDoc(
// //           doc(db, "users", auth.currentUser.uid),
// //           { fcmToken: token },
// //           { merge: true }
// //         );
// //         console.log("FCM token saved:", token);
// //       }
// //     } catch (error) {
// //       console.error("Error getting notification token:", error);
// //     }
// //   } else {
// //     console.warn("Push notifications are not supported on this browser.");
// //   }
// // };
// const requestNotificationPermission = async () => {
//   if (!("Notification" in window)) {
//     console.warn("This browser does not support notifications.");
//     return;
//   }

//   try {
//     // Ask user for permission first
//     const permission = await Notification.requestPermission();

//     if (permission === "granted") {
//       console.log("Notification permission granted.");

//       // Register your SW (for GitHub Pages)
//       const registration = await navigator.serviceWorker.register(
//         '/render-live/firebase-messaging-sw.js'
//       );

//       const token = await getToken(messaging, {
//         vapidKey:
//           "BBDvONRa7kLZ6Oq334_gd1lb4VAls6uhcxxZ0kDzm12N38T09sb7rKEbbkK8Dmxl27unIN_tBu7Lr9DoqvP7XGg",
//         serviceWorkerRegistration: registration,
//       });

//       if (token && auth.currentUser) {
//         console.log("Notification Token:", token);
//         await setDoc(
//           doc(db, "users", auth.currentUser.uid),
//           { fcmToken: token },
//           { merge: true }
//         );
//         console.log("FCM token saved:", token);
//       }
//     } else if (permission === "denied") {
//       console.warn("Notification permission denied by user.");
//       alert(
//         "You blocked notifications. Please enable them from your browser settings to receive messages."
//       );
//     } else {
//       console.log("Notification permission dismissed or not granted.");
//     }
//   } catch (error) {
//     console.error("Error getting notification token:", error);
//   }
// };
// // ✅ Function to request notification permission and generate token if needed
// // ✅ Generate FCM Token Automatically on Login (No Notification Permission)
// // const requestNotificationPermission = async (user) => {
// //   if (!user) return;

// //   try {
// //     const userRef = doc(db, "users", user.uid);
// //     const userSnap = await getDoc(userRef);

// //     // Check if FCM token already exists
// //     const existingToken = userSnap.exists() ? userSnap.data().fcmToken : null;

// //     if (existingToken) {
// //       console.log("✅ FCM token already exists for this user. Skipping...");
// //       return;
// //     }

// //     console.log("📱 Generating new FCM token without permission prompt...");
// //     const token = await getToken(messaging, {
// //       vapidKey:
// //         "BBDvONRa7kLZ6Oq334_gd1lb4VAls6uhcxxZ0kDzm12N38T09sb7rKEbbkK8Dmxl27unIN_tBu7Lr9DoqvP7XGg",
// //     });

// //     if (token) {
// //       await setDoc(
// //         userRef,
// //         { fcmToken: token },
// //         { merge: true } // merge ensures existing user data stays intact
// //       );
// //       console.log("✅ FCM token saved for user:", token);
// //     } else {
// //       console.warn("⚠️ FCM token not generated (possibly blocked or unsupported).");
// //     }
// //   } catch (error) {
// //     console.error("❌ Error generating FCM token:", error);
// //   }
// // };



// // Listen for foreground messages
// onMessage(messaging, (payload) => {
//   console.log("Foreground message:", payload);
//   new Notification(payload.notification?.title, {
//     body: payload.notification?.body,
//     icon: "/favicon.ico",
//   });
// });

// // Listen to Firestore messages collection for new messages (simulate WhatsApp)
// const listenForMessages = (currentUserId) => {
//   const messagesRef = collection(db, "messages");
//   onSnapshot(messagesRef, (snapshot) => {
//     snapshot.docChanges().forEach((change) => {
//       if (change.type === "added") {
//         const message = change.doc.data();
//         if (message.receiverId === currentUserId) {
//           // Show notification
//           new Notification(message.senderName || "New message", {
//             body: message.text,
//             icon: "/favicon.ico",
//           });
//         }
//       }
//     });
//   });
// };

// // Export necessary Firebase functions and constants
// export {
//   auth,
//   googleProvider,
//   db,
//   storage,
//   onMessage,
//   getToken,
//   messaging,
//   updateUserStatus,
//   requestNotificationPermission,
//   listenForMessages,
//   functions, // 👈 Added
// };


//admin and normal user role set up can be done from firebase console manually
// // firebaseConfig.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  createUserWithEmailAndPassword, // 🟢 NEW: For admin creating users
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFunctions } from "firebase/functions";


// 🔹 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpR8pjfUxza301B5zqQVqDr1XrIe8j1XQ",
  authDomain: "chat-app-d18c2.firebaseapp.com",
  databaseURL: "https://chat-app-d18c2-default-rtdb.firebaseio.com",
  projectId: "chat-app-d18c2",
  storageBucket: "chat-app-d18c2.firebasestorage.app",
  messagingSenderId: "409837506937",
  appId: "1:409837506937:web:12768c8b363932946f1fa8",
  measurementId: "G-FKKPXQJF9Q",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const messaging = getMessaging(app);

// 🟢 NEW: Secondary App (for admin to create users without logout)
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
const secondaryAuth = getAuth(secondaryApp); // 🟢 Admin will use this to create users


// 🧹 Version check for SW/cache clearing
const CURRENT_VERSION = "1.0.5";
const VERSION_KEY = "app_version";

if (localStorage.getItem(VERSION_KEY) !== CURRENT_VERSION) {
  console.log("🧹 New version detected, clearing old caches & SWs...");

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister().then(() => {
          console.log("🧹 Old SW unregistered:", registration.scope);
        });
      });
    });
  }

  if (window.caches) {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((name) => {
        caches.delete(name).then(() => console.log("🧹 Cache deleted:", name));
      });
    });
  }

  localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
}

// Register SW
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/render-live/firebase-messaging-sw.js")
    .then((registration) => console.log("SW registered", registration))
    .catch((err) => console.error("SW registration failed", err));
}

// 🔐 Auth persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence enabled");
  })
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });

// 🧩 Update chats with participants (cleanup helper)
const updateChatsWithParticipants = async () => {
  const chatsCollection = collection(db, "chats");
  const querySnapshot = await getDocs(chatsCollection);

  querySnapshot.forEach(async (chatDoc) => {
    const chatData = chatDoc.data();

    if (chatData.senderId && chatData.userId) {
      const participantsArray = [chatData.senderId, chatData.userId];
      await updateDoc(doc(db, "chats", chatDoc.id), {
        participants: participantsArray,
      });
    }
  });

  console.log("All chat documents updated successfully!");
};

updateChatsWithParticipants();

// 🔧 Ensure user profile exists
const checkUserProfile = async (user) => {
  const userDocRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    await setDoc(userDocRef, {
      name: user.displayName || "Unknown",
      email: user.email || "Unknown",
      isOnline: true,
      lastMessage: "",
      roleId: 2, // 🟢 NEW: Default role (Normal User)
    });
  } else {
    const data = docSnap.data();
    // 🟢 Add missing roleId if not present
    if (!data.roleId) {
      await updateDoc(userDocRef, { roleId: 2 });
    }
    await updateDoc(userDocRef, { isOnline: true });
  }
};

// 🔁 Auth state change
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await checkUserProfile(user);
    await updateUserStatus(user.uid, true);
  } else {
    const userId = auth.currentUser?.uid;
    if (userId) {
      updateUserStatus(userId, false);
    }
  }
});

// 👤 Update user online/offline
const updateUserStatus = async (userId, status) => {
  const userDocRef = doc(db, "users", userId);
  try {
    await updateDoc(userDocRef, { isOnline: status });
    console.log("User status updated successfully");
  } catch (error) {
    console.error("Error updating user status:", error);
  }
};

// 🔔 Notifications
const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.warn("This browser does not support notifications.");
    return;
  }

  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");
      const registration = await navigator.serviceWorker.register(
        '/render-live/firebase-messaging-sw.js'
      );

      const token = await getToken(messaging, {
        vapidKey:
          "BBDvONRa7kLZ6Oq334_gd1lb4VAls6uhcxxZ0kDzm12N38T09sb7rKEbbkK8Dmxl27unIN_tBu7Lr9DoqvP7XGg",
        serviceWorkerRegistration: registration,
      });

      if (token && auth.currentUser) {
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          { fcmToken: token },
          { merge: true }
        );
        console.log("FCM token saved:", token);
      }
    } else if (permission === "denied") {
      console.warn("Notification permission denied by user.");
      alert(
        "You blocked notifications. Please enable them from your browser settings."
      );
    } else {
      console.log("Notification permission dismissed or not granted.");
    }
  } catch (error) {
    console.error("Error getting notification token:", error);
  }
};

// 🔔 Foreground listener
onMessage(messaging, (payload) => {
  console.log("Foreground message:", payload);
  new Notification(payload.notification?.title, {
    body: payload.notification?.body,
    icon: "/favicon.ico",
  });
});

// 📩 Listen to messages
const listenForMessages = (currentUserId) => {
  const messagesRef = collection(db, "messages");
  onSnapshot(messagesRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const message = change.doc.data();
        if (message.receiverId === currentUserId) {
          new Notification(message.senderName || "New message", {
            body: message.text,
            icon: "/favicon.ico",
          });
        }
      }
    });
  });
};

// 🟢 NEW: Admin create user function
 const createUserByAdmin = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      password
    );
    const newUser = userCredential.user;

    // ✅ Create Firestore record
    await setDoc(doc(db, "users", newUser.uid), {
      name,
      email,
      roleId: 2, // normal user
      createdAt: new Date(),
      isOnline: false,
    });

    console.log("✅ User created successfully by Admin:", newUser.uid);

    // ✅ Important: logout secondary auth session
    await signOut(secondaryAuth);
    console.log("👋 Secondary auth signed out after creation");

    return newUser;
  } catch (error) {
    console.error("❌ Error creating user by Admin:", error);
    throw error;
  }
};



// 🚀 Export everything
export {
  auth,
  googleProvider,
  db,
  storage,
  onMessage,
  getToken,
  messaging,
  updateUserStatus,
  requestNotificationPermission,
  listenForMessages,
  functions,
  // 🟢 NEW exports
  secondaryAuth,
  createUserByAdmin,
};
