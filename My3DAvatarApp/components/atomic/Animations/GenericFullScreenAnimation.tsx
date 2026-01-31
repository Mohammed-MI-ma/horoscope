import React from "react";
import { View, Text, Dimensions , StyleSheet } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { Button, useColorModeValue, useToken } from "native-base";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppFont } from "@/hooks/useAppFont";
import { useGenericAnimation } from "@/hooks/useGenericAnimation";
import { styles } from "./GenericFullScreenAnimation.styles";


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function GenericFullScreenAnimation({
  width = SCREEN_WIDTH,
  height = SCREEN_HEIGHT,
  onFinish,
}: {
  width?: number;
  height?: number;
  onFinish?: () => void;  animationJson: string;

}) {
  const boldFont = useAppFont();
  const animationJson = React.useMemo(
    () => require("../../../assets/lottie/MIM.json"),
    [],
  );
  const { progress } = useGenericAnimation(animationJson, onFinish);

  const textColor = useColorModeValue("text.secondary", "text.primary");
  const bgColor = useColorModeValue("primary.500", "primary.50");
  const [iconColor] = useToken("colors", [textColor]);

  return (
    <View style={[styles.container, { width, height }]}>
      <AnimatedLottieView
        source={animationJson}
        progress={progress as SharedValue<number | undefined>}
        loop={false}
        resizeMode="cover"
        style={{ ...StyleSheet.absoluteFillObject }}
      />

      {/* Top buttons */}
      <View style={styles.topHeader}>
        <Button bg={bgColor} _text={{ color: textColor }} style={styles.button}>
          <MCIcon name="volume-high" size={15} color={iconColor} />
        </Button>
        <Button
          bg={bgColor}
          _text={{ color: textColor }}
          style={styles.button}
          onPress={() => onFinish?.()}
        >
          <MCIcon name="arrow-u-left-top" size={15} color={iconColor} />
        </Button>
      </View>

      {/* Bottom text */}
      <View style={styles.elementsContainer}>
        <View style={styles.logoContainer}>
          <Text style={[styles.titleText, { fontFamily: boldFont }]}>
            My 3D Avatar App
          </Text>
        </View>
      </View>
    </View>
  );
}
