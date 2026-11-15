// Dragon Wave — make.fun ai-excited-01 entry.
// Copies the generated image to the output directory and verifies the
// copy is byte-identical to the source before exiting.

import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");

const source = readFileSync(sourcePath);
const sourceHash = createHash("sha256").update(source).digest("hex");

mkdirSync(outDir, { recursive: true });
copyFileSync(sourcePath, outPath);

const copy = readFileSync(outPath);
const copyHash = createHash("sha256").update(copy).digest("hex");

if (copyHash !== sourceHash) {
  throw new Error(
    `integrity check failed: output hash ${copyHash} != source hash ${sourceHash}`,
  );
}

console.log(`wrote ${outPath} (${copy.length} bytes, sha256 ${copyHash})`);
