"use client";

import { useState, useMemo } from "react";
import CategoryFilter from "@/components/category-filter";
import ProductList from "@/components/product-list";
import SearchFilter from "@/components/search-filter";
import { Product, Category } from "@/lib/types";

interface InventoryPageProps {
  products: Product[];
  categories: Category[];
}

export default function InventoryPage({
  products,
  categories,
}: InventoryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        !selectedCategory || product.category_id === selectedCategory;
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, search]);

  return (
    <>
      <section className="px-4 py-2 sticky top-18 z-40 bg-background">
        <div className="flex flex-col gap-4">
          <SearchFilter value={search} onChange={setSearch} />

          <CategoryFilter
            categories={categories}
            onSelect={(categoryId) => setSelectedCategory(categoryId)}
            selected={selectedCategory}
          />
        </div>
      </section>

      <ProductList products={filteredProducts} />
    </>
  );
}
