import React, { Suspense, useCallback } from "react";
import { useDispatch } from "react-redux";
import { closeDrawer } from "@/redux/drawerSlice";
import { hideOverlay } from "@/redux/globalOverlaySlice";

// Lazy-load the heavy animation component
const LazyFullScreenAnimation = React.lazy(
  () => import("../GenericFullScreenAnimation"),
);

type Props = {
  animationJson: string;
};

export default function PleaseLoginAnimation({ animationJson }: Props) {
  const dispatch = useDispatch();

  const handleFinish = useCallback(() => {
    dispatch(closeDrawer());
    dispatch(hideOverlay());
  }, [dispatch]);

  return (
    <Suspense fallback={null}>
      <LazyFullScreenAnimation
        animationJson={animationJson}
        onFinish={handleFinish}
      />
    </Suspense>
  );
}
