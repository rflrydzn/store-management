import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  MessageCircle,
  Pencil,
  Phone,
  Star,
  Warehouse,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FloorPlan from "@/components/floor-plan";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default async function ProductDetails({
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

  const sellingPrice = product?.selling_price ?? 0;
  const costPrice = product?.cost_price ?? 0;
  const profit = sellingPrice - costPrice;
  const margin = (profit / sellingPrice) * 100;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <Link
            href="/"
            className="text-gray-800 dark:text-gray-200 flex size-12 shrink-0 items-center cursor-pointer"
          >
            <span className="material-symbols-outlined">
              <ChevronLeft />
            </span>
          </Link>
          <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Product Details
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex max-w-120 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-gray-900 dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
              <span className="material-symbols-outlined">
                <Pencil />
              </span>
            </button>
          </div>
        </div>
      </div>
      <main className="max-w-md mx-auto pb-24">
        <div className="@container">
          <div className="px-4 py-3">
            <img
              src={product?.image_url}
              alt="Product"
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-xl min-h-80 shadow-sm"
            />
          </div>
        </div>
        <div className="px-4">
          <h1 className="text-gray-900  dark:text-white tracking-tight text-[32px] font-bold leading-tight pt-4">
            {product?.name}
          </h1>
          <p className="text-primary text-sm font-semibold uppercase tracking-wider pb-4">
            Category: {product?.categories?.name}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 p-4">
          <div className="flex min-w-35 flex-1 flex-col gap-1 rounded-xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-tight">
              Cost Price
            </p>
            <p className="text-gray-900 dark:text-white tracking-tight text-xl font-bold leading-tight">
              ₱{product?.cost_price}
            </p>
            <p className="text-gray-400 text-xs font-normal">Per unit</p>
          </div>
          <div className="flex min-w-35 flex-1 flex-col gap-1 rounded-xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-tight">
              Selling Price
            </p>
            <p className="text-gray-900 dark:text-white tracking-tight text-xl font-bold leading-tight">
              ₱{product?.selling_price}
            </p>
            <p className="text-gray-400 text-xs font-normal">Retail</p>
          </div>
          <div className="flex w-full flex-col gap-1 rounded-xl p-4 border border-primary/30 bg-primary/10 dark:bg-primary/5 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-xs font-medium uppercase tracking-tight">
                  Profit Margin
                </p>
                <p className="text-gray-900 dark:text-white tracking-tight text-2xl font-black leading-tight">
                  +₱{profit}
                </p>
              </div>
              <div className="bg-primary px-3 py-1 rounded-full">
                <p className="text-white text-sm font-bold">
                  +{margin.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <div className="px-4 py-2 space-y-3">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                      <LayoutGrid />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Shelf Location
                    </p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {product?.locations.name}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400">
                  <ChevronRight />
                </span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <VisuallyHidden>
              <DialogTitle>Location</DialogTitle>
            </VisuallyHidden>
            <FloorPlan section={product?.locations.name ?? ""} />
          </DialogContent>
        </Dialog>
        <div className="px-4 py-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            Supplier Information
          </h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-gray-500">
                  <Warehouse />
                </span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white leading-none">
                  {product?.suppliers?.name ?? "Supplier Not Provided"}
                </h4>
                <p className="text-xs text-gray-500 mt-1">Main Distributor</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                <span className="material-symbols-outlined">
                  <Phone />
                </span>
              </button>
              <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                <span className="material-symbols-outlined">
                  <MessageCircle />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            Notes
          </h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <Textarea value={product?.notes} disabled />
          </div>
        </div>
        <div className="px-4 py-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center gap-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
              Product SKU / Barcode
            </p>
            <div
              className="w-full h-24 bg-[url('https://placeholder.pics/svg/400x100/FFFFFF/000000/BARCODE')] bg-contain bg-center bg-no-repeat"
              data-alt="Vertical black and white barcode stripes for scanning"
            ></div>
            <p className="font-mono text-lg text-gray-800 tracking-[0.3em]">
              {product?.barcode}
            </p>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 flex gap-4 max-w-md mx-auto">
        <button className="flex-1 bg-primary text-gray-900 font-bold py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">
            <Pencil />
          </span>
          Edit Details
        </button>
        <button className="w-16 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold py-4 rounded-xl flex items-center justify-center active:scale-95 transition-transform">
          <span className="material-symbols-outlined">
            <Star />
          </span>
        </button>
      </div>
    </div>
  );
}
