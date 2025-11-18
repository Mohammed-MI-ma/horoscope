import { DimensionValue, ImageStyle } from "react-native";

export interface PlanetStyle extends ImageStyle {
  top?: DimensionValue;
  bottom?: DimensionValue;
  left?: DimensionValue;
  right?: DimensionValue;
  width?: DimensionValue;
  height?: DimensionValue;
  opacity?: number;
  position?: "absolute";
}

export interface Planet {
  uri: string;
  style: PlanetStyle;
}
