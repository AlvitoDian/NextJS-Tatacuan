import sharp from "sharp";
import axios from "axios";

export async function resizeImage(
  imageUrl: string,
  maxSizeKB: number = 150
): Promise<string> {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    const resizedBuffer = await sharp(buffer)
      .resize({ width: 600 })
      .jpeg({ quality: 70 })
      .toBuffer();

    if (resizedBuffer.length / 1024 > maxSizeKB) {
      const quality = Math.max(
        30,
        Math.floor((maxSizeKB * 1024 * 100) / resizedBuffer.length)
      );
      const compressed = await sharp(buffer)
        .resize({ width: 600 })
        .jpeg({ quality })
        .toBuffer();

      return `data:image/jpeg;base64,${compressed.toString("base64")}`;
    }

    return `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;
  } catch (err) {
    console.error("Resize error:", err);
    return imageUrl;
  }
}
