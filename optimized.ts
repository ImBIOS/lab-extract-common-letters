/**
 * Extracts common letters that appear across all input words, without considering duplicates.
 * Time Complexity: O(n * m) where n is the number of words and m is the average word length
 * Space Complexity: O(k) where k is the number of unique characters
 * @param {string[]} words - Array of words to process
 * @returns {string[]} Array of common letters without duplicates
 */
export function extractCommonLettersOptimized(words: string[]): string[] {
  if (words.length === 0) return [];

  // Use a Set to track unique characters in the reference word
  const referenceSet = new Set(words[0]);
  const result: string[] = [];

  // Check each character in the reference set for presence in all other words
  for (const char of referenceSet) {
    let isCommon = true;

    for (let i = 1; i < words.length; i++) {
      if (!words[i].includes(char)) {
        isCommon = false;
        break;
      }
    }

    // Add character to result if it appears in all words
    if (isCommon) result.push(char);
  }

  return result;
}
