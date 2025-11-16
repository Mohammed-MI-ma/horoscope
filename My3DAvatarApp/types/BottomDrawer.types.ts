
// BottomDrawer.types.ts
export interface BottomDrawerProps {
  currentRouteName?: string;
}

export interface BottomDrawerControllerResult {
  open: boolean;
  handleSheetChange: (index: number) => void;
  bottomSheetRef: React.RefObject<any>;
  snapPoints: string[];
  loadedAssets: any;
}
