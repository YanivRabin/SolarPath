import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = require("../../firebase-service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const db = getFirestore();
const bucket = admin.storage().bucket();

export { db, bucket };
