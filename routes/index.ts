import express from "express";
import productRoutes from "./productRoutes.ts";
import orderRoutes from "./orderRoutes.ts";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
export default router;
