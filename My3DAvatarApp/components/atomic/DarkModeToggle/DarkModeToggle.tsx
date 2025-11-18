import { setDarkMode } from "@/redux/applicationSlice";
import { RootStateType } from "@/store";
import { Button, useColorModeValue, useToken } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";

export const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootStateType) => state.application.isDarkMode
  );

  const bgColor = useColorModeValue("primary.500", "primary.50");
  const textColor = useColorModeValue("text.secondary", "text.primary");
  const [backgroundColor] = useToken("colors", [textColor]);

  const handleToggle = () => {
    dispatch(setDarkMode(!isDarkMode));
  };


  return (
    <Button
      onPress={handleToggle}
      bg={bgColor}
      _text={{ color: textColor }}
      style={styles.button}
    >
      <Animated.View
        key={isDarkMode ? "dark" : "light"}
        entering={FadeInDown.springify().duration(400)}
        exiting={FadeOutUp.springify().duration(400)}
      >
        <MCIcon
          name={isDarkMode ? "lightbulb-on-10" : "brightness-2"}
          size={15}
          color={backgroundColor}
        />
      </Animated.View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    zIndex: 1000,
  },
  rightPosition: {
    right: 20,
  },
  leftPosition: {
    left: 20,
  },
  button: {
    borderRadius: 50,
    padding: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
});
