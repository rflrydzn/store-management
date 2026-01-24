import { Search } from "lucide-react";

export default function SearchFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <label className="flex flex-col w-full">
      <div className="flex w-full items-stretch rounded-xl h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden focus-within:ring-2 ring-primary/50 transition-all">
        <div className="flex items-center justify-center pl-4">
          <span className="material-symbols-outlined text-slate-400">
            <Search />
          </span>
        </div>
        <input
          className="w-full border-none bg-transparent focus:ring-0 text-base placeholder:text-slate-400 px-3"
          placeholder="Hanapin ang produkto..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  );
}
