import { setDarkMode } from "@/redux/applicationSlice";
import { RootStateType } from "@/store";
import {
  Badge,
  Box,
  Button,
  useColorModeValue,
  useToken,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { primaryShades } from "@/constants/theme";
import { useAppFont } from "@/hooks/useAppFont";
import { useTranslation } from "react-i18next";

export const NotificationsDropDown = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootStateType) => state.application.isDarkMode
  );

  const bgColor = useColorModeValue("primary.500", "primary.50");
  const textColor = useColorModeValue("text.secondary", "text.primary");
  const [iconColor] = useToken("colors", [textColor]);
  const boldFont = useAppFont("bold");
  const { t }= useTranslation();

  // DROPDOWN STATE
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: "All Notifications", value: "all" },
    { label: "Mentions", value: "mentions" },
    { label: "Messages", value: "messages" },
    {
      label: <Text
          style={{
            color: textColor,
            fontSize: 12,
            fontFamily: boldFont,
      
          }}
        >
          {t("whatWouldYouLike")}
        </Text>,
      value: 
        "qsdqsd",
      
    },
  ]);

  // Direction of dropdown
  const [dropDirection, setDropDirection] = useState<"TOP" | "BOTTOM">(
    "BOTTOM"
  );

  const handleToggle = () => {
    // Optionally, determine direction dynamically
    // For simplicity, we always open downward here
    setDropDirection("BOTTOM");
    setOpen((prev) => !prev);
  };

  return (
    <Box alignItems="center">
      <VStack>
        <Badge
          colorScheme="danger"
          rounded="full"
          mb={-4}
          mr={4}
          zIndex={2}
          variant="solid"
          alignSelf="flex-end"
          _text={{ fontSize: 8 }}
        >
          200
        </Badge>

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
              name={isDarkMode ? "bell-alert" : "bell-alert-outline"}
              size={15}
              color={iconColor}
            />
          </Animated.View>
        </Button>

        {/* DROPDOWN CONTAINER */}
        {open && (
          <View style={[styles.dropdownContainer, { left: -180 }]}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Filter notifications"
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              dropDownContainerStyle={[styles.dropdownList, { width: 220 }]}
              dropDownDirection="BOTTOM"
            />
          </View>
        )}
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    padding: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },

  dropdownContainer: {
    position: "absolute",
    top: 50, // adjust if opening UP
    width: 220,
    zIndex: 99999,
  },

  dropdown: {
    borderRadius: 12,
    borderColor: primaryShades[700],
  },

  dropdownList: {
    borderRadius: 12,
    borderColor: "#E5E7EB",
  },
});
