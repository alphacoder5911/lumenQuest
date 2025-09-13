// server/scripts/Convertxl.js  (ESM-friendly)
import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

try {
  // resolve current directory (works in ESM)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // adjust if your Excel is in scripts folder
  const excelPath = path.resolve(__dirname, "data.xlsx"); // scripts/data.xlsx
  const outPath = path.resolve(__dirname, "..", "seedData.json"); // server/seedData.json

  console.log("Looking for Excel at:", excelPath);
  if (!fs.existsSync(excelPath)) {
    throw new Error(`Excel file not found at ${excelPath}. Move your .xlsx there or update the path.`);
  }

  // read workbook
  const workbook = XLSX.readFile(excelPath);
  const sheetNames = workbook.SheetNames;
  console.log("Found sheets:", sheetNames);

  const seedData = {};
  sheetNames.forEach((sheet) => {
    const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { defval: null });
    seedData[sheet] = json;
    console.log(`→ ${sheet}: ${json.length} rows`);
  });

  // write JSON to project root (server/seedData.json)
  fs.writeFileSync(outPath, JSON.stringify(seedData, null, 2), { encoding: "utf8" });
  console.log("✅ seedData.json written to:", outPath);
} catch (err) {
  console.error("❌ Error in Convertxl.js:", err.message || err);
  process.exit(1);
}
