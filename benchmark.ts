import { extractCommonLettersOld } from "./old";
import { extractCommonLettersOptimized } from "./optimized";

// Generate test data with a high number of long strings
function generateTestData(numWords: number, wordLength: number): string[] {
  const words: string[] = [];
  const chars = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < numWords; i++) {
    let word = "";
    for (let j = 0; j < wordLength; j++) {
      word += chars[Math.floor(Math.random() * chars.length)];
    }
    words.push(word);
  }
  return words;
}

// Run both functions to ensure they give the same results
const testData = generateTestData(1000, 1000);
if (process.argv.includes("--runOriginal")) {
  console.time("Original Function");
  extractCommonLettersOld(testData);
  console.timeEnd("Original Function");
}

if (process.argv.includes("--runOptimized")) {
  console.time("Optimized Function");
  extractCommonLettersOptimized(testData);
  console.timeEnd("Optimized Function");
}
