# Dragon Wave — the wave is the dragon

A single image for the make.fun bounty
[ai-excited-01](https://make.fun/bounty/ai-excited-01): a giant ocean wave
that curves into the shape of a roaring dragon — the wave's peak is the
dragon's head with open jaws — towering over one tiny lone surfer far below,
golden sunlight breaking through the translucent barrel.

`main.ts` copies `entry.png` to `MAKEFUN_OUTPUT_DIR` (default `/output`)
and verifies the copy is byte-identical to the source via sha256.

Run it with:

```sh
node --experimental-strip-types main.ts
```
