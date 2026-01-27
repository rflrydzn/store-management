export type Product = {
  id: string;
  name: string;
  description: string;
  category_id: string;
  barcode: number;
  cost_price: number;
  selling_price: number;
  quantity?: number;
  restock_point: number;
  store_location_id: string;
  supplier_id: string;
  location_id: string;
  image_url: string;
  notes: string;
  created_at: string;
  updated_at: string;
  categories: {
    id: string;
    name: string;
  };
  suppliers: {
    id: string;
    name: string;
  };
  locations: {
    id: string;
    name: string;
  };
};

export type Category = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type Supplier = {
  id: string;
  name: string;
};
