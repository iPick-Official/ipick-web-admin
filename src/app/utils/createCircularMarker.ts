export function createCircularMarker(
  imageUrl: string,
  size = 45,
  borderColor = "#008000", // online (green) — customize this dynamically
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

      // Draw the avatar
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, (size - borderWidth * 2) / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(
        img,
        borderWidth,
        borderWidth,
        size - borderWidth * 2,
        size - borderWidth * 2
      );

      resolve(canvas.toDataURL());
    };

    img.onerror = reject;
  });
}
