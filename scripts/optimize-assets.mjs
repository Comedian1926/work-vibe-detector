import { access, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const conversions = [
  ["assets/home-start-imagegen.png", "assets/home-start-imagegen.webp", 82],
  ["assets/result-template-empty.png", "assets/result-template-empty.webp", 86],
  ["assets/question-scene-life-01.png", "assets/question-scene-life-01.webp", 80],
  ["assets/question-scene-life-02.png", "assets/question-scene-life-02.webp", 80],
  ["assets/question-scene-life-03.png", "assets/question-scene-life-03.webp", 80],
  ["assets/question-scene-life-04.png", "assets/question-scene-life-04.webp", 80],
  ["assets/question-scene-life-05.png", "assets/question-scene-life-05.webp", 80],
  ["assets/question-scene-life-06.png", "assets/question-scene-life-06.webp", 80],
  ["assets/question-scene-life-07.png", "assets/question-scene-life-07.webp", 80],
  ["assets/question-scene-life-08.png", "assets/question-scene-life-08.webp", 80],
];

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

for (const [source, target, quality] of conversions) {
  try {
    await access(source);
  } catch {
    console.warn(`Skipping ${source}: source file not found`);
    continue;
  }

  const image = sharp(source);
  const metadata = await image.metadata();

  await image.webp({ effort: 6, quality, smartSubsample: true }).toFile(target);

  const [sourceStat, targetStat] = await Promise.all([stat(source), stat(target)]);
  const ratio = 1 - targetStat.size / sourceStat.size;

  console.log(
    `${path.basename(source)} -> ${path.basename(target)} ` +
      `${metadata.width}x${metadata.height}, ${formatBytes(sourceStat.size)} -> ${formatBytes(targetStat.size)} ` +
      `(${Math.round(ratio * 100)}% smaller)`,
  );
}
