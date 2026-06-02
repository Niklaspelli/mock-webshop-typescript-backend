import { db } from "../db/db.ts";

// Definiera hur en produkt ser ut i TypeScript
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  stock: number;
}

export const getAllProducts = (
  callback: (err: any, products: any[] | null) => void,
) => {
  const query = `
    SELECT 
      p.*,
      i.id AS image_id, i.view, i.thumbnail, i.large,
      t.id AS tag_id, t.slug, t.name AS tag_name
    FROM products p
    LEFT JOIN product_images i ON p.id = i.product_id
    LEFT JOIN product_tags pt ON p.id = pt.product_id
    LEFT JOIN tags t ON pt.tag_id = t.id;
  `;

  db.query(query, (err, results: any[]) => {
    if (err) return callback(err, null);

    // Vi mappar ihop dubblettrader till ett rent objekt med arrayer
    const productMap: Record<number, any> = {};

    results.forEach((row) => {
      if (!productMap[row.id]) {
        productMap[row.id] = {
          id: row.id,
          name: row.name,
          price: parseFloat(row.price),
          stock_quantity: row.stock_quantity,
          stock_status: row.stock_status,
          on_sale: !!row.on_sale,
          description: row.description,
          images: [],
          tags: [],
        };
      }

      // Lägg till bilden om den finns och inte redan är tillagd
      if (
        row.image_id &&
        !productMap[row.id].images.some((img: any) => img.id === row.image_id)
      ) {
        productMap[row.id].images.push({
          id: row.image_id,
          view: row.view,
          thumbnail: row.thumbnail,
          large: row.large,
        });
      }

      // Lägg till taggen om den finns och inte redan är tillagd
      if (
        row.tag_id &&
        !productMap[row.id].tags.some((tag: any) => tag.id === row.tag_id)
      ) {
        productMap[row.id].tags.push({
          id: row.tag_id,
          slug: row.slug,
          name: row.tag_name,
        });
      }
    });

    callback(null, Object.values(productMap));
  });
};

export const getProductById = (
  id: number,
  callback: (err: any, product: any | null) => void,
) => {
  // Vi återanvänder logiken från getAllProducts men filtrerar på ID först
  getAllProducts((err, products) => {
    if (err) return callback(err, null);
    const product = products?.find((p) => p.id === id) || null;
    callback(null, product);
  });
};
