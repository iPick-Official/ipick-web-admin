import imageCompression from "browser-image-compression";

// helper to generate random letters
const randomLetters = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const compressAndRenameImage = async (file: File) => {
  const compressed = await imageCompression(file, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  });

  const ext = compressed.type.split("/")[1];
  const prefix = randomLetters(6); // 6 random letters
  const renamedFile = new File([compressed], `${prefix}_${Date.now()}.${ext}`, {
    type: compressed.type,
  });

  return renamedFile;
};
