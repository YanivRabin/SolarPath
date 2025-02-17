import { Request, Response } from "express";
import { db } from "../config/firebase";
import { Product } from "../models/productModel";
import NodeCache from "node-cache";
import { log } from "console";

// Cache lasts for 1 week (7 days)
export const cache = new NodeCache({ stdTTL: 7 * 24 * 60 * 60, checkperiod: 7 * 24 * 60 * 60 });

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, colors, additionalInfo } = req.body;

    // Validate required fields
    if (!name || !category || !colors || !additionalInfo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Use Product model for TypeScript safety
    const newProduct: Omit<Product, "id"> = {
      name,
      category,
      colors,
      additionalInfo,
      createdAt: new Date(), // Timestamp
    };

    // Add product to Firestore
    const docRef = await db.collection("products").add(newProduct);
    const productWithId: Product = { id: docRef.id, ...newProduct };

    // Update cache instead of clearing it
    const cachedProducts = (cache.get("products") as Product[]) || [];
    cache.set("products", [...cachedProducts, productWithId]);

    res.status(201).json(productWithId);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Check if products exist in cache
    const cachedProducts = cache.get("products");
    if (cachedProducts) {
      console.log("Serving from cache");
      return res.json(cachedProducts);
    }

    console.log("Fetching from Firestore...");
    const snapshot = await db.collection("products").orderBy("createdAt", "desc").get();
    const products: Product[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    // Store in cache (1 week)
    cache.set("products", products);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
};