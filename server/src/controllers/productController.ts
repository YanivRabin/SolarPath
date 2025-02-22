import { Request, Response } from "express";
import { db, bucket } from "../config/firebase";
import { Product, ColorOption, ProductInfo } from "../models/productModel";
import NodeCache from "node-cache";

// Cache lasts for 1 week (7 days)
export const cache = new NodeCache({
  stdTTL: 7 * 24 * 60 * 60,
  checkperiod: 7 * 24 * 60 * 60,
});

// Sanitize the original name to remove invalid characters
const sanitizeName = (originalName: string) =>
  originalName.split(".")[0].replace(/[^a-zA-Z0-9_-]/g, "-");

export const createProduct = async (req: Request, res: Response) => {
  try {
    // Extract basic fields from the request body
    const { name, category } = req.body;

    if (!name || !category) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name or category" });
    }

    // Parse colors and additionalInfo if they are sent as JSON strings
    let colors: ColorOption[] = [];
    if (req.body.colors) {
      try {
        colors = JSON.parse(req.body.colors);
      } catch (e) {
        return res
          .status(400)
          .json({ error: "Invalid JSON format for colors" });
      }
    }

    let additionalInfo: ProductInfo[] = [];
    if (req.body.additionalInfo) {
      try {
        additionalInfo = JSON.parse(req.body.additionalInfo);
      } catch (e) {
        return res
          .status(400)
          .json({ error: "Invalid JSON format for additionalInfo" });
      }
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // 1. Process the Main Product Image
    let mainImageUrl = "";
    if (files && files.mainImage && files.mainImage.length > 0) {
      const mainFile = files.mainImage[0];
      const mainFileName = `products/${category}/${sanitizeName(
        name
      )}/main/${Date.now()}_${sanitizeName(mainFile.originalname)}`;
      const mainBlob = bucket.file(mainFileName);
      const mainBlobStream = mainBlob.createWriteStream({
        metadata: { contentType: mainFile.mimetype },
      });

      await new Promise<void>((resolve, reject) => {
        mainBlobStream.on("error", (err) => {
          console.error("Main image upload error:", err);
          reject(err);
        });
        mainBlobStream.on("finish", async () => {
          await mainBlob.makePublic();
          mainImageUrl = `https://storage.googleapis.com/${bucket.name}/${mainBlob.name}`;
          resolve();
        });
        mainBlobStream.end(mainFile.buffer);
      });
    } else {
      return res.status(400).json({ error: "Main image is required" });
    }

    // 2. Process the Color Images
    const colorImageUrls: string[] = [];
    if (files && files.colorImages && Array.isArray(files.colorImages)) {
      // Optional: Check that the number of uploaded color images matches the colors array length
      if (colors.length !== files.colorImages.length) {
        return res.status(400).json({
          error:
            "Number of color images does not match number of color options",
        });
      }
      for (const colorFile of files.colorImages) {
        const colorFileName = `products/${category}/${sanitizeName(
          name
        )}/colors/${Date.now()}_${sanitizeName(colorFile.originalname)}`;
        const colorBlob = bucket.file(colorFileName);
        const colorBlobStream = colorBlob.createWriteStream({
          metadata: { contentType: colorFile.mimetype },
        });

        await new Promise<void>((resolve, reject) => {
          colorBlobStream.on("error", (err) => {
            console.error("Color image upload error:", err);
            reject(err);
          });
          colorBlobStream.on("finish", async () => {
            await colorBlob.makePublic();
            const url = `https://storage.googleapis.com/${bucket.name}/${colorBlob.name}`;
            colorImageUrls.push(url);
            resolve();
          });
          colorBlobStream.end(colorFile.buffer);
        });
      }
    }

    // 3. Attach each uploaded color image URL to its corresponding color option.
    // Assumes the order of color options matches the order of uploaded files.
    if (colors.length > 0 && colorImageUrls.length === colors.length) {
      colors = colors.map((color, index) => ({
        ...color,
        image: colorImageUrls[index],
      }));
    }

    // Process the specSheetLink
    let specSheetLinkUrl = "";
    if (files && files.specSheetLink && files.specSheetLink.length > 0) {
      const specSheetFile = files.specSheetLink[0];
      const specSheetFileName = `products/${category}/${sanitizeName(
        name
      )}/specSheet/${Date.now()}_${sanitizeName(specSheetFile.originalname)}`;
      const specSheetBlob = bucket.file(specSheetFileName);
      const specSheetBlobStream = specSheetBlob.createWriteStream({
        metadata: {
          contentType: specSheetFile.mimetype,
          // Set contentDisposition to "attachment" to force download
          contentDisposition: "attachment",
        },
      });

      await new Promise<void>((resolve, reject) => {
        specSheetBlobStream.on("error", (err) => {
          console.error("Spec sheet upload error:", err);
          reject(err);
        });
        specSheetBlobStream.on("finish", async () => {
          await specSheetBlob.makePublic();
          specSheetLinkUrl = `https://storage.googleapis.com/${bucket.name}/${specSheetBlob.name}`;
          resolve();
        });
        specSheetBlobStream.end(specSheetFile.buffer);
      });
    }
    if (additionalInfo.length > 0) {
      additionalInfo[2].link = specSheetLinkUrl;
    }

    // 4. Create the new product object
    const newProduct: Omit<Product, "id"> = {
      name,
      category,
      image: mainImageUrl,
      colors,
      additionalInfo,
      createdAt: new Date(),
    };

    // 5. Add product to Firestore
    const docRef = await db.collection("products").add(newProduct);
    const productWithId: Product = { id: docRef.id, ...newProduct };

    // update cache
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
    const snapshot = await db
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();
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
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Retrieve the product document first
    const docRef = db.collection("products").doc(id);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productData = docSnapshot.data() as Product;
    const { category, name } = productData;

    // Build the folder prefix for this product's images
    const folderPrefix = `products/${category}/${sanitizeName(name)}`;

    // Delete all files in the folder from storage
    await bucket.deleteFiles({ prefix: folderPrefix });

    // Now delete the product document from Firestore
    await docRef.delete();

    // Remove the product from cache
    cache.del(id);

    // Update the cache of all products
    const cachedProducts = cache.get("products") as Product[];
    if (cachedProducts) {
      cache.set(
        "products",
        cachedProducts.filter((product) => product.id !== id)
      );
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
