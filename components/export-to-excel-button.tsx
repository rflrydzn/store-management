"use client";

import { exportMultipleSheets, SheetData } from "@/lib/exportToExcel";

interface ExportButtonProps {
  sheets: SheetData[]; // multiple sheets now
}

export default function ExportButton({ sheets }: ExportButtonProps) {
  return (
    <button
      onClick={() => exportMultipleSheets(sheets, "inventory.xlsx")}
      className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#135bec] text-white text-sm font-semibold transition-opacity active:opacity-80 hover:bg-[#0d4ac7]"
    >
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
      <span className="truncate">Export to Excel</span>
    </button>
  );
}
