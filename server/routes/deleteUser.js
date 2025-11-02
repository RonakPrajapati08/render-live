const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// 🟢 Make sure admin is already initialized once in your app
// e.g. in server.js you probably already have:
// admin.initializeApp({...})

router.delete("/deleteUser/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    // 1️⃣ Delete from Firestore
    await admin.firestore().collection("users").doc(uid).delete();

    // 2️⃣ Delete from Authentication
    await admin.auth().deleteUser(uid);

    res.status(200).json({ success: true, message: `User ${uid} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Failed to delete user.", error });
  }
});

module.exports = router;
