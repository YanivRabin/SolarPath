import { Request, Response } from "express";
import { db } from "../config/firebase";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const hashedPassword = await bycrypt.hash(password, 10);
    await db.collection("users").add({ username, password: hashedPassword });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ error: "JWT secret is not defined" });
  }

  if (!username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const userRef = await db
      .collection("users")
      .where("username", "==", username)
      .get();
    if (userRef.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDoc = userRef.docs[0];
    const user = userDoc.data();

    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: userDoc.id, username: user.username },
      jwtSecret,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server error" });
  }
};
