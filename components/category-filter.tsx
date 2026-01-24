"use client";
import { Category } from "@/lib/types";

export default function CategoryFilter({
  onSelect,
  categories,
  selected,
}: {
  onSelect: (categoryId: string | null) => void;
  categories: Category[];
  selected: string | null;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
      <button
        onClick={() => onSelect(null)}
        className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 ${
          selected === null
            ? "bg-primary text-white shadow-md shadow-primary/20"
            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
        }`}
      >
        <span
          className={`text-sm ${selected === null ? "font-semibold" : "font-medium"}`}
        >
          All
        </span>
      </button>
      {categories?.map((category) => (
        <button
          onClick={() => onSelect(category.id)}
          key={category.id}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 ${
            selected === category.id
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
          }`}
        >
          <span
            className={`text-sm ${selected === category.id ? "font-semibold" : "font-medium"}`}
          >
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
}
