import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { MotiView } from "moti";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./CelebrityDetailsScreen.styles";
import { CelebrityHeader, ScrollContent } from "./ui/CelebrityHeader";

type Celebrity = {
  id: string;
  name: string;
};

export default function CelebrityDetailsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  /** Data is memoized to avoid re-creation on each render */
  const data: Celebrity[] = useMemo(
    () =>
      Array.from({ length: 100 }, (_, index) => ({
        id: String(index + 1),
        name: `Celebrity ${index + 1}`,
      })),
    []
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // API call here
    } finally {
      setRefreshing(false);
    }
  }, []);

  const renderItem = useCallback(({ item }: { item: Celebrity }) => null, []);

  return (
    <MotiView
      from={{ opacity: 0.75 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 350 }}
      style={styles.flex}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={<ScrollContent />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </MotiView>
  );
}
