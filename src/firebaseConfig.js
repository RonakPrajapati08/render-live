// // firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   FacebookAuthProvider,
// } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";

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
// const facebookProvider = new FacebookAuthProvider();
// const db = getFirestore(app);

// // Function to update the user status in Firestore
// const updateUserStatus = async (userId, status) => {
//   const userDocRef = doc(db, "users", userId);

//   try {
//     // Check if the document exists
//     const docSnap = await getDoc(userDocRef);

//     if (docSnap.exists()) {
//       // Document exists, update status
//       await updateDoc(userDocRef, { isOnline: status });
//       console.log("User status updated successfully");
//     } else {
//       // Document does not exist, create it with initial data
//       await setDoc(userDocRef, {
//         isOnline: status,
//         name: "Unknown",
//         lastMessage: "",
//       });
//       console.log("User document created and status set");
//     }
//   } catch (error) {
//     console.error("Error updating or creating user document:", error);
//   }
// };

// // Listen for authentication state changes (log in/out)
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, update their online status
//     const userId = user.uid;
//     updateUserStatus(userId, true); // Set the user as online
//   } else {
//     // User is signed out, set their status to offline
//     const userId = auth.currentUser?.uid;
//     if (userId) {
//       updateUserStatus(userId, false); // Set the user as offline if needed
//     }
//   }
// });

// // Export necessary Firebase functions and constants
// export { auth, googleProvider, facebookProvider, db, updateUserStatus };

//New code

// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   // FacebookAuthProvider,
// } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

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
// // const facebookProvider = new FacebookAuthProvider();
// const db = getFirestore(app);
// const storage = getStorage(app);

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
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     checkUserProfile(user); // Ensure user has a profile in Firestore
//   } else {
//     // User is signed out, set their status to offline
//     const userId = auth.currentUser?.uid;
//     if (userId) {
//       updateUserStatus(userId, false); // Set the user as offline
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

// // Export necessary Firebase functions and constants
// export {
//   auth,
//   googleProvider,
//   // facebookProvider,
//   db,
//   storage,
//   updateUserStatus,
// };

//Notification add

// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getMessaging, getToken } from "firebase/messaging"; // Add getToken import here

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
// const messaging = getMessaging(app);

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
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     checkUserProfile(user); // Ensure user has a profile in Firestore
//   } else {
//     // User is signed out, set their status to offline
//     const userId = auth.currentUser?.uid;
//     if (userId) {
//       updateUserStatus(userId, false); // Set the user as offline
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
// const requestNotificationPermission = async () => {
//   try {
//     const token = await getToken(messaging, {
//       vapidKey:
//         "BKSGTotW4YVLXEvvbkGDpLaQhWnw-_vd75zprPpxXlwu7Bj02o7L2b_574rqLIepAhChL8Ty4p8TEnyrdzO8rkA",
//     });
//     if (token) {
//       console.log("Notification Token:", token);
//       await setDoc(
//         doc(db, "users", auth.currentUser.uid),
//         { fcmToken: token },
//         { merge: true }
//       );
//     }
//   } catch (error) {
//     console.error("Error getting notification token:", error);
//   }
// };

// // Export necessary Firebase functions and constants
// export {
//   auth,
//   googleProvider,
//   db,
//   storage,
//   updateUserStatus,
//   messaging,
//   requestNotificationPermission,
// };

//Without error SDK Firebase notification not support in browser
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Add getToken import here

// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
// const messaging = getMessaging(app);
// Check for service worker support before proceeding with messaging
let messaging;
if ("serviceWorker" in navigator) {
  messaging = getMessaging(app);
} else {
  console.warn(
    "Service Workers are not  supported in this browser. Push notifications won't work."
  );
}

// 🔥 Set authentication persistence (Keeps user logged in even after refresh)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence enabled");
  })
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });

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

      console.log(
        `Updated chat ${chatDoc.id} with participants`,
        participantsArray
      );
    }
  });

  console.log("All chat documents updated successfully!");
};

updateChatsWithParticipants();

// Function to check and set user profile
const checkUserProfile = async (user) => {
  const userDocRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    // User does not have a profile, set default profile information
    await setDoc(userDocRef, {
      name: user.displayName || "Unknown",
      email: user.email || "Unknown",
      isOnline: true,
      lastMessage: "",
    });
  } else {
    // Profile exists, just update the online status
    await updateDoc(userDocRef, { isOnline: true });
  }
};

// Listen for authentication state changes (log in/out)
onAuthStateChanged(auth, (user) => {
  if (user) {
    checkUserProfile(user); // Ensure user has a profile in Firestore
  } else {
    // User is signed out, set their status to offline
    const userId = auth.currentUser?.uid;
    if (userId) {
      updateUserStatus(userId, false); // Set the user as offline
    }
  }
});

// Function to update the user status in Firestore
const updateUserStatus = async (userId, status) => {
  const userDocRef = doc(db, "users", userId);

  try {
    await updateDoc(userDocRef, { isOnline: status });
    console.log("User status updated successfully");
  } catch (error) {
    console.error("Error updating user status:", error);
  }
};

// Function to request push notification permission and get the FCM token
const requestNotificationPermission = async () => {
  if ("serviceWorker" in navigator && messaging) {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BKSGTotW4YVLXEvvbkGDpLaQhWnw-_vd75zprPpxXlwu7Bj02o7L2b_574rqLIepAhChL8Ty4p8TEnyrdzO8rkA",
      });
      if (token) {
        console.log("Notification Token:", token);
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          { fcmToken: token },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error getting notification token:", error);
    }
  } else {
    console.warn("Push notifications are not supported on this browser.");
  }
};

// Export necessary Firebase functions and constants
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
};

// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
//   increment,
// } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

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
//       unreadCount: 0, // Initialize unread count
//     });
//   } else {
//     // Profile exists, just update the online status
//     await updateDoc(userDocRef, { isOnline: true });
//   }
// };

// // Listen for authentication state changes (log in/out)
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     checkUserProfile(user); // Ensure user has a profile in Firestore
//   } else {
//     // User is signed out, set their status to offline
//     const userId = auth.currentUser?.uid;
//     if (userId) {
//       updateUserStatus(userId, false); // Set the user as offline
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

// // Function to increment unread message count
// const incrementUnreadCount = async (receiverId) => {
//   const userDocRef = doc(db, "users", receiverId);
//   await updateDoc(userDocRef, {
//     unreadCount: increment(1), // Increment unread count
//   });
// };

// // Function to decrement unread message count when messages are read
// const decrementUnreadCount = async (receiverId) => {
//   const userDocRef = doc(db, "users", receiverId);
//   await updateDoc(userDocRef, {
//     unreadCount: increment(-1), // Decrement unread count
//   });
// };

// // Export necessary Firebase functions and constants
// export {
//   auth,
//   googleProvider,
//   db,
//   storage,
//   updateUserStatus,
//   incrementUnreadCount,
//   decrementUnreadCount,
// };
