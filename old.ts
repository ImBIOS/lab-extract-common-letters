/**
 * Extracts and returns an array of characters that appear in the same position
 * across all strings within the input array.
 *
 * @param {string[]} words - An array of strings to be analyzed.
 * @returns {string[]} An array of characters that are common across all provided strings,
 * maintaining their order of appearance in the first string.
 */
export function extractCommonLettersOld(words: string[]): string[] {
  if (words.length === 0) {
    return [];
  }

  const copiedWords = [...words];
  const result: string[] = [];
  const referenceWord = copiedWords[0];

  // Iterate over each character in the first word
  for (let i = 0; i < referenceWord.length; i++) {
    const currentChar = referenceWord[i];
    let isCharCommonAcrossWords = true;

    // Check if the current character exists in each of the other words
    for (let j = 1; j < copiedWords.length; j++) {
      const word = copiedWords[j];
      const charIndex = word.indexOf(currentChar);

      // If the character is not found, break and set flag to false
      if (charIndex === -1) {
        isCharCommonAcrossWords = false;
        break;
      } else {
        // Remove the found character from the word to handle duplicates
        copiedWords[j] = word.slice(0, charIndex) + word.slice(charIndex + 1);
      }
    }

    // If the character is common across all words, add it to the result
    if (isCharCommonAcrossWords) {
      result.push(currentChar);
    }
  }

  return result;
}
