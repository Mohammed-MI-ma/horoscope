import React, { useRef, useState } from "react";
import { View, PanResponder, StyleSheet } from "react-native";
import { Canvas, Path, Skia, Rect, Group } from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

type ZodiacScratchCardProps = {
  width?: number;
  height?: number;
  brushSize?: number;
  overlayColor?: string;
  children: React.ReactNode;
};

export const ZodiacScratchCard: React.FC<ZodiacScratchCardProps> = ({
  width = 250,
  height = 120,
  brushSize = 40,
  overlayColor = "#222",
  children,
}) => {
  const pathsRef = useRef<ReturnType<typeof Skia.Path.Make>[]>([]);
  const currentPath = useRef<ReturnType<typeof Skia.Path.Make> | null>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [, forceUpdate] = useState(0);

  const handleScratch = (x: number, y: number) => {
    if (!currentPath.current) {
      const path = Skia.Path.Make();
      path.moveTo(x, y);
      currentPath.current = path;
      pathsRef.current.push(path);
      lastPoint.current = { x, y };
    } else if (lastPoint.current) {
      const midX = (lastPoint.current.x + x) / 2;
      const midY = (lastPoint.current.y + y) / 2;
      currentPath.current.quadTo(lastPoint.current.x, lastPoint.current.y, midX, midY);
      lastPoint.current = { x, y };
    }

    forceUpdate((v) => v + 1);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => handleScratch(e.nativeEvent.locationX, e.nativeEvent.locationY),
      onPanResponderMove: (e) => handleScratch(e.nativeEvent.locationX, e.nativeEvent.locationY),
      onPanResponderRelease: () => {
        currentPath.current = null;
        lastPoint.current = null;
      },
    })
  ).current;

  return (
    
    <View style={{ width, height, borderRadius: 50, overflow: "hidden" }} {...panResponder.panHandlers}>
      {/* Children layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {children}
      </View>

      {/* Canvas layer */}
      <Canvas style={StyleSheet.absoluteFill}>
        {/* overlay */}
        <Rect x={0} y={0} width={width} height={height} color={overlayColor} />

        {/* erased paths */}
        <Group blendMode="dstOut">
          {pathsRef.current.map((p, i) => (
            <Path
              key={i}
              path={p}
              color="white"
              style="stroke"
              strokeWidth={brushSize}
              strokeCap="round"
              strokeJoin="round"
            />
          ))}
        </Group>
      </Canvas>
    </View>
  );
};
