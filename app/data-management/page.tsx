import ExportButton from "@/components/export-to-excel-button";
import { supabase } from "@/lib/supabase/client";
import React from "react";
import Link from "next/link";
import ImportButton from "@/components/import-to-excel";

// interface BackupItem {
//   id: string;
//   filename: string;
//   date: string;
//   size: string;
//   status: "success" | "expired";
// }

const DataManagement: React.FC = async () => {
  // const [cloudBackupEnabled, setCloudBackupEnabled] = useState(true);

  // const backupHistory: BackupItem[] = [
  //   {
  //     id: "1",
  //     filename: "Inventory_Full_Backup.csv",
  //     date: "Oct 24, 2023",
  //     size: "2.4 MB",
  //     status: "success",
  //   },
  //   {
  //     id: "2",
  //     filename: "Supplier_Records.xlsx",
  //     date: "Oct 20, 2023",
  //     size: "1.1 MB",
  //     status: "success",
  //   },
  //   {
  //     id: "3",
  //     filename: "Sales_Report_Sept.csv",
  //     date: "Sept 30, 2023",
  //     size: "4.8 MB",
  //     status: "expired",
  //   },
  // ];
  const { data: items } = await supabase.from("items").select();
  const { data: categories } = await supabase.from("categories").select();
  const { data: suppliers } = await supabase.from("suppliers").select();

  const sheets = [
    { name: "Items", data: items ?? [] },
    { name: "Categories", data: categories ?? [] },
    { name: "Suppliers", data: suppliers ?? [] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#101622] font-sans text-[#0d121b] dark:text-[#f8f9fc] transition-colors duration-200">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-gray-50 dark:bg-[#101622] p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
        <Link
          href="/"
          className="text-[#0d121b] dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Go back"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
          Data Management
        </h2>
      </div>

      <div className="max-w-md mx-auto pb-10">
        {/* Migration Section Header */}
        <h3 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-6">
          Migration Tools
        </h3>

        {/* Export Card */}
        <div className="p-4">
          <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-white dark:bg-[#1a212f] overflow-hidden">
            <div
              className="w-full h-32 bg-gradient-to-br from-[#135bec] to-[#4c669a]"
              role="img"
              aria-label="Abstract blue spreadsheet data pattern"
            >
              <div className="flex items-center justify-center h-full bg-black/10">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z" />
                </svg>
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch justify-center gap-1 py-4 px-4">
              <p className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                Export Data
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-[#4c669a] dark:text-gray-400 text-sm font-normal leading-normal">
                  Download your inventory, sales, and supplier records as a
                  spreadsheet for your own records or tax reporting.
                </p>
                <ExportButton sheets={sheets} />
              </div>
            </div>
          </div>
        </div>

        {/* Import Card */}
        <div className="p-4 pt-0">
          <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-white dark:bg-[#1a212f] overflow-hidden">
            <div
              className="w-full h-32 bg-gradient-to-br from-[#4c669a] to-[#135bec]"
              role="img"
              aria-label="Modern database import illustration"
            >
              <div className="flex items-center justify-center h-full bg-black/10">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                </svg>
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch justify-center gap-1 py-4 px-4">
              <p className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                Import Data
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-[#4c669a] dark:text-gray-400 text-sm font-normal leading-normal">
                  Bulk update your store data by uploading an Excel or CSV file.
                  Ensure you use the provided system template.
                </p>
                <ImportButton />
              </div>
            </div>
          </div>
        </div>

        {/* Cloud Sync Section */}
        {/* <h3 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Cloud Sync Settings
        </h3>
        <div className="px-4">
          <div className="flex items-center gap-4 bg-white dark:bg-[#1a212f] px-4 min-h-[72px] py-4 justify-between rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-blue-50 dark:border-blue-900/30">
            <div className="flex flex-col justify-center max-w-[75%]">
              <div className="flex items-center gap-2">
                <p className="text-[#0d121b] dark:text-white text-base font-semibold leading-normal">
                  Automatic Cloud Backup
                </p>
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </div>
              <p className="text-[#4c669a] dark:text-gray-400 text-xs font-normal leading-normal">
                Automatically sync your data daily to secure cloud storage.
                Encrypted end-to-end.
              </p>
            </div>
            <div className="shrink-0">
              <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-gray-200 dark:bg-gray-700 p-0.5">
                <input
                  type="checkbox"
                  checked={cloudBackupEnabled}
                  onChange={(e) => setCloudBackupEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div
                  className={`h-full w-[27px] rounded-full bg-white shadow-md transition-transform ${
                    cloudBackupEnabled ? "translate-x-[20px]" : "translate-x-0"
                  }`}
                ></div>
                <div
                  className={`absolute inset-0 rounded-full transition-colors ${
                    cloudBackupEnabled
                      ? "bg-[#135bec]"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                  style={{ zIndex: -1 }}
                ></div>
              </label>
            </div>
          </div>
        </div> */}

        {/* Backup History Section */}
        {/* <h3 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-8">
          Backup History
        </h3>
        <div className="px-4 space-y-3">
          {backupHistory.map((backup) => (
            <div
              key={backup.id}
              className={`flex items-center gap-4 bg-white dark:bg-[#1a212f] px-4 min-h-[72px] py-3 justify-between rounded-xl border border-gray-100 dark:border-gray-800 ${
                backup.status === "expired" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    backup.status === "success"
                      ? "bg-[#135bec]/10"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <svg
                    className={`w-6 h-6 ${
                      backup.status === "success"
                        ? "text-[#135bec]"
                        : "text-gray-500"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#0d121b] dark:text-white text-sm font-medium leading-normal">
                    {backup.filename}
                  </p>
                  <p className="text-[#4c669a] dark:text-gray-400 text-xs font-normal">
                    {backup.date} • {backup.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    backup.status === "success"
                      ? "text-green-600 bg-green-100 dark:bg-green-900/30"
                      : "text-gray-400 bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {backup.status === "success" ? "Success" : "Expired"}
                </span>
                <button
                  onClick={() =>
                    backup.status === "success" &&
                    handleDownloadBackup(backup.id)
                  }
                  disabled={backup.status === "expired"}
                  className={`${
                    backup.status === "success"
                      ? "text-[#135bec] active:opacity-50 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      : "text-gray-400 cursor-not-allowed"
                  } p-1 rounded transition-colors`}
                  aria-label={
                    backup.status === "success"
                      ? "Download backup"
                      : "Backup expired"
                  }
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {backup.status === "success" ? (
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                    ) : (
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div> */}

        {/* Footer Help */}
        {/* <div className="mt-10 px-6 text-center">
          <p className="text-xs text-[#4c669a] dark:text-gray-500">
            Data is encrypted with AES-256 standard. For security, backup links
            expire after 30 days.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default DataManagement;
