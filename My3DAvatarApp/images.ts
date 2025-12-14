// src/utils/images.ts

// ---- Base URL for all assets ----
const BASE_URL =
  "https://raw.githubusercontent.com/Mohammed-MI-ma/horoscopeAssets/main/";

// ---- Type definitions ----
export type AssetMap = Record<string, string>;

// ---- Helper to generate full URL ----
const asset = (filename: string) => `${BASE_URL}${filename}`;

// ---- Global / common assets ----
export const global_Assets: AssetMap = {
  background: asset("background.webp"),
  earth: asset("earth.webp"),
  logo: asset("LOGOO.png"),
  logoD: asset("LOGO_D.png"),
  stars: asset("stars.webp"),
  planet1: asset("planet2.png"),
};

// ---- Wishing screen assets ----
export const wish_Assets: AssetMap = {
  bg: asset("grid.png"),
  love: asset("love.png"),
  money: asset("money.png"),
  family: asset("family.png"),
  dream: asset("dream.png"),
  travel: asset("travel.png"),
};

// ---- Bottom Drawer assets ----
export const bottomDrawer_Assets: AssetMap = {
  drawerBackground: asset("drawerBackground.png"),
  iconSettings: asset("iconSettings.png"),
  iconProfile: asset("iconProfile.png"),
  iconLogout: asset("iconLogout.png"),
};

// ---- Welcome screen assets (only assets needed for this screen) ----
export const welcome_Assets: AssetMap = {
  mars: asset("mars.webp"),
  earth: asset("earth.webp"),
  planet1: asset("planet2.png"),
  logo: asset("LOGOO.png"),
  logoD: asset("LOGO_D.png"),
  stars: asset("stars.webp"),
};

// ---- Optional arrays for iteration ----
export const global_AssetsArray: string[] = Object.values(global_Assets);
export const wish_AssetsArray: string[] = Object.values(wish_Assets);
export const welcome_AssetsArray: string[] = Object.values(welcome_Assets);
export const bottomDrawer_AssetsArray: string[] =
  Object.values(bottomDrawer_Assets);

// ---- Helper to merge multiple asset maps ----
export const mergeAssets = (...assetMaps: AssetMap[]): AssetMap =>
  Object.assign({}, ...assetMaps);
