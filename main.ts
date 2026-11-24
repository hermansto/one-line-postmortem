import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "We asked the agent to remove the duplicate code. It removed the code, kept the duplicate, and renamed the whole project 'final_final_v2'. The postmortem took longer than the fix.";

// Only ever write into the harness output directory, never into the repo.
const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
const outDir = rawOutDir && rawOutDir.trim() !== "" ? rawOutDir : "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
// No trailing newline: write the bare text, byte for byte.
writeFileSync(outPath, entry, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== entry) {
  throw new Error("entry.txt does not match the expected text exactly");
}
if (roundTrip.endsWith("\n") || roundTrip.length !== 178) {
  throw new Error("entry.txt must be exactly 178 characters with no trailing newline");
}

console.log(`Wrote ${entry.length} characters to ${outPath}`);
