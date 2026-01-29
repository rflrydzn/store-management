"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/lib/types";
import { ChevronDown, ImageUp, LayoutTemplate, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import FloorPlan from "@/components/floor-plan";
import { uploadImageAndGetUrl } from "@/lib/uploadImageAndGetUrl";

interface EditProductFormProps {
  product: Product;
  categories: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
  locations: { id: string; name: string }[];
}

export default function EditProductForm({
  product,
  categories,
  suppliers,
  locations,
}: EditProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedLocationName, setSelectedLocationName] = useState<string>(
    product.locations?.name || "",
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    product.image_url || "",
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: product.name || "",
    barcode: product.barcode || "",
    cost_price: product.cost_price || 0,
    selling_price: product.selling_price || 0,
    category_id: product.category_id || "",
    supplier_id: product.supplier_id || "",
    location_id: product.location_id || "",
    image_url: product.image_url || "",
    notes: product.notes || "",
    description: product.description || "",
  });

  // Calculate profit and margin
  const profit = formData.selling_price - formData.cost_price;
  const margin =
    formData.cost_price > 0
      ? ((profit / formData.cost_price) * 100).toFixed(1)
      : "0";

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
    setFormData((prev) => ({
      ...prev,
      location_id: locationId,
    }));
    setSelectedLocationName(locationMap[locationId] || "");
    if (locationId) {
      setIsDialogOpen(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image_url: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert("Please enter a product name");
      return;
    }
    if (!formData.category_id) {
      alert("Please select a category");
      return;
    }
    if (formData.cost_price <= 0) {
      alert("Please enter a valid cost price");
      return;
    }
    if (formData.selling_price <= 0) {
      alert("Please enter a valid selling price");
      return;
    }
    if (!formData.location_id) {
      alert("Please select a shelf location");
      return;
    }

    setLoading(true);

    try {
      // Upload image if selected
      let imageUrl = formData.image_url;
      if (imageFile) {
        try {
          setIsUploadingImage(true);
          imageUrl = await uploadImageAndGetUrl(imageFile);
        } catch (error) {
          console.error("Error uploading image:", error);
          alert(
            "Failed to upload image. The product will be saved without updating the image.",
          );
        } finally {
          setIsUploadingImage(false);
        }
      }

      const { error } = await supabase
        .from("items")
        .update({
          name: formData.name,
          barcode: formData.barcode,
          cost_price: parseFloat(formData.cost_price.toString()),
          selling_price: parseFloat(formData.selling_price.toString()),
          category_id: formData.category_id || null,
          supplier_id: formData.supplier_id || null,
          location_id: formData.location_id || null,
          image_url: imageUrl,
          notes: formData.notes,
          description: formData.description,
        })
        .eq("id", product.id);

      if (error) throw error;

      router.push(`/product/${product.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 pb-10">
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
              Description
            </label>
            <textarea
              className="w-full h-20 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
              placeholder="Product description (optional)"
              name="description"
              value={formData.description}
              onChange={handleChange}
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
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category_id: e.target.value,
                    }))
                  }
                  required
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
                  value={formData.supplier_id}
                  onChange={(e) =>
                    setFormData((prev) => ({
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
              type="text"
              name="barcode"
              value={formData.barcode || ""}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            {/* Product Image */}
            <div className="flex flex-col gap-1.5 ">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                Product Image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />
              {imagePreview ? (
                <div className="relative w-full aspect-square bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                    type="button"
                  >
                    <span className="text-white text-xl font-bold">×</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 px-3 py-1.5 bg-white/90 hover:bg-white rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                    type="button"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  className="relative w-full aspect-square bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 hover:border-primary/50"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ImageUp className="text-primary w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Upload Photo
                  </span>
                </button>
              )}
            </div>

            {/* Shelf Location */}
            <div className="flex flex-col gap-1.5 ">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">
                Shelf Location *
              </label>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="relative w-full aspect-square bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
                  >
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
                      section={formData.location_id}
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
                name="cost_price"
                value={formData.cost_price || ""}
                onChange={handleChange}
                required
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
                name="selling_price"
                value={formData.selling_price || ""}
                onChange={handleChange}
                required
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
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
      </section>

      <div className="px-4 py-8 space-y-3">
        <button
          type="submit"
          disabled={loading || isUploadingImage}
          className="w-full h-12 rounded-xl bg-primary text-white font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploadingImage ? (
            <>
              <Loader2 className="inline h-4 w-4 animate-spin mr-2" />
              Uploading Image...
            </>
          ) : loading ? (
            <>
              <Loader2 className="inline h-4 w-4 animate-spin mr-2" />
              Saving Changes...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading || isUploadingImage}
          className="w-full h-12 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
