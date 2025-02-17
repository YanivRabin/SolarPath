import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = require("../../firebase-service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = getFirestore();

export { db };
