import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { useAppFont } from "@/hooks/useAppFont";
import { styles } from "./NavigationBottomTab.styles";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store";
import { MotiView } from "moti";

interface TabItem {
  name: string;
  label: string;
  Icon?: React.FC<SvgProps>;
  onPress: () => void;
}

interface Props {
  tabs: TabItem[];
  activeTabName?: string;
}

export const NavigationBottomTab: React.FC<Props> = ({
  tabs,
  activeTabName,
}) => {
  const isDarkMode = useSelector(
    (state: RootStateType) => state.application.isDarkMode
  );

  const boldFont = useAppFont();

  return (
    <MotiView
      from={{ opacity: 0, backgroundColor: isDarkMode ? "#fff" : "#020314" }}
      animate={{ opacity: 1, backgroundColor: isDarkMode ? "#fff" : "#020314" }}
      transition={{
        type: "timing",
        duration: 500,
        repeatReverse: true,
      }}
      style={styles.container}
    >
      {tabs.map((tab, index) => {
        const isActive = tab.name === activeTabName;

        return (
          <TouchableOpacity
            key={`${tab.name}-${index}`}
            onPress={tab.onPress}
            style={styles.tab}
          >
            {tab.Icon && (
              <tab.Icon
                width={24}
                height={24}
                stroke={!isDarkMode ? "#fff" : "#020314"}
                fill={!isDarkMode ? "#fff" : "#020314"}
              />
            )}
            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
                {
                  fontFamily: boldFont,
                  color: isActive
                    ? "#020314"
                    : !isDarkMode
                    ? "#fff"
                    : "#020314",
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </MotiView>
  );
};
