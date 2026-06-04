import express from "express";
import {
  getOrdersController,
  createOrderController,
} from "../controllers/orderController.ts";
const OrderRoutes = express.Router();

OrderRoutes.get("/", getOrdersController);
OrderRoutes.post("/", createOrderController);

export default OrderRoutes;
