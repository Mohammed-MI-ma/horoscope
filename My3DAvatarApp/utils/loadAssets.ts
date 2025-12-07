import { Image } from "react-native";

export type AssetMap = Record<string, string | number>;

export async function preloadImages<T extends AssetMap>(
  images: T | undefined,
  fallback: Partial<Record<keyof T, string>> = {},
  timeoutMs = 8000
): Promise<T> {
  if (!images || typeof images !== "object") {
    console.warn("preloadImages: images is undefined or not an object");
    return {} as T;
  }

  const entries = Object.entries(images) as [keyof T, string | number][];

  // simulate slow network
  await Promise.allSettled(
    entries.map(async ([key, uri]) => {
      if (typeof uri !== "string") return;

      try {
        const prefetchPromise = Image.prefetch(uri);

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout preloading ${key}`)), timeoutMs)
        );

        await Promise.race([prefetchPromise, timeoutPromise]);
      } catch (err) {
        console.warn(`⚠️ Failed to preload image [${String(key)}]: ${uri}`, err);
        // fallback
        if (fallback[key]) images[key] = fallback[key];
      }
    })
  );

  return images;
}
