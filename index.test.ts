import { describe, expect, it } from "bun:test";
import { extractCommonLettersOld } from "./old";
import { extractCommonLettersOptimized } from "./optimized";

describe(extractCommonLettersOld.name, () => {
  it("should return an empty array when input is an empty array", () => {
    const result = extractCommonLettersOld([]);
    expect(result).toEqual([]);
  });

  it("should return an empty array when input has a single empty string", () => {
    const result = extractCommonLettersOld([""]);
    expect(result).toEqual([]);
  });

  it("should return all characters of the single input word when there is only one word", () => {
    const result = extractCommonLettersOld(["hello"]);
    expect(result).toEqual(["h", "e", "l", "l", "o"]);
  });

  it("should return common characters in the same positions across all words", () => {
    const result = extractCommonLettersOld(["hello", "heath", "heaps"]);
    expect(result).toEqual(["h", "e"]);
  });

  it("should handle words with no common characters at the same position", () => {
    const result = extractCommonLettersOld(["abc", "def", "ghi"]);
    expect(result).toEqual([]);
  });

  it("should handle words with all characters in common positions", () => {
    const result = extractCommonLettersOld(["ace", "ace", "ace"]);
    expect(result).toEqual(["a", "c", "e"]);
  });

  it("should handle duplicate letters in different positions across words", () => {
    const result = extractCommonLettersOld(["abca", "bacb", "abac"]);
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("should return an empty array when there are no characters common across all words", () => {
    const result = extractCommonLettersOld(["xyz", "uvw", "rst"]);
    expect(result).toEqual([]);
  });

  it("should handle mixed character lengths and only return characters at common indices", () => {
    const result = extractCommonLettersOld(["abcdef", "abdfgh", "abdjkl"]);
    expect(result).toEqual(["a", "b", "d"]);
  });
});

describe(extractCommonLettersOptimized.name, () => {
  it("should return an empty array when input is an empty array", () => {
    const result = extractCommonLettersOptimized([]);
    expect(result).toEqual([]);
  });

  it("should return an empty array when input has a single empty string", () => {
    const result = extractCommonLettersOptimized([""]);
    expect(result).toEqual([]);
  });

  it("should return all characters of the single input word when there is only one word", () => {
    const result = extractCommonLettersOptimized(["hello"]);
    expect(result).toEqual(["h", "e", "l", "l", "o"]);
  });

  it("should return common characters in the same positions across all words", () => {
    const result = extractCommonLettersOptimized(["hello", "heath", "heaps"]);
    expect(result).toEqual(["h", "e"]);
  });

  it("should handle words with no common characters at the same position", () => {
    const result = extractCommonLettersOptimized(["abc", "def", "ghi"]);
    expect(result).toEqual([]);
  });

  it("should handle words with all characters in common positions", () => {
    const result = extractCommonLettersOptimized(["ace", "ace", "ace"]);
    expect(result).toEqual(["a", "c", "e"]);
  });

  it("should handle duplicate letters in different positions across words", () => {
    const result = extractCommonLettersOptimized(["abca", "bacb", "abac"]);
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("should return an empty array when there are no characters common across all words", () => {
    const result = extractCommonLettersOptimized(["xyz", "uvw", "rst"]);
    expect(result).toEqual([]);
  });

  it("should handle mixed character lengths and only return characters at common indices", () => {
    const result = extractCommonLettersOptimized([
      "abcdef",
      "abdfgh",
      "abdjkl",
    ]);
    expect(result).toEqual(["a", "b", "d"]);
  });
});
