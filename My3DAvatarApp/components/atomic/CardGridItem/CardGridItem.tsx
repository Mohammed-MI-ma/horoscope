import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import PressableMoti from "../PressableMoti/PressableMoti";
import { useAppFont } from "@/hooks/useAppFont";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { primaryShades } from "@/constants/theme";

export interface CardItem {
  id: string;
  label: string;
  subtitle: string;
  delay?: number;
  imageUri?: string;
}

interface Props {
  item: CardItem;
  size: number;
  loadedAssets: any;
  onPress?: (id: string) => void;

  delay?: number; // optional stagger delay
}

export default function CardGridItem({
  item,
  size,
  onPress,
  delay = 0,
}: Props) {
  const boldFont = useAppFont("bold");
  const fontFamily = useAppFont();
  const { t } = useTranslation();

  return (
    <PressableMoti onPress={() => onPress?.(item.id)}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 400,
          delay,
          easing: Easing.out(Easing.cubic),
        }}
        style={[styles.card, { width: size }]}
      >
        <Text style={[styles.cardText, { fontFamily: boldFont }]}>
          {item.label}
        </Text>

        <Text style={[styles.cardDesc, { fontFamily }]}>{item.subtitle}</Text>
      </MotiView>
    </PressableMoti>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#020314",
    margin: 5,
    borderRadius: 12,

    // iOS shadow
    shadowColor: "#727272ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android
    elevation: 3,
    padding: 10,
  },

  cardText: {
    fontSize: 20,
    color: "white",
  },
  cardDesc: {
    fontSize: 12,
    color: "white",
    opacity: 0.85,
  },
});
