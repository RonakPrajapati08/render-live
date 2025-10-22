const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNewMessageNotification = functions.firestore
  .document("chats/{chatId}/{messageId}")
  .onCreate(async (snapshot, context) => {
    const message = snapshot.data();

    // ✅ Safety checks
    if (!message || !message.userId || !message.senderId) {
      console.log("Missing required fields in message:", message);
      return null;
    }

    try {
      // 🔹 Get receiver details
      const receiverRef = admin.firestore().collection("users").doc(message.userId); //userId is receiverId
      const receiverDoc = await receiverRef.get();

      if (!receiverDoc.exists) {
        console.log("Receiver not found:", message.userId);
        return null;
      }

      const receiverData = receiverDoc.data();
      const fcmToken = receiverData.fcmToken;

      if (!fcmToken) {
        console.log("Receiver has no FCM token:", message.userId);
        return null;
      }

      // 🔹 Get sender details (optional for notification title)
      let senderName = "New Message";
      const senderRef = admin.firestore().collection("users").doc(message.senderId);
      const senderDoc = await senderRef.get();
      if (senderDoc.exists) {
        senderName = senderDoc.data().name || "New Message";
      }

      // 🔹 Create Notification Payload
      const payload = {
        notification: {
          title: senderName,
          body: message.text || "You have a new message!",
          icon: "./favicon.png",
        },
        data: {
          chatId: context.params.chatId,
          senderId: message.senderId,
          userId: message.userId,
        },
      };

      // 🔹 Send Push Notification
      await admin.messaging().sendToDevice(fcmToken, payload);
      console.log("✅ Notification sent to:", receiverData.name || receiverData.email);

      return null;
    } catch (error) {
      console.error("❌ Error sending notification:", error);
      return null;
    }
  });
