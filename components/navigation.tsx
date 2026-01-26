import { LayoutTemplate, UserRound, ReceiptText, Settings } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between z-50">
      <div className="flex flex-col items-center gap-1 text-primary">
        <span className="material-symbols-outlined">
          <LayoutTemplate />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Home
        </span>
      </div>
      <Link
        href="/suppliers"
        className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500"
      >
        <span className="material-symbols-outlined">
          <UserRound />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Suppliers
        </span>
      </Link>
      <div className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
        <span className="material-symbols-outlined">
          <ReceiptText />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Sales
        </span>
      </div>
      <div className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
        <span className="material-symbols-outlined">
          <Settings />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Settings
        </span>
      </div>
    </nav>
  );
}
