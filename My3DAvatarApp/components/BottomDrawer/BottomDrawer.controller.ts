// BottomDrawer.controller.ts
import { useAssets } from "@/contexts/AssetsContext";
import { closeDrawer, openDrawer } from "@/redux/drawerSlice";
import { RootStateType } from "@/store";
import { BottomDrawerControllerResult } from "@/types/BottomDrawer.types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useBottomDrawerController(
  currentRouteName?: string,
  isLoggedIn?: boolean
): BottomDrawerControllerResult {
  const dispatch = useDispatch();
  const { open } = useSelector((state: RootStateType) => state.drawer);
  const { loadedAssets } = useAssets();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  // List of routes that require authentication
  const PROTECTED_ROUTES = ["OnBoardingScreen", "WishlistScreen"];

  // Open/close drawer based on Redux state (optional)
  useEffect(() => {
    const sheet = bottomSheetRef.current;
    if (!sheet) return;

    open ? sheet.expand() : sheet.close();
  }, [open]);

  // Auto-open drawer for protected routes if not logged in
  useEffect(() => {
    const sheet = bottomSheetRef.current;
    if (!sheet || !currentRouteName) return;

    if (!isLoggedIn && PROTECTED_ROUTES.includes(currentRouteName)) {
      sheet.expand(); // automatically open drawer
      dispatch(openDrawer()); // optional: keep Redux in sync
    } else {
      sheet.close(); // auto-close if route changes or user logs in
      dispatch(closeDrawer());
    }
  }, [currentRouteName, isLoggedIn]);

  const handleSheetChange = (index: number) => {
    if (index === -1) dispatch(closeDrawer());
  };

  return {
    open,
    loadedAssets,
    bottomSheetRef,
    snapPoints,
    handleSheetChange,
  };
}
