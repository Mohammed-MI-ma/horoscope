import { useAssets } from "@/contexts/AssetsContext";
import { useAppFont } from "@/hooks/useAppFont";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PressableMoti from "../PressableMoti/PressableMoti";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 10;
const NUM_COLUMNS = 2;
const CARD_SIZE = (width - CARD_MARGIN * (NUM_COLUMNS + 1) - 10) / NUM_COLUMNS;

const cards = [
  { id: "card1", label: "تحليل الشخصية" },
  { id: "card2", label: "تحليل الشخصية" },
  { id: "card3", label: "تحليل الشخصية" },
  { id: "card4", label: "تحليل الشخصية" },
];


export default function CardGrid() {
  const { loadedAssets } = useAssets();
  const boldFont = useAppFont("bold");
  const fontFamily = useAppFont();

  return (
  <FlatList
  data={cards}
  keyExtractor={(item) => item.id}
  numColumns={NUM_COLUMNS}
  renderItem={({ item }) => (
    <PressableMoti onPress={() => console.log("Pressed:", item.id)}>
      <View style={styles.card}>
        <Image
          source={{ uri: loadedAssets.planet1 }}
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
        />

        <Text style={[styles.cardText, { fontFamily: boldFont }]}>
          {item.label}
        </Text>

        <Text style={[styles.cardDesc, { fontFamily: fontFamily }]}>
          أفضل تطبيق يجمع تطبيق تطبيق تطبيق تطبيق
        </Text>
      </View>
    </PressableMoti>
  )}
/>

  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: "#020314",
    margin: CARD_MARGIN / 2,
    borderRadius: 12,
    // iOS shadow
    shadowColor: "#727272ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Android elevation
    elevation: 3,
    padding: 10,
  },
  cardText: {
    fontSize: 16,
    color: "white",
  },
  cardDesc: {
    fontSize: 12,
    color: "white",
  },
});
