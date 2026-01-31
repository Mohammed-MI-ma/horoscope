import React, { useCallback, useState } from "react";
import { StyleSheet, I18nManager } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import AtDIcon from "react-native-vector-icons/AntDesign";
import { Button } from "native-base";
import * as Haptics from "expo-haptics";
import { useDispatch } from "react-redux";

import fontSizes from "@/constants/fontSizes";
import { resetApplication } from "@/redux/applicationSlice";
import { resetAuth } from "@/redux/authSlice";
import { resetDrawer } from "@/redux/drawerSlice";
import { useUserInfosController } from "../UserInfos/UserInfos.controller";

const AnimatedIconContainer = Animated.createAnimatedComponent(Animated.View);

const LogoutButton: React.FC = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, loading } = useUserInfosController();

  const handleLogout = useCallback(async () => {
    if (!user || isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      // Haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Sign out from Firebase
      await signOut(auth);

      // Redux cleanup
      dispatch(resetAuth());
      dispatch(resetApplication());
      dispatch(resetDrawer());

      console.info("[Auth] User signed out successfully");
    } catch (err) {
      console.error("[Auth] Sign-out failed:", err);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [auth, dispatch, isLoggingOut, user]);

  // Do not render if auth is loading or user is not logged in
  if (loading || !user) return null;

  return (
    <Button
      onPress={handleLogout}
      isDisabled={isLoggingOut}
      style={styles.button}
      accessibilityRole="button"
      accessibilityLabel="Log out"
      _pressed={styles.pressed}
    >
      <AnimatedIconContainer
        entering={FadeInDown.springify().duration(300)}
        exiting={FadeOutUp.springify().duration(200)}
      >
        <AtDIcon
          name="logout"
          size={fontSizes.md}
          color={isLoggingOut ? "#ccc" : "white"}
          style={{
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          }}
        />
      </AnimatedIconContainer>
    </Button>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
