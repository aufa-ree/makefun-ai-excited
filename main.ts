// Dragon Wave image entry for make.fun ai-excited-01.
// Deterministically copies entry.png to the output dir (MAKEFUN_OUTPUT_DIR,
// default /output) and verifies the copy with a sha256 integrity check.
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const dest = join(outDir, "entry.png");

const input = readFileSync(source);
const inputHash = createHash("sha256").update(input).digest("hex");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, dest);

const output = readFileSync(dest);
const outputHash = createHash("sha256").update(output).digest("hex");

if (outputHash !== inputHash) {
  throw new Error(
    `entry.png copy mismatch: source sha256 ${inputHash} != output sha256 ${outputHash}`,
  );
}

console.log(
  `copied ${statSync(dest).size} bytes, sha256 ${outputHash} -> ${dest}`,
);
