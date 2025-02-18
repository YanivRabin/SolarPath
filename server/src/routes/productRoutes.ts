import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  // updateProduct,
  // deleteProduct,
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
  ]),
  createProduct
);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

export default router;