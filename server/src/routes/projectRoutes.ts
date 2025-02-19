import express from "express";
import multer from "multer";
import { uploadProject, getAllProjects } from "../controllers/projectController";

// Configure multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/", upload.array("images"), uploadProject);
router.get("/", getAllProjects);

export default router;
