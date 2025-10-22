const admin = require("firebase-admin");
const readline = require("readline");

// ---- Initialize Firebase Admin ----
// Replace with your downloaded service account JSON
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ---- Read user input for custom notification ----
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the FCM device token: ", (fcmToken) => {
  rl.question("Enter the notification title: ", (title) => {
    rl.question("Enter the notification body: ", (body) => {
      
      // Optional: extra data
      const extraData = {
        sentBy: "Manual Test Script",
        timestamp: new Date().toISOString(),
      };

      const message = {
        notification: {
          title,
          body,
        },
        data: extraData,   // optional
        token: fcmToken,
      };

      // Send notification
      admin.messaging()
        .send(message)
        .then((response) => {
          console.log("✅ Notification sent successfully:", response);
          rl.close();
        })
        .catch((error) => {
          console.error("❌ Error sending notification:", error);
          rl.close();
        });
    });
  });
});
