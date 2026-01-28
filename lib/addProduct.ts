import { supabase } from "./supabase/client";
import { Product } from "./types";

export type ProductInput = {
  name: string;
  description?: string;
  category_id: string;
  barcode?: number | null;
  cost_price: number;
  selling_price: number;
  supplier_id?: string;
  location_id: string;
  image_url: string | null;
  notes?: string;
};

export async function addProduct(productData: ProductInput) {
  const { data, error } = await supabase
    .from("items")
    .insert({
      name: productData.name,
      description: productData.description,
      category_id: productData.category_id,
      barcode: productData.barcode,
      cost_price: productData.cost_price,
      selling_price: productData.selling_price,
      supplier_id: productData.supplier_id,
      location_id: productData.location_id,
      image_url: productData.image_url,
      notes: productData.notes,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding product:", error);
    throw error;
  }

  return data;
}
