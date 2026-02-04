import * as XLSX from "xlsx";
import { supabase } from "./supabase/client";

export async function importExcelToSupabase(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer);

  const sheetMapping: Record<string, string> = {
    Items: "items",
    Categories: "categories",
    Suppliers: "suppliers",
  };

  const parsedData: any = {
    allSheets: workbook.SheetNames,
    processedSheets: {},
  };

  for (const sheetName of workbook.SheetNames) {
    if (sheetName === "Export Summary") continue;

    const tableName = sheetMapping[sheetName];
    if (!tableName) continue;

    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    parsedData.processedSheets[sheetName] = {
      tableName,
      rowCount: data.length,
      data,
    };

    const { error } = await supabase
      .from(tableName)
      .upsert(data, { onConflict: "id" });

    if (error) {
      parsedData.processedSheets[sheetName].error = error.message;
      throw error;
    }
  }

  return parsedData;
}
