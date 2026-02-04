"use client";

import { useState, useRef } from "react";
import { importExcelToSupabase } from "@/lib/importToExcel";

export default function ImportButton() {
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const result = await importExcelToSupabase(file);
      alert("Import successful!");
    } catch (error) {
      console.error(error);
      alert(`Import failed: ${error}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => fileRef.current?.click()}
        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#135bec] text-white text-sm font-semibold transition-opacity active:opacity-80 hover:bg-[#0d4ac7]"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
        </svg>
        <span className="truncate">Upload Excel/CSV File</span>
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".xlsx"
        onChange={handleImport}
        disabled={importing}
        className="hidden"
      />
    </div>
  );
}
