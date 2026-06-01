import express from "express";
import { getAllProducts, getProductById } from "../models/product-model.ts";

// Controller för att hämta alla produkter
export const getProducts = (req: Request, res: Response) => {
  getAllProducts((err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Kunde inte hämta produkter" });
    }
    res.json(products);
  });
};

// Controller för att hämta en produkt via ID
export const getProduct = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Ogiltigt produkt-ID" });
  }

  getProductById(id, (err, product) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Kunde inte hämta produkten" });
    }

    if (!product) {
      return res.status(404).json({ error: "Produkten hittades inte" });
    }

    res.json(product);
  });
};
