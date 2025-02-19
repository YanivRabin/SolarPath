import { Request, Response } from "express";
import NodeCache from "node-cache";
import { db, bucket } from "../config/firebase";
import { ImageGalleryProps } from "../models/ImageGalleryProps";

// Create a cache instance with a TTL of 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Sanitize the original name to remove invalid characters
const sanitizeName = (originalName: string) =>
  originalName.split(".")[0].replace(/[^a-zA-Z0-9_-]/g, "-");

export const uploadProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing project name" });
    }

    // Files uploaded from the "images" field
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const imageUrls: string[] = [];

    // Loop through each file and upload it to Firebase Storage
    for (const file of files) {
      const fileName = `projects/${sanitizeName(name)}/${Date.now()}_${sanitizeName(
        file.originalname
      )}`;
      const fileUpload = bucket.file(fileName);

      await new Promise<void>((resolve, reject) => {
        const stream = fileUpload.createWriteStream({
          metadata: { contentType: file.mimetype },
        });

        stream.on("error", (error) => {
          console.error("Error uploading image:", error);
          reject(error);
        });

        stream.on("finish", async () => {
          // Make the file public so that it can be accessed via a URL
          await fileUpload.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          imageUrls.push(publicUrl);
          resolve();
        });

        stream.end(file.buffer);
      });
    }

    // Create the project object according to your model
    const projectData: ImageGalleryProps = {
      title: name,
      images: imageUrls,
    };

    // Save the project data to Firestore (assumed collection "projects")
    const docRef = await db.collection("projects").add(projectData);
    const newProject = { id: docRef.id, ...projectData };

    // Optional: update cache if already present
    let cachedProjects = cache.get("projects") as any[];
    if (cachedProjects) {
      // Append new project to the cached array and update cache
      cachedProjects.push(newProject);
      cache.set("projects", cachedProjects);
    }
    // Otherwise, when getAllProjects is called next, it will fetch from Firestore

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error uploading project:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    // Check if projects exist in cache
    const cachedProjects = cache.get("projects");
    if (cachedProjects) {
      console.log("Serving projects from cache");
      return res.json(cachedProjects);
    }

    console.log("Fetching projects from Firestore");
    const snapshot = await db.collection("projects").get();
    const projects = snapshot.docs.map((doc) => {
      const data = doc.data() as ImageGalleryProps;
      return {
        id: doc.id,
        title: data.title,
        images: data.images,
      };
    });

    // Save fetched projects to cache
    cache.set("projects", projects);

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Server error" });
  }
};
