import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Enable JSON parsing

// Test route
app.get("/", (req, res) => {
  res.send("Express Server is Running!");
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
