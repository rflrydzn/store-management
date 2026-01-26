import { Product } from "@/lib/types";
import Link from "next/link";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <section className="px-4 pt-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold tracking-tight">Product List</h3>
        <span className="text-xs font-medium text-slate-500 uppercase">
          Sort: A-Z
        </span>
      </div>
      <div className="space-y-3">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <div className="size-14 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <img src={product.image_url} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">
                {product.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {product.categories.name}
              </p>
              {/* <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                  3 left
                </span>
                <span className="text-xs text-slate-400">Stock Out soon</span>
              </div> */}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                ₱{product.selling_price}
              </p>
              <p className="text-[10px] text-slate-400">per pc</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
