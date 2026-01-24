export type Product = {
  id: string;
  name: string;
  description: string;
  category_id: string;
  barcode: number;
  sku: number;
  cost_price: number;
  selling_price: number;
  quantity: number;
  restock_point: number;
  store_location_id: string;
  supplier_id: string;
  image_url: string;
  expiration_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};
