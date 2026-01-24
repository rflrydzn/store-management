export default function InventorySummary() {
  return (
    <section className="flex gap-4 p-4 overflow-x-auto no-scrollbar">
      <div className="flex min-w-[160px] flex-1 flex-col gap-2 rounded-xl p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined text-sm">inventory_2</span>
          <p className="text-sm font-medium">Total SKUs</p>
        </div>
        <p className="text-2xl font-bold leading-tight">142</p>
        <div className="flex items-center gap-1">
          <span className="text-primary text-xs font-bold">+3%</span>
          <span className="text-[10px] text-slate-400">vs last month</span>
        </div>
      </div>
      <div className="flex min-w-[160px] flex-1 flex-col gap-2 rounded-xl p-5 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 shadow-sm">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <span className="material-symbols-outlined text-sm">warning</span>
          <p className="text-sm font-medium">Low Stock</p>
        </div>
        <p className="text-2xl font-bold leading-tight text-red-700 dark:text-red-400">
          5 Items
        </p>
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
          Kailangan bumili
        </p>
      </div>
    </section>
  );
}
