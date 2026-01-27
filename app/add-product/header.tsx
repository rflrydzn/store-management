import { X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800">
      <Link
        href="/"
        className="text-slate-600 dark:text-slate-400 flex size-12 shrink-0 items-center cursor-pointer"
      >
        <span className="material-symbols-outlined">
          <X />
        </span>
      </Link>
      <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
        Add New Product
      </h2>
      <div className="flex w-12 items-center justify-end">
        <button className="text-primary text-base font-bold leading-normal tracking-[0.015em] shrink-0">
          Save
        </button>
      </div>
    </header>
  );
}
