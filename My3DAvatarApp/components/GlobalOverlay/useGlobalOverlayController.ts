import { useEffect, useMemo } from "react";
import { BackHandler } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootStateType } from "@/store";
import { closeDrawer } from "@/redux/drawerSlice";

export function useGlobalOverlayController() {
  const dispatch = useDispatch();

  const { type } = useSelector(
    (state: RootStateType) => state.globalOverlay,
    shallowEqual,
  );

  const state = useMemo(() => {
    const isVisible = Boolean(type);
    const isBlocking = type === "locked";
    const isCelebration = type === "pleaseLoginAnimation";

    return {
      type,
      isVisible,
      isBlocking,
      isCelebration,
    };
  }, [type]);

  /* Close drawer on celebration */
  useEffect(() => {
    if (state.isCelebration) {
      dispatch(closeDrawer());
    }
  }, [state.isCelebration, dispatch]);

  /* Block Android back button */
  useEffect(() => {
    if (!state.isVisible) return;

    const sub = BackHandler.addEventListener("hardwareBackPress", () => true);

    return () => sub.remove();
  }, [state.isVisible]);
  console.log("qsdqsdqsdqsd", state);
  return state;
}
