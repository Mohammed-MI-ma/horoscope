// src/config/config.dev.ts

import { global_Assets } from "./images";
import { preloadImages } from "./utils/loadAssets";



/**
 * Preload all global assets before rendering the app.
 * @returns Promise<void>
 */
export async function preloadGlobalAssets(): Promise<void> {
  try {
    await preloadImages(global_Assets, 5000);
    console.log("✅ All global assets preloaded successfully.");
  } catch (e) {
    console.error("❌ Global assets preload failed", e);
  }
}