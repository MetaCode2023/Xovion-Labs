Systematically debug a problem described by the user.

Steps:
1. **Reproduce** — confirm you can trigger the bug with a minimal case. If the user hasn't provided one, construct it.
2. **Isolate** — narrow down which file, function, or line is responsible. Use logging, tracing, or binary search through the call stack.
3. **Hypothesize** — state the most likely root cause before looking at a fix. If there are multiple candidates, rank them.
4. **Verify** — confirm the hypothesis by reading the code path, checking types, values, and control flow.
5. **Fix** — make the smallest correct change. Don't refactor unrelated code.
6. **Confirm** — re-run the reproduction case and any related tests to verify the fix holds.

Report the root cause in one sentence, then describe the fix. If the bug can't be reproduced or the root cause is unclear, say what you tried and what information is still needed.
