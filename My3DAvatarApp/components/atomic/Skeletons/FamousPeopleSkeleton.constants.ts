import { primaryShades } from "@/constants/theme";

export const ITEM_COUNT = 10;
export const ITEM_SIZE = 45;
export const OVERLAP = -40 * 0.6;

const SHADE_KEYS = ["300", "200", "400", "100", "500"] as const;

export const SKELETON_COLORS = SHADE_KEYS.map((shade) => [
  primaryShades[shade],
  primaryShades["200"],
]);

export const ITEMS = Array.from({ length: ITEM_COUNT });
