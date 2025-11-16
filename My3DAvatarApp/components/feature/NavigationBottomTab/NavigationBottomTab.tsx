import { useAppFont } from "@/hooks/useAppFont";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./NavigationBottomTab.styles";

interface TabItem {
  name: string;
  label: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>; // SVG component

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
  const boldFont = useAppFont();

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = tab.name === activeTabName;

        return (
          <TouchableOpacity
            key={`${tab.name}-${index}`} // make key unique
            onPress={tab.onPress}
            style={styles.tab}
          >
            {tab.Icon && <tab.Icon width={32} height={32} />}
            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
                { fontFamily: boldFont },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
