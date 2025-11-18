import { Planet } from "@/types/Planet";
import React from "react";
import { Image } from "react-native";

interface BackgroundDecorationsProps {
  planets: Planet[];
}

export default function BackgroundDecorations({
  planets,
}: BackgroundDecorationsProps) {
  return (
    <>
      {planets.map((p, i) => (
        <Image
          key={i}
          source={{ uri: p.uri }}
          resizeMode="contain"
          style={[{ position: "absolute" }, p.style]}
        />
      ))}
    </>
  );
}
