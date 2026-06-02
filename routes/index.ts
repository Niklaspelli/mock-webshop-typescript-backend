import express from "express";
import productRoutes from "./productRoutes.ts";

const router = express.Router();

router.use("/products", productRoutes);

export default router;
