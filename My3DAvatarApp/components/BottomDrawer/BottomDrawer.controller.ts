// BottomDrawer.controller.ts
import { useAssets } from "@/contexts/AssetsContext";
import { closeDrawer, openDrawer } from "@/redux/drawerSlice";
import { RootStateType } from "@/store";
import { BottomDrawerControllerResult } from "@/types/BottomDrawer.types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { I18nManager } from "react-native";
import { useDispatch, useSelector } from "react-redux";
const PROTECTED_ROUTES = ["OnBoardingScreen", "WishlistScreen"]; // move outside hook

export function useBottomDrawerController(
  currentRouteName?: string,
  isLoggedIn?: boolean
): BottomDrawerControllerResult {
  const dispatch = useDispatch();
  const { open } = useSelector((state: RootStateType) => state.drawer);
  const { loadedAssets } = useAssets();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // Track current sheet index: -1 = closed, 0+ = snap points
  const sheetIndexRef = useRef<number>(-1);
  // Handle sheet changes to keep Redux in sync
  const handleSheetChange = useCallback(
    (index: number) => {
      sheetIndexRef.current = index;
      if (index === -1 && open) dispatch(closeDrawer());
    },
    [dispatch, open]
  );
  // Sync BottomSheet open/close with Redux state
  useEffect(() => {
    const sheet = bottomSheetRef.current;
    if (!sheet) return;

    if (open && sheetIndexRef.current === -1) {
      sheet.expand(); // only expand if currently closed
    } else if (!open && sheetIndexRef.current !== -1) {
      sheet.close(); // only close if currently open
    }
  }, [open]);

  // Auto-open for protected routes when not logged in
  useEffect(() => {
    const sheet = bottomSheetRef.current;
    if (!sheet || !currentRouteName) return;

    const shouldOpen =
      !isLoggedIn && PROTECTED_ROUTES.includes(currentRouteName);

    if (shouldOpen && sheetIndexRef.current === -1) {
      sheet.expand();
      if (!open) dispatch(openDrawer());
    } else if (!shouldOpen && sheetIndexRef.current !== -1) {
      sheet.close();
      if (open) dispatch(closeDrawer());
    }
  }, [currentRouteName, isLoggedIn, open, dispatch]);
return {
    open,
    loadedAssets,
    bottomSheetRef,
    snapPoints,
    handleSheetChange,
    // RTL-aware flag for icon mirroring
    isRTL: I18nManager.isRTL,
  };
}