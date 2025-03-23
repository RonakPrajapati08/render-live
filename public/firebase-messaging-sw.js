// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCpR8pjfUxza301B5zqQVqDr1XrIe8j1XQ",
  authDomain: "chat-app-d18c2.firebaseapp.com",
  projectId: "chat-app-d18c2",
  storageBucket: "chat-app-d18c2.firebasestorage.app",
  messagingSenderId: "409837506937",
  appId: "1:409837506937:web:12768c8b363932946f1fa8",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
