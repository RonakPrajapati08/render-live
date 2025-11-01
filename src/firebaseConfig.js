// // firebaseConfig.js

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
  onSnapshot,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Add getToken import here
import { getFunctions } from "firebase/functions"; // 👈 Added

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
const functions = getFunctions(app); // 👈 Added
const messaging = getMessaging(app);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => console.log("SW registered", registration))
    .catch((err) => console.error("SW registration failed", err));
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

      // console.log(
      //   `Updated chat ${chatDoc.id} with participants`,
      //   participantsArray
      // );
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
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await checkUserProfile(user); // Ensure user has a profile in Firestore
    await updateUserStatus(user.uid, true);
    await requestNotificationPermission(user);
  } else {
    // User is signed out, set their status to offline
    const userId = auth.currentUser;
    if (userId) {
      updateUserStatus(userId.uid, false); // Set the user as offline
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
          "BBDvONRa7kLZ6Oq334_gd1lb4VAls6uhcxxZ0kDzm12N38T09sb7rKEbbkK8Dmxl27unIN_tBu7Lr9DoqvP7XGg",
      });
      if (token && auth.currentUser) {
        console.log("Notification Token:", token);
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          { fcmToken: token },
          { merge: true }
        );
        console.log("FCM token saved:", token);
      }
    } catch (error) {
      console.error("Error getting notification token:", error);
    }
  } else {
    console.warn("Push notifications are not supported on this browser.");
  }
};

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("Foreground message:", payload);
  new Notification(payload.notification?.title, {
    body: payload.notification?.body,
    icon: "/favicon.ico",
  });
});

// Listen to Firestore messages collection for new messages (simulate WhatsApp)
const listenForMessages = (currentUserId) => {
  const messagesRef = collection(db, "messages");
  onSnapshot(messagesRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const message = change.doc.data();
        if (message.receiverId === currentUserId) {
          // Show notification
          new Notification(message.senderName || "New message", {
            body: message.text,
            icon: "/favicon.ico",
          });
        }
      }
    });
  });
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
  listenForMessages,
  functions, // 👈 Added
};
