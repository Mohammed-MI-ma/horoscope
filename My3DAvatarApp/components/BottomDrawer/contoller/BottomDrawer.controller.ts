// BottomDrawer.controller.ts
import { useAssets } from "@/contexts/AssetsContext";
import { closeDrawer } from "@/redux/drawerSlice";
import { BottomDrawerControllerResult, RootStateType } from "@/types/BottomDrawer.types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useBottomDrawerController(
  currentRouteName?: string
): BottomDrawerControllerResult {
  const dispatch = useDispatch();
  const { open } = useSelector((state: RootStateType) => state.drawer);
  const { loadedAssets } = useAssets();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["70%"], []);

  const PROTECTED_ROUTES = ["LoginScreen", "WelcomeScreen"];

  useEffect(() => {
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
