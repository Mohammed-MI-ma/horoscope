import React from "react";
import { StatusBar } from "expo-status-bar";

const GlobalStatusBar = () => {
  return (
    <StatusBar
      style="dark"
    />
  );
};

export default React.memo(GlobalStatusBar);
