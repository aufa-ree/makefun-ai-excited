// Entry for the make.fun "Make the AI judge excited" bounty (ai-excited-01).
//
// The artwork is a finished, self-contained image: entry.png, which sits
// next to this file. This program's only job is to place a copy of it into
// the output folder the harness points at with MAKEFUN_OUTPUT_DIR
// (falling back to /output when the variable is not set).

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(targetDir, "entry.png");

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);

// Integrity check: the copied file must be byte-identical to the source.
// Hashes only; the output bytes are never modified.
const sourceHash = createHash("sha256").update(readFileSync(source)).digest("hex");
const targetHash = createHash("sha256").update(readFileSync(target)).digest("hex");
if (sourceHash !== targetHash) {
  throw new Error(`Integrity check failed: copy hash ${targetHash} != source hash ${sourceHash}`);
}
console.log(`Wrote ${target} (${statSync(target).size} bytes, sha256 ${targetHash})`);
