import express from "express";
import { createOrder, getOrders } from "../models/order-model.ts"; // Ändra till din faktiska sökväg

// Skapa ny order
export const createOrderController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const {
      customer_first_name,
      customer_last_name,
      customer_address,
      customer_city,
      customer_postcode,
      customer_phone,
      customer_email,
      order_items,
      order_total,
    } = req.body;

    const serializedItems =
      typeof order_items === "object"
        ? JSON.stringify(order_items)
        : order_items;

    if (
      !customer_first_name ||
      !customer_last_name ||
      !customer_address ||
      !customer_city ||
      !customer_postcode ||
      !customer_email ||
      !serializedItems ||
      !order_total
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const insertId = await createOrder({
      customer_first_name,
      customer_last_name,
      customer_address,
      customer_city,
      customer_postcode,
      customer_phone,
      customer_email,
      order_items: serializedItems,
      order_total,
    });

    res.status(201).json({ message: "Order created", id: insertId });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Hämta alla ordrar (för Postman / Admin)
export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();

    // Gör om order_items från JSON-sträng tillbaka till objekt innan det skickas till Postman
    const formattedOrders = orders.map((order) => ({
      ...order,
      order_items:
        typeof order.order_items === "string"
          ? JSON.parse(order.order_items)
          : order.order_items,
    }));

    res.status(200).json(formattedOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
