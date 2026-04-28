Run the project's test suite and triage any failures.

Steps:
1. Detect the test runner (pytest, jest, go test, cargo test, etc.) by checking config files and package.json/pyproject.toml/Cargo.toml.
2. Run the full test suite. If it's too slow, run only tests related to recently changed files.
3. For each failing test:
   a. Read the test and the code it exercises.
   b. Determine if the failure is a real bug, a broken test, or a missing implementation.
   c. Fix the root cause — don't just make the test pass by weakening assertions.
4. Re-run tests to confirm all pass.
5. Report: how many passed/failed before, what was fixed, and any tests that were skipped or couldn't be fixed (with reason).

If no test runner is detected, say so and suggest one appropriate for the stack.
