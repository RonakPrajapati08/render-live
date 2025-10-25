// // public/firebase-messaging-sw.js
// importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js"
// );
// import {
//   getMessaging,
//   onBackgroundMessage,
// } from "https://www.gstatic.com/firebasejs/10.6.1/firebase-messaging.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyCpR8pjfUxza301B5zqQVqDr1XrIe8j1XQ",
//   authDomain: "chat-app-d18c2.firebaseapp.com",
//   projectId: "chat-app-d18c2",
//   storageBucket: "chat-app-d18c2.firebasestorage.app",
//   messagingSenderId: "409837506937",
//   appId: "1:409837506937:web:12768c8b363932946f1fa8",
// };

// // firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// // const messaging = getMessaging(app);

// const messaging = firebase.messaging();

// // messaging.onBackgroundMessage((payload) => {
// //   console.log(
// //     "[firebase-messaging-sw.js] Received background message",
// //     payload
// //   );

// //   const notificationTitle = payload.notification.title;
// //   const notificationOptions = {
// //     body: payload.notification.body,
// //     icon: payload.notification.icon,
// //   };

// //   self.registration.showNotification(notificationTitle, notificationOptions);
// // });

// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );

//   const notificationTitle = payload.notification?.title || "New Message";
//   const notificationOptions = {
//     body: payload.notification?.body || "You have a new message!",
//     icon: "./images/chatapp192x192.png", // optional
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// public/firebase-messaging-sw.js

// Import Firebase scripts via importScripts
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCpR8pjfUxza301B5zqQVqDr1XrIe8j1XQ",
  authDomain: "chat-app-d18c2.firebaseapp.com",
  projectId: "chat-app-d18c2",
  storageBucket: "chat-app-d18c2.firebasestorage.app",
  messagingSenderId: "409837506937",
  appId: "1:409837506937:web:12768c8b363932946f1fa8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification?.title || "New Message";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message!",
    icon: "/favicon.ico", // or your custom icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // Open PWA homepage on click
  );
});
