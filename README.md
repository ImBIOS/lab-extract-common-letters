# lab-extract-common-letters

To install dependencies:

```bash
bun install
```

To benchmark:

```bash
hyperfine --warmup 3 'bun benchmark.ts -- --runOriginal' 'bun benchmark.ts -- --runOptimized'
```

example:

```bash
󰀵  󱑍 15:46  ﱮ ~/projects/lab-extract-common-letters  via 🥟 v1.1.34 via  v20.18.0
 ➜  hyperfine --warmup 3 'bun benchmark.ts -- --runOriginal' 'bun benchmark.ts -- --runOptimized'
Benchmark 1: bun benchmark.ts -- --runOriginal
  Time (mean ± σ):     201.2 ms ±   2.5 ms    [User: 165.7 ms, System: 67.5 ms]
  Range (min … max):   197.6 ms … 205.8 ms    15 runs

Benchmark 2: bun benchmark.ts -- --runOptimized
  Time (mean ± σ):      79.1 ms ±   4.9 ms    [User: 102.9 ms, System: 32.5 ms]
  Range (min … max):    73.8 ms … 102.7 ms    39 runs

Summary
  bun benchmark.ts -- --runOptimized ran
    2.55 ± 0.16 times faster than bun benchmark.ts -- --runOriginal
```

## Motivation

After talking with @RomanHotsiy, I realized that the original solution was not optimal and he challenged me to improve it. So I accept it and decided to rewrite the solution to improve its performance, of course, with the help of AI (Thanks to the teamwork of ChatGPT 4o and Claude Sonnet 3.5 Model) 🆒😎.

My original optimization actually just using a Set to have O(1) lookup, but the AI suggested me to use a Map to store the frequency of each character in each word. This way, I can avoid the linear search and string manipulation operations that were slowing down the original solution.

## Explanation

### Time Complexity Analysis

**Original Solution**: O(n m k)

- n: length of first word
- m: average length of other words
- k: number of words
- For each character in first word (n), it searched through each word (k) using indexOf which scans the entire word (m)
- The string slicing operation for handling duplicates (word.slice()) was also O(m)

**Optimized Solution**: O(n * k)

- n: max length of words
- k: number of words
- We only iterate through each character once and check it against frequency maps

### Space Complexity Analysis

**Original Solution**: O(n * k)

- Copied entire input array: O(n * k)
- Result array: O(n)
- String manipulations created new strings: O(n)

**Optimized Solution**: O(n * k)

- Frequency maps: O(n * k) - one map per word
- Result array: O(n)
- ProcessedChars map: O(n)

### Key Improvements That Made It Faster

1. **Eliminated String Operations**

```typescript
// Original - Expensive string manipulation
copiedWords[j] = word.slice(0, charIndex) + word.slice(charIndex + 1);

// Optimized - Uses frequency counting instead
map.set(char, (map.get(char) || 0) + 1);
```

2. **Removed Linear Search**

```typescript
// Original - Used indexOf (linear search)
const charIndex = word.indexOf(currentChar);

// Optimized - Direct frequency lookup (constant time)
const freq = frequencyMaps[i].get(char) || 0;
```

3. **Better Duplicate Handling**

```typescript
// Original - Required string modification for each duplicate
if (charIndex === -1) {
    isCharCommonAcrossWords = false;
    break;
} else {
    copiedWords[j] = word.slice(0, charIndex) + word.slice(charIndex + 1);
}

// Optimized - Uses counting
const processedCount = processedChars.get(char) || 0;
if (freq === 0 || processedCount >= freq) {
    isCommon = false;
    break;
}
```

4. **Early Exit Optimizations**

```typescript
// Optimized solution has multiple early exits
if (words.length === 0) return [];
if (words.length === 1) return words[0].split('');
```

### Why It's 2.55x Faster

1. **Reduced Operations Per Character**
   - Original: For each character, performed string search (indexOf) and string manipulation (slice)
   - Optimized: Just hash table lookups and number comparisons

2. **Better Data Structures**
   - Original: Heavy reliance on string operations
   - Optimized: Uses Map for O(1) lookups and efficient counting

3. **Memory Efficiency**
   - Original: Created many intermediate strings
   - Optimized: Only stores counts and results

4. **Algorithm Efficiency**
   - Original: Had to repeatedly search and modify strings
   - Optimized: Single pass through words to build frequency maps, then direct lookups

### Practical Example

For input `["hello", "world", "help"]`:

**Original Solution**:

1. Takes "h" from "hello"
2. Searches for "h" in "world" using indexOf
3. If found, creates new string without "h"
4. Repeats for each character

**Optimized Solution**:

1. Creates frequency maps for all words at once
2. For each character in first word:
   - Checks frequencies in O(1) time
   - No string modifications needed
   - Tracks processed counts efficiently

This explains why the benchmark shows the optimized version running about 2.55 times faster than the original version.

Thanks to @RomanHotsiy for the challenge, and @OPENAI with ChatGPT 4o and @anthropics with Claude Sonnet 3.5 Model for the AI assistance! 🚀🤖

---

This project was created using `bun init` in bun v1.1.34. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
