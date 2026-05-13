# bb-in-hoodie: lab

This repo is the implementation space for experiments that appear in the Lab section of bb-in-hoodie.dev.

- https://bb-in-hoodie.dev
- https://lab.bb-in-hoodie.dev/

## Requirements

- Node ≥ 24
- pnpm ≥ 9.15

## Getting started

```bash
pnpm install
pnpm dev
```

The dev server serves every path registered in `src/common/routes/manifest.ts`, open one of those routes (e.g. `/3d/fbo-particles`) to see an experiment.
