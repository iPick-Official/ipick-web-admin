export function createCircularMarker(
  imageUrl: string,
  size = 45,
  borderColor = "#008000",
  borderWidth = 4
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // required for S3 signed URLs
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("Failed to get canvas context");

      // Draw border ring
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = borderColor;
      ctx.fill();

      // Clip to inner circle
      const innerRadius = (size - borderWidth * 2) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, innerRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Scale image to fill circle without stretching
      const scale = Math.max(
        (innerRadius * 2) / img.width,
        (innerRadius * 2) / img.height
      );
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const dx = size / 2 - drawWidth / 2;
      const dy = size / 2 - drawHeight / 2;

      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

      ctx.restore();

      resolve(canvas.toDataURL());
    };

    img.onerror = reject;
  });
}
