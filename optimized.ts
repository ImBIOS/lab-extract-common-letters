/**
 * Extracts common letters that appear across all input words.
 * Time Complexity: O(n * m) where n is the number of words and m is the average word length
 * Space Complexity: O(k) where k is the number of unique characters
 * @param {string[]} words - Array of words to process
 * @returns {string[]} Array of common letters
 */
export function extractCommonLettersOptimized(words: string[]): string[] {
  if (words.length === 0) {
    return [];
  }

  // Special case: single word should return all its characters including duplicates
  if (words.length === 1) {
    return words[0].split("");
  }

  const referenceWord = words[0];
  const result: string[] = [];

  // Create frequency maps for each word
  const frequencyMaps = words.map((word) => {
    const map = new Map<string, number>();
    for (const char of word) {
      map.set(char, (map.get(char) || 0) + 1);
    }
    return map;
  });

  // Check each character in the reference word
  const processedChars = new Map<string, number>(); // Track processed count for each char

  for (const char of referenceWord) {
    // Get current count of this character we've processed
    const processedCount = processedChars.get(char) || 0;

    // Get minimum frequency of this character across all words
    let minFreq = frequencyMaps[0].get(char) || 0;
    // Only process if we haven't exceeded min frequency
    let isCommon = processedCount < minFreq;

    for (let i = 1; i < frequencyMaps.length && isCommon; i++) {
      const freq = frequencyMaps[i].get(char) || 0;
      if (freq === 0 || processedCount >= freq) {
        isCommon = false;
        break;
      }
      minFreq = Math.min(minFreq, freq);
    }

    // If character appears in all words and we haven't exceeded its minimum frequency
    if (isCommon) {
      result.push(char);
      processedChars.set(char, processedCount + 1);
    }
  }

  return result;
}
