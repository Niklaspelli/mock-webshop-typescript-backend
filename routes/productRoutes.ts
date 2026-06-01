import express from "express";
import { getProducts, getProduct } from "../controllers/productController.ts";
const ProductRoutes = express.Router();

ProductRoutes.get("/", getProducts);
ProductRoutes.get("/:id", getProduct);

export default ProductRoutes;
