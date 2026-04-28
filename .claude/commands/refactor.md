Refactor the code the user specifies, keeping behavior identical.

Steps:
1. **Understand scope** — identify exactly what the user wants refactored (file, function, module, or pattern).
2. **Run tests first** — establish a passing baseline. If there are no tests for the target code, note it as a risk.
3. **Plan** — describe the refactor in one sentence (e.g., "extract auth logic into a separate module", "rename X to Y throughout", "replace duplicated blocks with a shared helper").
4. **Execute incrementally**:
   - Make one logical change at a time.
   - After each change, verify tests still pass before continuing.
   - Prefer small, reviewable diffs over big-bang rewrites.
5. **Check for regressions** — run the full test suite after all changes.
6. **Report** — summarize what changed, what's better, and flag anything that's now a known gap (e.g., untested paths).

Rules:
- Do not change behavior — if behavior must change, stop and ask.
- Do not add features or handle new edge cases during a refactor.
- Do not touch code outside the specified scope unless it's a required dependency (e.g., a call site that must be updated).
