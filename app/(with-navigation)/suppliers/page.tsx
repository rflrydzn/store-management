import Navigation from "@/components/navigation";
import {
  ChevronLeft,
  File,
  LayoutTemplate,
  MapPin,
  Phone,
  Plus,
  ReceiptText,
  Search,
  Settings,
  Store,
  UserRound,
  Van,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default async function SuppliersPage() {
  const { data: suppliers } = await supabase.from("suppliers").select();

  return (
    <main className="bg-background min-h-screen text-[#0d1b12] dark:text-white font-display">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <Link
            href="/"
            className="text-[#0d1b12] dark:text-white flex size-12 shrink-0 items-center"
          >
            <span className="material-symbols-outlined">
              <ChevronLeft />
            </span>
          </Link>
          <h2 className="text-[#0d1b12] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Supplier Directory
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex max-w-120 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#0d1b12] dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
              <span className="material-symbols-outlined">
                <Plus />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
            <div className="text-[#4c9a66] flex border-none bg-white dark:bg-[#1a2e20] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <span className="material-symbols-outlined">
                <Search />
              </span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#0d1b12] dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-[#1a2e20] focus:border-none h-full placeholder:text-[#4c9a66] px-4 pl-2 text-base font-normal leading-normal"
              placeholder="Search by name or product..."
            />
          </div>
        </label>
      </div>
      <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar">
        <button className="px-4 py-3 bg-primary text-[#0d1b12] rounded-full text-sm font-semibold whitespace-nowrap">
          All
        </button>
        <button className="px-4 py-1.5 bg-white dark:bg-[#1a2e20] text-[#4c9a66] border border-[#e7f3eb] dark:border-[#2a4030] rounded-full text-sm font-medium whitespace-nowrap">
          Beverages
        </button>
        <button className="px-4 py-1.5 bg-white dark:bg-[#1a2e20] text-[#4c9a66] border border-[#e7f3eb] dark:border-[#2a4030] rounded-full text-sm font-medium whitespace-nowrap">
          Dry Goods
        </button>
        <button className="px-4 py-1.5 bg-white dark:bg-[#1a2e20] text-[#4c9a66] border border-[#e7f3eb] dark:border-[#2a4030] rounded-full text-sm font-medium whitespace-nowrap">
          Wholesale
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        {suppliers?.map((supplier) => (
          <div
            key={supplier.id}
            className="flex items-center gap-4 bg-background px-4 min-h-22 py-3 justify-between border-b border-[#e7f3eb] dark:border-[#1a2e20]"
          >
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
                data-alt="Branding logo for San Miguel Distribution"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn-LUHO1Xk-J7L_BRcV00x3H92BtRrQWRo1bkeIBSjhry2DfX5Z7ZajvbOn0ByOFp_4-JTB-oZ47-pWU9usddX5dOvTHZITPWz5vdcLV3mFFsztFOhr3HT1_DTF8fw6-ZG2ze4y7wgv3zm9WAFcOOGEiKc3TtVgJQa9TATmSgcigxMOXlAQesjFvLYEhLUfmAG7zwuXIG8C8Rp2Qr_ou5oy6bw335ywYDVOK3hoK2PC5RVDFg7NDbteiHo7Bbojb_xO2Gugj3R-9HW"
              />
              <div className="flex flex-col justify-center">
                <p className="text-[#0d1b12] dark:text-white text-base font-bold leading-normal line-clamp-1">
                  {supplier.name}
                </p>
                <p className="flex items-center capitalize text-[#4c9a66] text-sm font-medium leading-normal line-clamp-1">
                  {supplier.type === "wholesale" ? (
                    <Van strokeWidth={1} />
                  ) : (
                    <Store strokeWidth={1} />
                  )}
                  {supplier.type}
                </p>
                <div className="flex items-center gap-1 text-[#4c9a66] text-xs mt-1">
                  <span className="material-symbols-outlined text-xs">
                    <MapPin strokeWidth={1} />
                  </span>
                  <span>{supplier.address}</span>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <button className="flex min-w-18 cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-primary text-[#0d1b12] text-sm font-bold shadow-sm active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-lg mr-1">
                  <Phone />
                </span>
                <span className="truncate">Call</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="h-24"></div>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between z-50">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500"
        >
          <span className="material-symbols-outlined">
            <LayoutTemplate />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Home
          </span>
        </Link>
        <div className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">
            <UserRound />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Suppliers
          </span>
        </div>
        <Link
          href="/data-management"
          className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500"
        >
          <span className="material-symbols-outlined">
            <File />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Data
          </span>
        </Link>
        <div className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
          <span className="material-symbols-outlined">
            <Settings />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Settings
          </span>
        </div>
      </nav>
    </main>
  );
}
