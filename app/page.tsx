import Header from "@/components/header";
import InventorySummary from "@/components/inventory-summary";
import Navigation from "@/components/navigation";
import InventoryPage from "@/components/inventory-page";
import { supabase } from "@/lib/supabase/client";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { data: products } = await supabase.from("items").select(`
    *,
    categories (
      id,
      name
    )
  `);
  const { data: categories } = await supabase.from("categories").select();

  return (
    <div>
      <Header />
      <main className="max-w-md mx-auto">
        {/* <InventorySummary /> */}

        <InventoryPage
          products={products ?? []}
          categories={categories ?? []}
        />
      </main>

      <Link
        href="/add-product"
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer"
      >
        <Plus />
      </Link>

      <Navigation />
    </div>
  );
}
