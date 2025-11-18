

// BottomDrawer.controller.ts
import { useAssets } from "@/contexts/AssetsContext";
import { closeDrawer } from "@/redux/drawerSlice";
import { RootStateType } from "@/store";
import { BottomDrawerControllerResult } from "@/types/BottomDrawer.types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
console.log("🔥 BottomDrawer.controller.ts LOADED");

export function useBottomDrawerController(
  currentRouteName?: string
): BottomDrawerControllerResult {
  const dispatch = useDispatch();
  const { open } = useSelector((state: RootStateType) => state.drawer);
  const { loadedAssets } = useAssets();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  const PROTECTED_ROUTES = ["LoginScreen", "WelcomeScreen"];

  useEffect(() => {
    console.log(open)
    const sheet = bottomSheetRef.current;
    if (!sheet) return;

    open ? sheet.expand() : sheet.close();
  }, [open]);

  // Auto-close when route changes
  useEffect(() => {
    if (!currentRouteName) return;

    if (PROTECTED_ROUTES.includes(currentRouteName)) {
      dispatch(closeDrawer());
    }
  }, [currentRouteName]);

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
