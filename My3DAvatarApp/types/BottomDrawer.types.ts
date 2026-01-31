
export interface BottomDrawerProps {
  currentRouteName?: string;
  isLoggedIn?: boolean;
}

export interface BottomDrawerControllerResult {
  open: boolean;
  handleSheetChange: (index: number) => void;
  bottomSheetRef: React.RefObject<any>; // safe and compatible
  snapPoints: string[];
  loadedAssets: any;
  isRTL: boolean;
}
