import { UserRound, Bell, QrCode } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="flex items-center p-4 pb-2 justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary overflow-hidden">
            <span className="material-symbols-outlined">
              <UserRound />
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Kumusta, Rap!
            </p>
            <h2 className="text-lg font-bold leading-tight tracking-tight">
              Inventory
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
              <QrCode />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
