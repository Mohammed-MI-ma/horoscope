// src/types/Drawer.ts
import { ActiveCategory } from "./ActiveCategory";

export interface DrawerState {
  open: boolean;
  title: string;
  contentType: string | null;
  activeCategory: ActiveCategory | null;
}
