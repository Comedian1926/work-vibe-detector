import { toPng } from "html-to-image";

export async function saveReportImage(target, filename) {
  if (!target) {
    throw new Error("Report poster element is missing");
  }

  await waitForAssets(target);

  const dataUrl = await toPng(target, {
    backgroundColor: "#07101a",
    cacheBust: true,
    pixelRatio: 2,
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

async function waitForAssets(target) {
  await document.fonts?.ready;

  const images = [...target.querySelectorAll("img")];
  await Promise.all(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) return Promise.resolve();

      return new Promise((resolve, reject) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", reject, { once: true });
      });
    }),
  );
}
