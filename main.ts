import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.png");

if (!existsSync(sourcePath)) {
  throw new Error(`entry.png not found beside main.ts: ${sourcePath}`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, outputPath);

const sourceBytes = readFileSync(sourcePath);
const outputBytes = readFileSync(outputPath);

const sha256 = (data: Buffer): string =>
  createHash("sha256").update(data).digest("hex");

const sourceHash = sha256(sourceBytes);
const outputHash = sha256(outputBytes);

if (sourceHash !== outputHash) {
  throw new Error(
    `entry.png copy failed integrity check: source sha256 ${sourceHash} != output sha256 ${outputHash}`,
  );
}

console.log(`Copied entry.png (${sourceBytes.length} bytes) to ${outputPath}`);
console.log(`sha256: ${sourceHash}`);
