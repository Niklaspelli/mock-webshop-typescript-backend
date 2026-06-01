import { db } from "../db/db.ts";

// Definiera hur en produkt ser ut i TypeScript
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  stock: number;
}

// Hämta alla produkter
export const getAllProducts = (
  callback: (err: Error | null, results?: Product[]) => void,
) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results as Product[]);
  });
};

// Hämta en specifik produkt baserat på ID
export const getProductById = (
  id: number,
  callback: (err: Error | null, result?: Product) => void,
) => {
  const query = "SELECT * FROM products WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) return callback(err);

    // db.query returnerar alltid en array, så vi plockar ut det första elementet
    const rows = results as Product[];
    callback(null, rows[0]);
  });
};
