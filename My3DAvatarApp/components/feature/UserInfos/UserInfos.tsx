import React, { FC } from "react";
import { View, Text, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import Svg, { Circle } from "react-native-svg";

import { useUserInfosController } from "./UserInfos.controller";
import { styles } from "./UserInfos.styles";

interface UserInfosProps {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  color?: string;
  navigation: any;
}

const UserInfos: FC<UserInfosProps> = ({
  size = 40,
  strokeWidth = 1,
  progress = 70,
  color = "#1f313dff",
  navigation,
}) => {
  const { user, t, boldFont, fontRegular, dateAr } =
    useUserInfosController();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * progress) / 100;

  const handlePress = () => {
    navigation.navigate("UserProfileScreen");
  };

  if (!user) {
    return <Text style={{ color: "white" }}>User not logged in</Text>;
  }

  return (
    <>
      <View style={styles.containerRow}>
        <Pressable
          onPress={handlePress}
          android_ripple={{ color: "rgba(255,255,255,0.08)" }}
        >
          <View
            style={{
              width: size,
              height: size,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Svg width={size} height={size}>
              <Circle
                stroke="#eee"
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
              />
              <Circle
                stroke={color}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>

            <View style={{ position: "absolute" }}>
              <Text style={{ color: "white", fontSize: 10 }}>
                N
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.userInfoWrapper}>
          <Text
            style={{
              color: "white",
              fontSize: 10,
              fontFamily: fontRegular,
            }}
          >
            {dateAr}
          </Text>
          <Text style={{ color: "white", fontFamily: boldFont }}>
            {t("greeting", { email: user.email })}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.lottieWrapper}>
          <LottieView
            source={require("@/assets/lottie/LoopedHand.json")}
            autoPlay
            loop={true}
            style={styles.lottie}
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={[styles.titleText, { fontFamily: boldFont }]}>
            {t("askQuestion")}
          </Text>
          <Text
            style={[
              styles.descriptionText,
              { fontFamily: fontRegular },
            ]}
          >
            {t("unsolvedIssues")}
          </Text>
        </View>
      </View>
    </>
  );
};

export default UserInfos;
