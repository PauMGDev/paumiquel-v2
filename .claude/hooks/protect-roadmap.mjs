#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

// Contract: a PreToolUse hook receives the tool call as JSON on stdin, before
// the tool runs. Exit 0 lets it through, exit 2 blocks it.
const { tool_name, tool_input } = JSON.parse(readFileSync(0, "utf8"));
if (!["Edit", "Write", "MultiEdit"].includes(tool_name)) process.exit(0);
const file = tool_input.file_path ?? "";
if (!/ROADMAP\.md$/.test(file)) process.exit(0);

// The truth is HEAD, not the disk. The working copy may already carry the
// unchecking this hook exists to catch, so comparing against it would bless the
// very edit that caused the friction. What is committed is what was closed.
let head = "";
try { head = execSync("git show HEAD:ROADMAP.md", { encoding: "utf8" }); }
catch { process.exit(0); } // no version in HEAD, nothing to protect

const checked = (t) => new Set([...t.matchAll(/- \[x\] (\S+)/gi)].map((m) => m[1]));

// Write carries the full content. Edit and MultiEdit carry only the diff, so
// the result has to be simulated here to be compared as a whole file.
let proposed;
if (tool_name === "Write") {
  proposed = tool_input.content ?? "";
} else {
  let current = readFileSync(file, "utf8");
  const edits = tool_name === "Edit"
    ? [tool_input]
    : (tool_input.edits ?? []);
  for (const e of edits) {
    current = e.replace_all
      ? current.split(e.old_string).join(e.new_string ?? "")
      : current.replace(e.old_string, e.new_string ?? "");
  }
  proposed = current;
}

const after = checked(proposed);
const lost = [...checked(head)].filter((id) => !after.has(id));
if (lost.length) {
  // stderr on exit 2 goes back to the agent as feedback, not to a log nobody
  // reads. So it says what was refused and what to do instead: the next attempt
  // is a corrected edit, not the same edit again.
  console.error(
    `BLOCKED: this edit would uncheck steps closed in HEAD: ${lost.join(", ")}. ` +
    `Completed steps are not reopened from ROADMAP.md. Keep their [x] and retry the edit.`
  );
  process.exit(2);
}
process.exit(0);
