import FloorPlan from "@/components/floor-plan";
import {
  ScanBarcode,
  X,
  ScanQrCode,
  ChevronDown,
  ImageUp,
  LayoutTemplate,
} from "lucide-react";

export default function AddProduct() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden max-w-107.5 mx-auto bg-background-light dark:bg-background-dark">
        <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="text-slate-600 dark:text-slate-400 flex size-12 shrink-0 items-center cursor-pointer">
            <span className="material-symbols-outlined">
              <X />
            </span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Add New Product
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button className="text-primary text-base font-bold leading-normal tracking-[0.015em] shrink-0">
              Save
            </button>
          </div>
        </header>
        <main className="flex-1 pb-10">
          <div className="px-4 pt-6">
            <div className="relative w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700">
              <div
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800')",
                }}
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                data-alt="Abstract dark technology pattern with green highlights"
              />
              <div className="relative z-10 flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-slate-500 mb-2">
                  <ScanQrCode />
                </span>
                <p className="text-xs text-slate-500 font-medium">
                  Camera Preview
                </p>
              </div>
            </div>
          </div>
          <div className="flex px-4 py-4">
            <button className="flex min-w-21 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 flex-1 bg-primary text-background-dark gap-2 font-bold transition-transform active:scale-95">
              <span className="material-symbols-outlined">
                <ScanBarcode />
              </span>
              <span className="truncate">Scan Barcode</span>
            </button>
          </div>
          <section>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Product Details
            </h3>
            <div className="px-4 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                  Product Name
                </label>
                <input
                  className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. Kopiko Lucky Day"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                    Category
                  </label>
                  <div className="relative">
                    <select className="w-full h-12 pl-4 pr-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition-all">
                      <option>Beverages</option>
                      <option>Snacks</option>
                      <option>Canned Goods</option>
                      <option>Personal Care</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <ChevronDown />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                    Supplier
                  </label>
                  <div className="relative">
                    <select className="w-full h-12 pl-4 pr-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition-all">
                      <option>Universal Robina</option>
                      <option>Nestle PH</option>
                      <option>San Miguel</option>
                      <option>Direct Wholesale</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <ChevronDown />
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 ">
                {/* Product Image */}
                <div className="flex flex-col gap-1.5 ">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                    Product Image
                  </label>
                  <button className="relative w-full  aspect-square bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ImageUp className="text-primary w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      Upload Photo
                    </span>
                  </button>
                </div>

                {/* Shelf Location */}
                <div className="flex flex-col gap-1.5 ">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                    Shelf Location
                  </label>
                  <button className="relative w-full aspect-square bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <LayoutTemplate className="text-slate-500 w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      Select Shelf
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-4">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Pricing
            </h3>
            <div className="px-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                    Cost Price (₱)
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="0.00"
                    step="0.01"
                    type="number"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                    Selling Price (₱)
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="0.00"
                    step="0.01"
                    type="number"
                  />
                </div>
              </div>
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                    Initial Stock
                  </label>
                  <div className="flex items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button className="p-3 text-slate-400">
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      className="w-full text-center border-none bg-transparent focus:ring-0 outline-none"
                      type="number"
                    />
                    <button className="p-3 text-primary">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 justify-center">
                  <div className="flex items-center justify-between px-2 pt-6">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Low stock alert
                    </span>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/20 cursor-pointer">
                      <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-primary transition"></span>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Estimated Profit/Unit
                    </p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      ₱0.00
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Margin
                    </p>
                    <p className="text-lg font-bold text-primary">0%</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="px-4 py-8 space-y-3">
            <button className="w-full h-12 rounded-xl border border-primary text-primary font-bold transition-all active:bg-primary/5">
              Save &amp; Add Another
            </button>
            <button className="w-full h-12 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
              Cancel
            </button>
          </div>
        </main>
        <div className="h-8 w-full bg-background-light dark:bg-background-dark flex justify-center items-start">
          <div className="w-32 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}
