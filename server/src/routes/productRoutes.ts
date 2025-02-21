import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
} from "../controllers/productController";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "colorImages", maxCount: 5 },
    { name: "specSheetLink", maxCount: 1 },
  ]),
  createProduct
);

export default router;