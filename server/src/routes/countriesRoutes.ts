import express from "express";
import {
  createCountry,
  createCountries,
  getCountries,
} from "../controllers/countriesController";

const router = express.Router();

router.post("/", createCountry);
router.post("/bulk", createCountries);
router.get("/", getCountries);

export default router;
