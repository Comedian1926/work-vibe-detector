# Work Vibe Detector

班味浓度检测仪是一个梗向 H5 小测验：用户回答 8 道职场情境题，生成一张可保存和分享的“班味鉴定报告”。

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS v4
- shadcn-style UI primitives
- Node built-in test runner

## Features

- Four-step flow: home, quiz, scan, result
- Work-vibe scoring by dimensions and score bands
- Responsive report card layout
- Canvas-generated share image export
- Optimized WebP runtime assets
- Logic tests for scoring behavior

## Local Development

```bash
npm install
npm run dev
```

The app runs at:

```text
http://127.0.0.1:5173/
```

## Scripts

```bash
npm test
npm run build
npm run optimize:assets
```

`optimize:assets` converts local PNG source art into WebP files with `sharp`. The public repository tracks optimized runtime WebP assets; large PNG source art is intentionally ignored to keep the repo light.

## Project Structure

```text
src/
  App.jsx                App state machine and top-level flow
  data.js                Questions, dimensions, levels, scan messages
  logic.js               Scoring and report data generation
  reportImage.js         Canvas report image export
  components/            Screen and report components
  components/ui/         UI primitives
tests/
  logic.test.mjs         Scoring tests
scripts/
  optimize-assets.mjs    Asset conversion script
assets/
  *.webp                 Runtime visual assets
```

## Validation

Current checks:

```bash
npm test
npm run build
```
