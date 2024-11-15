# lab-extract-common-letters

To install dependencies:

```bash
bun install
```

To benchmark:

```bash
hyperfine --warmup 10 'bun benchmark.ts -- --runOriginal' 'bun benchmark.ts -- --runOptimized'
```

Example benchmark output:

```bash
hyperfine --warmup 10 'bun benchmark.ts -- --runOriginal' 'bun benchmark.ts -- --runOptimized'
Benchmark 1: bun benchmark.ts -- --runOriginal
  Time (mean ± σ):     199.7 ms ±   4.8 ms    [User: 161.5 ms, System: 69.7 ms]
  Range (min … max):   193.0 ms … 209.1 ms    14 runs

Benchmark 2: bun benchmark.ts -- --runOptimized
  Time (mean ± σ):      34.7 ms ±   0.9 ms    [User: 24.8 ms, System: 18.7 ms]
  Range (min … max):    32.6 ms …  36.9 ms    84 runs

Summary
  bun benchmark.ts -- --runOptimized ran
    5.75 ± 0.21 times faster than bun benchmark.ts -- --runOriginal
```

## Motivation

After a discussion with @RomanHotsiy, I realized that while my initial solution was correct, it wasn't as efficient as it could be. Roman challenged me to make the solution both faster and simpler, leading to this refined version with optimizations inspired by our conversation and AI tools like ChatGPT 4.0 and Claude 3.5. The final optimized solution uses a Set for fast lookup without needing duplicate handling, which brought both speed and clarity.

## Explanation

### Time Complexity Analysis

**Original Solution**: O(n *m* k)

- `n`: length of the first word
- `m`: average length of other words
- `k`: number of words
- **Explanation**: Each character in the first word (`n`) was checked in each word (`k`) with `indexOf`, a linear operation (`m`). Extra string manipulations (`slice`) added further O(m) complexity.

**Optimized Solution**: O(n * k)

- `n`: max length of words
- `k`: number of words
- **Explanation**: By using a Set, we eliminated linear searches and unnecessary character counts, reducing the complexity to a single pass over the words.

### Space Complexity Analysis

**Original Solution**: O(n * k)

- Copies of input words and intermediate strings: O(n * k)
- Result array: O(n)

**Optimized Solution**: O(n)

- Set of characters from the first word: O(n)
- Result array: O(n)

### Key Optimizations

1. **Set-based Lookup**: The optimized solution uses a Set, which provides O(1) character lookup and removes the need for duplicate handling.

   ```typescript
   // Optimized - Simple presence check in other words
   if (!words[i].includes(char)) { isCommon = false; break; }
   ```

2. **Early Exit Conditions**: Streamlined the logic to exit early if we find a character missing in any word.

   ```typescript
   // Early exit if any word lacks a character
   if (!words[i].includes(char)) { isCommon = false; break; }
   ```

### Why It's Faster

1. **No Unnecessary String Operations**:
   - **Original**: Repeatedly sliced and manipulated strings.
   - **Optimized**: Only looks for presence, reducing runtime significantly.

2. **Constant Time Lookups**:
   - **Original**: Linear search (`indexOf`) for each character in each word.
   - **Optimized**: Uses `Set` lookups, cutting down operations per character.

3. **Single Data Structure for Tracking**:
   - **Original**: Created frequency maps.
   - **Optimized**: Set-based presence check reduces memory use and processing.

### Example Comparison

For input `["hello", "world", "help"]`:

**Original Solution**:

- Took each character in "hello," searched across words with `indexOf`, then modified strings with `slice` for duplicates.

**Optimized Solution**:

- Creates a Set of unique characters in "hello," then checks each character's presence across other words without extra steps.

## Acknowledgments

Thanks to @RomanHotsiy for the challenge and feedback, and to AI tools (ChatGPT 4.0 and Claude 3.5) for assisting in the refinement. 🚀🤖

This project was created using `bun init` in bun v1.1.34. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
