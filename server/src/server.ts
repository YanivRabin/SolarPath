import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import productRoutes from "./routes/productRoutes";
import countryRoutes from "./routes/countriesRoutes";
import projectRoutes from "./routes/projectRoutes";
import emailRoutes from "./routes/emailRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
