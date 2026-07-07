export async function saveReportImage(result, backgroundUrl) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");
  const bg = await loadImage(backgroundUrl);

  drawCover(ctx, bg, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(244, 247, 240, 0.68)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#172033";
  ctx.font = "700 34px Microsoft YaHei, sans-serif";
  ctx.fillText("WORK VIBE INSPECTION", 86, 108);
  ctx.font = "900 70px Microsoft YaHei, sans-serif";
  ctx.fillText("班味鉴定报告", 86, 188);

  ctx.save();
  ctx.translate(884, 142);
  ctx.rotate((-8 * Math.PI) / 180);
  ctx.strokeStyle = "#ff9f1c";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, 68, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#b65200";
  ctx.font = "900 34px Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(result.level.stamp, 0, 0);
  ctx.restore();

  ctx.fillStyle = "#111827";
  ctx.font = "900 160px Consolas, Microsoft YaHei, monospace";
  ctx.fillText(`${result.percent}%`, 86, 390);

  roundedRect(ctx, 86, 424, 760, 62, 18, "#39ff88");
  ctx.fillStyle = "#07130d";
  ctx.font = "900 34px Microsoft YaHei, sans-serif";
  ctx.fillText(`${result.level.name} · ${result.level.title}`, 112, 466);

  drawSection(ctx, "鉴定身份", result.identity.identity, 86, 590);
  drawListSection(ctx, "症状描述", result.symptoms, 86, 735);
  drawSection(ctx, "今日处方", result.prescription, 86, 1084, 860);

  ctx.fillStyle = "#596778";
  ctx.font = "500 26px Consolas, Microsoft YaHei, monospace";
  ctx.fillText(result.cert, 86, 1300);
  ctx.textAlign = "right";
  ctx.fillText(result.dateText, 994, 1300);

  const link = document.createElement("a");
  link.download = `work-vibe-report-${result.percent}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function drawSection(ctx, title, body, x, y, width = 860) {
  ctx.fillStyle = "#596778";
  ctx.font = "800 28px Microsoft YaHei, sans-serif";
  ctx.fillText(title, x, y);
  ctx.fillStyle = "#1d2a3b";
  ctx.font = "600 36px Microsoft YaHei, sans-serif";
  wrapText(ctx, body, x, y + 58, width, 50);
}

function drawListSection(ctx, title, lines, x, y) {
  ctx.fillStyle = "#596778";
  ctx.font = "800 28px Microsoft YaHei, sans-serif";
  ctx.fillText(title, x, y);
  ctx.fillStyle = "#1d2a3b";
  ctx.font = "500 31px Microsoft YaHei, sans-serif";
  let cursor = y + 58;
  lines.forEach((line) => {
    cursor = wrapText(ctx, `· ${line}`, x, cursor, 850, 43) + 12;
  });
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = [...text];
  let line = "";
  let cursorY = y;
  chars.forEach((char) => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = char;
      cursorY += lineHeight;
    } else {
      line = test;
    }
  });
  if (line) ctx.fillText(line, x, cursorY);
  return cursorY + lineHeight;
}

function roundedRect(ctx, x, y, width, height, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.fill();
}

function drawCover(ctx, image, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (image.width - sw) / 2;
  const sy = (image.height - sh) / 2;
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}
