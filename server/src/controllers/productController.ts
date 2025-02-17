import { Request, Response } from "express";
import { db } from "../config/firebase";
import { Product } from "../models/productModel";
import NodeCache from "node-cache";

// Cache lasts for 1 week (7 days)
export const cache = new NodeCache({ stdTTL: 7 * 24 * 60 * 60, checkperiod: 7 * 24 * 60 * 60 });

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, image, colors, additionalInfo } = req.body;

    // Validate required fields
    if (!name || !category || !image || !colors || !additionalInfo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Use Product model for TypeScript safety
    const newProduct: Omit<Product, "id"> = {
      name,
      category,
      image,
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

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if product exists in cache
    const cachedProduct = cache.get(id);
    if (cachedProduct) {
      console.log("Serving from cache");
      return res.json(cachedProduct);
    }

    console.log("Fetching from Firestore...");
    const doc = await db.collection("products").doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product: Product = { id: doc.id, ...doc.data() } as Product;

    // Store in cache (1 week)
    cache.set(id, product);

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
}