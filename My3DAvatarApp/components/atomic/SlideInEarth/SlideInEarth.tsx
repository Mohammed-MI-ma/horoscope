import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef } from "react";
import { Animated, Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

export default function SlideInEarth({ uri, width }) {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const navigation = useNavigation();

  const animateSlide = useCallback(() => {
    translateY.setValue(screenHeight); // reset to off-screen
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 8,
    }).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      animateSlide();

      // Reset position when leaving the screen
      const unsubscribe = navigation.addListener("blur", () => {
        translateY.setValue(screenHeight);
      });

      return unsubscribe;
    }, [])
  );

  return (
    <Animated.Image
      source={{ uri }}
      resizeMode="cover"
      style={{
        width,
        height: 200,
        transform: [{ translateY }],
      }}
    />
  );
}
