// src/utils/loadAssets.ts
import { Image } from "expo-image";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout")), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}


/**
 * Preload and cache remote images intelligently.
 */
export async function preloadImages<T extends Record<string, string | number>>(
  images: T,
  timeoutMs = 8000
): Promise<T> {
  await Promise.all(
    Object.entries(images).map(async ([key, uri]) => {
      if (typeof uri !== "string") return;

      try {
        // Expo Image prefetch with disk cache policy
        await Image.prefetch(uri, { cachePolicy: "disk" });
      } catch (e) {
        console.warn(`⚠️ Failed to preload image [${key}]: ${uri}`, e);
      }
    })
  );

  return images;
}