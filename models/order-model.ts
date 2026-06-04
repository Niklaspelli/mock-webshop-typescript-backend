import { db } from "../db/db.ts";

// Base-interfacet för det som skickas IN till databasen
export interface OrderInput {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_city: string;
  customer_postcode: string;
  customer_phone?: string;
  customer_email: string;
  order_items: string;
  order_total: number;
}

// Interfacet för det som kommer UT ur databasen (ärver allt ovan + id och datum)
export interface OrderRow extends OrderInput {
  id: number;
  created_at: string;
}
export const createOrder = async (order: OrderInput): Promise<number> => {
  const sql = `
    INSERT INTO orders (customer_first_name, customer_last_name, customer_address, customer_city, customer_postcode, customer_phone, customer_email, order_items, order_total, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        order.customer_first_name,
        order.customer_last_name,
        order.customer_address,
        order.customer_city,
        order.customer_postcode,
        order.customer_phone,
        order.customer_email,
        order.order_items,
        order.order_total,
      ],
      (err, result: any) => {
        if (err) return reject(err);
        resolve(result.insertId);
      },
    );
  });
};

export const getOrders = async (): Promise<OrderRow[]> => {
  const sql = `
    SELECT id, customer_first_name, customer_last_name, customer_address, customer_city, customer_postcode, customer_phone, customer_email, order_items, order_total, created_at 
    FROM orders 
    ORDER BY created_at DESC
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, results: any) => {
      if (err) return reject(err);
      resolve(results as OrderRow[]);
    });
  });
};
