"use client";
import {
  ChevronDown,
  ImageUp,
  LayoutTemplate,
  ScanBarcode,
  ScanQrCode,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ProductInput, addProduct } from "@/lib/addProduct";
import { Category, Supplier } from "@/lib/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import FloorPlan from "@/components/floor-plan";

export default function AddProductClient({
  categories,
  suppliers,
}: {
  categories: Category[];
  suppliers: Supplier[];
}) {
  const initialValues: ProductInput = {
    name: "",
    category_id: "",
    barcode: 0,
    description: "",
    cost_price: 0,
    selling_price: 0,
    supplier_id: "",
    location_id: "",
    image_url: null,
    notes: "",
  };

  const [newProduct, setNewProduct] = useState<ProductInput>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocationName, setSelectedLocationName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Calculate profit and margin
  const profit = newProduct.selling_price - newProduct.cost_price;
  const margin =
    newProduct.cost_price > 0
      ? ((profit / newProduct.cost_price) * 100).toFixed(1)
      : "0";

  useEffect(() => console.log("products", newProduct), [newProduct]);

  // Map location ID to location name for display
  const locationMap: { [key: string]: string } = {
    "9d33141d-8baf-4a3e-8aea-77ecdaa47c7f": "BL1",
    "844e3b4d-d6f6-4195-b125-855a89e89ea9": "BL2",
    "1a0466a7-beb3-4d25-ba23-51b2836536ba": "BL3",
    "4eefb9d4-63e1-408a-b6f6-a01e05e97919": "BL4",
    "8aa4cebf-0105-49aa-bc1f-d3cc64579781": "REF2",
    "c8f113d3-1a53-49b7-b990-b64224253581": "DOOR",
    "f4f3ef09-517a-4ab9-bbb7-77cab855b985": "METAL",
    "8895e450-f9c4-4366-b999-b247f3d3ef30": "REF1",
    "f350f96a-973d-4f51-95e8-0ff9adb45277": "W1",
    "ef7f71fa-45f7-4a47-b6b0-a20401daeda4": "W2",
    "97d97673-9be2-4e17-a4bc-5e2be65d4de3": "W3",
    "53421a9b-656f-4882-a18a-3d0ed45c26d3": "BUCKET",
    "82016364-0a7a-4426-85a6-c8d963078cc7": "TABLE",
    "452898d8-fafd-4e87-b0ce-d549fe491bbe": "RICE",
    "dcf9bed2-b3c3-4745-8392-b80594af33ff": "COUNTER",
    "a67c2fb5-40ef-4166-85a7-5a5f4a5c9de5": "SHELF",
    "275f8e4f-e89c-4792-88c9-1c5004193a0e": "BR1",
    "d9555afb-f60b-485e-a681-6185ee1af03c": "BR2",
  };

  const handleLocationChange = (locationId: string) => {
    setNewProduct((prev) => ({
      ...prev,
      location_id: locationId,
    }));
    setSelectedLocationName(locationMap[locationId] || "");
    if (locationId) {
      setIsDialogOpen(false);
    }
  };

  const handleSubmit = async (saveAndAddAnother: boolean = false) => {
    // Validation
    if (!newProduct.name.trim()) {
      alert("Please enter a product name");
      return;
    }
    if (!newProduct.category_id) {
      alert("Please select a category");
      return;
    }
    if (newProduct.cost_price <= 0) {
      alert("Please enter a valid cost price");
      return;
    }
    if (newProduct.selling_price <= 0) {
      alert("Please enter a valid selling price");
      return;
    }
    if (!newProduct.location_id) {
      alert("Please select a shelf location");
      return;
    }

    try {
      setIsSubmitting(true);
      await addProduct(newProduct);

      alert("Product added successfully!");

      if (saveAndAddAnother) {
        // Reset form but keep category and supplier selected
        setNewProduct({
          ...initialValues,
          category_id: newProduct.category_id,
          supplier_id: newProduct.supplier_id,
        });
        setSelectedLocationName("");
      } else {
        // Reset everything
        setNewProduct(initialValues);
        setSelectedLocationName("");
        // You might want to navigate away here
        // router.push('/products');
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setNewProduct(initialValues);
    setSelectedLocationName("");
    // You might want to navigate away here
    // router.back();
  };

  return (
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
            <p className="text-xs text-slate-500 font-medium">Camera Preview</p>
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
              Product Name *
            </label>
            <input
              className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="e.g. Kopiko Lucky Day"
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
              Description
            </label>
            <textarea
              className="w-full h-20 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
              placeholder="Product description (optional)"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                Category *
              </label>
              <div className="relative">
                <select
                  className="w-full h-12 pl-4 pr-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition-all"
                  value={newProduct.category_id}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      category_id: e.target.value,
                    }))
                  }
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
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
                <select
                  className="w-full h-12 pl-4 pr-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition-all"
                  value={newProduct.supplier_id}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      supplier_id: e.target.value,
                    }))
                  }
                >
                  <option value="">Select supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <ChevronDown />
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
              Barcode
            </label>
            <input
              className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Enter barcode number"
              type="number"
              value={newProduct.barcode || ""}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  barcode: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            {/* Product Image */}
            <div className="flex flex-col gap-1.5 ">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                Product Image
              </label>
              <button className="relative w-full aspect-square bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95">
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
                Shelf Location *
              </label>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="relative w-full aspect-square bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95">
                    {selectedLocationName ? (
                      <>
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <LayoutTemplate className="text-green-600 dark:text-green-400 w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                          {selectedLocationName}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 flex items-center justify-center">
                          <LayoutTemplate className="text-slate-500 w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold text-slate-500">
                          Select Shelf
                        </span>
                      </>
                    )}
                  </button>
                </DialogTrigger>
                <DialogContent showCloseButton={false} className="max-w-4xl">
                  <DialogHeader>
                    <VisuallyHidden>
                      <DialogTitle>Select Shelf Location</DialogTitle>
                    </VisuallyHidden>
                    <DialogDescription className="text-center mb-4">
                      Click on a shelf section to select it
                    </DialogDescription>
                    <FloorPlan
                      edit
                      section={newProduct.location_id}
                      onChange={handleLocationChange}
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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
                Cost Price (₱) *
              </label>
              <input
                className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="0.00"
                step="0.01"
                type="number"
                value={newProduct.cost_price || ""}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    cost_price: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                Selling Price (₱) *
              </label>
              <input
                className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="0.00"
                step="0.01"
                type="number"
                value={newProduct.selling_price || ""}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    selling_price: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  Estimated Profit/Unit
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  ₱{profit.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  Margin
                </p>
                <p className="text-lg font-bold text-primary">{margin}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Additional Notes
        </h3>
        <div className="px-4">
          <textarea
            className="w-full h-24 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
            placeholder="Any additional notes about this product..."
            value={newProduct.notes}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, notes: e.target.value }))
            }
          />
        </div>
      </section>

      <div className="px-4 py-8 space-y-3">
        <button
          onClick={() => handleSubmit(false)}
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl bg-primary text-white font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
        <button
          onClick={() => handleSubmit(true)}
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl border border-primary text-primary font-bold transition-all active:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save &amp; Add Another
        </button>
        <button
          onClick={handleCancel}
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </main>
  );
}
