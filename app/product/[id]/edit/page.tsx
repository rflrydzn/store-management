import { ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/lib/types";
import Link from "next/link";
import EditProductForm from "@/components/edit-product-form";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: product } = await supabase
    .from("items")
    .select(
      `
    *,
    categories (
      id,
      name
    ),
    suppliers (
      id,
      name
    ),
    locations!items_location_id_fkey (
      id,
      name
    )
  `,
    )
    .eq("id", id)
    .single<Product>();

  // Fetch all categories for the dropdown
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  // Fetch all suppliers for the dropdown
  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("id, name")
    .order("name");

  // Fetch all locations for the dropdown
  const { data: locations } = await supabase
    .from("locations")
    .select("id, name")
    .order("name");

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <Link
            href={`/product/${id}`}
            className="text-gray-800 dark:text-gray-200 flex size-12 shrink-0 items-center cursor-pointer"
          >
            <span className="material-symbols-outlined">
              <ChevronLeft />
            </span>
          </Link>
          <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Edit Product
          </h2>
          <div className="w-12" />
        </div>
      </div>
      <main className="max-w-md mx-auto pb-24">
        <EditProductForm
          product={product}
          categories={categories || []}
          suppliers={suppliers || []}
          locations={locations || []}
        />
      </main>
    </div>
  );
}
