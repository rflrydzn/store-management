import * as XLSX from "xlsx";

export type SheetData = {
  name: string;
  data: Record<string, any>[];
};

export function exportMultipleSheets(
  sheets: SheetData[],
  filename = "export.xlsx",
) {
  const workbook = XLSX.utils.book_new();

  sheets.forEach(({ name, data }) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, name);
  });

  XLSX.writeFile(workbook, filename);
}
