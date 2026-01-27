import { addProduct } from "@/lib/addProduct";
import {
  ScanBarcode,
  X,
  ScanQrCode,
  ChevronDown,
  ImageUp,
  LayoutTemplate,
} from "lucide-react";
import Link from "next/link";
import Header from "./header";
import AddProductClient from "./add-product-client";
import { supabase } from "@/lib/supabase/client";

export default async function AddProduct() {
  //   try {
  //     const newProduct = await addProduct({
  //       name: "Sample Product",
  //       description: "A great product",
  //       barcode: 123456789,
  //       category_id: "",
  //       cost_price: 10.5,
  //       location_id: "",
  //       supplier_id: "",
  //       selling_price: 15.99,
  //       image_url: "https://example.com/image.jpg",
  //       notes: "Some notes",
  //     });

  //     console.log("Product added:", newProduct);
  //   } catch (error) {
  //     console.error("Failed to add product:", error);
  //   }
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name");
  const { data: suppliers } = await supabase
    .from("suppliers")
    .select("id, name");

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden max-w-107.5 mx-auto bg-background-light dark:bg-background-dark">
        <Header />
        <AddProductClient
          categories={categories ?? []}
          suppliers={suppliers ?? []}
        />
        <div className="h-8 w-full bg-background-light dark:bg-background-dark flex justify-center items-start">
          <div className="w-32 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}
