# Next.js Runtime Cache Troubleshooting

## Symptom

The local site may fail with an error such as:

```text
Cannot find module './vendor-chunks/next.js'
```

Similar errors may name a numbered chunk that no longer exists. Pages can also
appear without CSS when the running server references assets from an older
`.next` build.

## Likely Cause

The recurring cause is a stale Next.js process serving files from `.next` while
another command replaces or removes that same directory.

Both `next dev` and `next build` use `.next` by default. Running them at the same
time, rebuilding while an IDE-started dev server is still alive, or deleting
`.next` before stopping every Next process can leave the old server holding
references to chunks that the new build no longer contains.

The application source does not import generated `.next` files or vendor chunks.

## Clean Recovery

Run these commands from the project root:

```bash
pkill -f "node_modules/.bin/next"
pkill -f "next-server"
rm -rf .next
rm -rf node_modules/.cache
npm run lint
npm run build
npm run dev
```

Reinstall dependencies only if a clean build fails with an error originating
from `node_modules`, rather than a missing `.next` chunk.

## Prevention

- Keep only one Next.js dev server running for this repository.
- Stop `npm run dev` before running `npm run build` or deleting `.next`.
- Do not run `next dev`, `next build`, and `next start` concurrently against the
  same project directory.
- Check IDE tasks and terminals for background dev servers before rebuilding.
- If production and development servers must run together, configure separate
  Next.js output directories for them.
