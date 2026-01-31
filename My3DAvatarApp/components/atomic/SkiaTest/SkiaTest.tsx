import React from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, Circle, Rect } from "@shopify/react-native-skia";

export default function SkiaTest() {
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {/* Red circle */}
        <Circle cx={100} cy={100} r={50} color="red" />
        {/* Blue rectangle */}
        <Rect x={50} y={200} width={200} height={100} color="blue" />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  canvas: {
    flex: 1,
  },
});
