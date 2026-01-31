// FamousPeopleWithSunIn.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Button } from "native-base";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./FamousPeopleWithSunIn.styles";
import { OverlappingCards } from "../OverlappingCards/OverlappingCards";
import { useAppFont } from "@/hooks/useAppFont";
import { FamousPeopleSkeleton } from "../Skeletons/FamousPeopleSkeleton";
import { fontSizes, primaryShades } from "@/constants/theme";
import Animated, {
  FadeInRight,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type ImageCardProps = {
  img: { uri: string };
  index: number;
  progress: any;
  images: { uri: string }[];
};

const ImageCard: React.FC<ImageCardProps> = ({
  img,
  index,
  progress,
  images,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const delay = index * 120;

    return {
      opacity: withDelay(delay, withTiming(progress.value, { duration: 600 })),
      transform: [
        {
          translateX: withDelay(
            delay,
            withTiming(progress.value ? 0 : 24, {
              duration: 600,
            })
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <ImageBackground
        source={img}
        style={[
          styles.column,
          index === images.length - 1 && { borderRightWidth: 0 },
        ]}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.95)",
            "rgba(0,0,0,0.45)",
            "rgba(0,0,0,0.15)",
            "rgba(0,0,0,0)",
          ]}
          locations={[0, 0.35, 0.65, 1]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>
    </Animated.View>
  );
};

export type Celebrity = {
  fullName?: string;
  birthDate?: string; // ISO string or Date
  zodiacSign?: string;
  profileUrl: string; // URL from DB
};

type FamousPeopleWithSunInProps = {
  cards: Celebrity[]; // data from parent
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const images = [
  { uri: "https://image.tmdb.org/t/p/w500/9o0uBCFg7ridSREaXLvReWzggUz.jpg" },
  {
    uri: "https://media.themoviedb.org/t/p/w300_and_h450_face/nraZoTzwJQPHspAVsKfgl3RXKKa.jpg",
  },
  {
    uri: "https://media.themoviedb.org/t/p/w235_and_h235_face/e8CUyxQSE99y5IOfzSLtHC0B0Ch.jpg",
  },
  ,
  {
    uri: "https://media.themoviedb.org/t/p/w300_and_h450_face/At3JgvaNeEN4Z4ESKlhhes85Xo3.jpg",
  },
];

export const FamousPeopleWithSunIn: React.FC<FamousPeopleWithSunInProps> = ({
  cards,
  isLoading,
  isError,
  refetch,
}) => {
  const { t } = useTranslation();
  const boldFont = useAppFont();
  const boldFontt = useAppFont("bold");

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1 }); // trigger once parent is visible
  }, []);
  if (isError) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          elevation: 20,
          alignItems: "center",
        }}
      >
        <Button onPress={() => refetch()} width={50}>
          <MCIcon name="reload-alert" size={20} color="white" />
        </Button>
      </View>
    );
  }

  return (
    <>
      <View>
        <Text style={[styles.text, { fontFamily: boldFont }]}>
          {t("withSunIn")}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: primaryShades[100],
          borderRadius: 10,
          alignItems: "center",
          position: "relative",
        }}
      >
        <View style={styles.container}>
          <View style={styles.right}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {!isLoading ? (
                <OverlappingCards cards={cards ?? []} />
              ) : (
                <>
                  <FamousPeopleSkeleton />
                </>
              )}
            </ScrollView>
          </View>
          <View style={styles.left}>
            {images.map((img, index) => (
              <ImageCard
                key={index}
                img={img}
                index={index}
                progress={progress}
                images={images}
              />
            ))}
            <View
              style={{
                position: "absolute",
                backgroundColor: "white",
                top: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: boldFont,
                  fontSize: 8,
                  paddingHorizontal: 5,
                  elevation: 20,
                }}
              >
                +99,914  celebrities
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ fontFamily: boldFont, fontSize: fontSizes.xs }}>
          يستخدم هذا التطبيق واجهة برمجة تطبيقات TMDB، وهو غير معتمد أو مدعوم من
          TMDB.
        </Text>
      </View>
    </>
  );
};
