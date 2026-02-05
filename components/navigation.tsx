"use client";
import {
  LayoutTemplate,
  UserRound,
  ReceiptText,
  Settings,
  File,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = [
  {
    label: "Home",
    link: "/",
    logo: LayoutTemplate,
  },
  {
    label: "Suppliers",
    link: "/suppliers",
    logo: UserRound,
  },
  {
    label: "Data",
    link: "/data-management",
    logo: File,
  },
  {
    label: "Settings",
    link: "/settings",
    logo: Settings,
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between z-50">
      {Nav.map(({ label, link, logo: Icon }) => {
        const isActive = pathname === link;

        return (
          <Link
            key={label}
            href={link}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-primary" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <Icon />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
