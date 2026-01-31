import React, { useRef, useState } from "react";
import { View, Text, Vibration, Image } from "react-native";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { MotiPressable } from "moti/interactions";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { primaryShades } from "@/constants/theme";
import styles from "./OverlappingCards.styles";
import { Celebrity } from "../FamousPeopleWithSunIn/FamousPeopleWithSunIn";
import { RootStackParamList } from "@/types/types";

const CARD_WIDTH = 40;
const OVERLAP = CARD_WIDTH * 0.6;

type OverlappingCardsProps = {
  cards: Celebrity[];
};

export const OverlappingCards: React.FC<OverlappingCardsProps> = ({
  cards,
}) => {
  const shadeKeys = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const [spread, setSpread] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const longPressed = useRef(false);

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        const shadeKey = shadeKeys[index % shadeKeys.length] as
          | 100
          | 200
          | 300
          | 400
          | 500
          | 600
          | 700
          | 800
          | 900;

        return (
          <MotiPressable
            key={card.id}
            onPressIn={() => {
              longPressed.current = false;
              longPressTimeout.current = setTimeout(() => {
                longPressed.current = true;
                Vibration.vibrate(50);
                navigation.navigate("CelebrityDetailsScreen", {
                  cardId: card.id,
                });
              }, 350); // délai long press
            }}
            onPressOut={() => {
              if (longPressTimeout.current) {
                clearTimeout(longPressTimeout.current);
              }
            }}
            onPress={() => {
              if (longPressed.current) return; // empêche le tap après long press
              Vibration.vibrate(20);
              setSpread(!spread);
            }}
            animate={({ pressed }) => {
              "worklet";
              return {
                scale: pressed ? 0.95 : 1,
              };
            }}
            transition={{
              type: "timing",
              duration: 120,
            }}
          >
            <MotiView
              from={{ marginLeft: index === 0 ? 0 : -OVERLAP }}
              animate={{ marginLeft: index === 0 ? 0 : spread ? 10 : -OVERLAP }}
              transition={{
                type: "timing",
                duration: 300,
                easing: Easing.out(Easing.exp),
              }}
            >
              <View
                style={[
                  styles.card,
                  {
                    zIndex: cards.length - index,
                    backgroundColor: primaryShades[shadeKey],
                  },
                ]}
              >
                <Image
                  source={{ uri: card.profileUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              {spread && (
                <>
                  <Text style={styles.title}>{card.fullName}</Text>
                  <Text style={styles.zodiacLabel}>{card.zodiacSign}</Text>
                </>
              )}
            </MotiView>
          </MotiPressable>
        );
      })}
    </View>
  );
};
