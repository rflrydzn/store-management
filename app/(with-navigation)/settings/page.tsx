import { ModeToggle } from "@/components/dark-mode-toggle";
import {
  ChevronLeft,
  ChevronRight,
  CircleQuestionMark,
  Globe,
  MessageSquareCode,
  Moon,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="max-w-107.5 mx-auto min-h-screen flex flex-col pb-10">
        <div className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <button className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-2xl">
                <ChevronLeft />
              </span>
            </button>
            <button className="text-primary font-semibold text-base">
              Done
            </button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-2 px-2">
            Settings
          </h1>
        </div>
        <div className="px-4 space-y-8 mt-2">
          {/* <section>
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-4 mb-2">
              Store Profile
            </h2>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">storefront</span>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium leading-none mb-1">
                    Store Name
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Aling Nena's Sari-Sari Store
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-300">
                  chevron_right
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium leading-none mb-1">
                    Business Address
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    123 Mabini St, Manila
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-300">
                  chevron_right
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium leading-none mb-1">
                    Owner Information
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Nena Dela Cruz
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-300">
                  chevron_right
                </span>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-4 mb-2">
              Account Settings
            </h2>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium">Email Address</p>
                </div>
                <p className="text-sm text-slate-400 mr-1">nena.dc@gmail.com</p>
                <span className="material-symbols-outlined text-slate-300">
                  chevron_right
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium">Change Password</p>
                </div>
                <span className="material-symbols-outlined text-slate-300">
                  chevron_right
                </span>
              </div>
            </div>
          </section> */}
          <section>
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-4 mb-2">
              App Preferences
            </h2>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">
                    <Globe />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium">Language</p>
                </div>
                <p className="text-sm text-primary font-medium mr-1">
                  Tagalog / English
                </p>
                <span className="material-symbols-outlined text-slate-300">
                  <ChevronRight />
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">
                    <Moon />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium">Dark Mode</p>
                </div>
                <ModeToggle />
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-4 mb-2">
              Support
            </h2>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">
                    <CircleQuestionMark />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium">Help Center</p>
                </div>
                <span className="material-symbols-outlined text-slate-300">
                  <ChevronRight />
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">
                    <MessageSquareCode />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium">Contact Developer</p>
                </div>
                <span className="material-symbols-outlined text-slate-300">
                  <ChevronRight />
                </span>
              </div>
            </div>
          </section>
          <div className="pt-4 pb-8">
            <button className="w-full bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-red-500 font-semibold py-4 rounded-xl shadow-sm active:scale-[0.98] transition-all">
              Log Out
            </button>
            <p className="text-center text-slate-400 dark:text-slate-500 text-xs mt-6 font-medium">
              Version 2.4.0 (1024)
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
