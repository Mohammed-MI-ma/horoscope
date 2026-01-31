// components/CelebritySearch.tsx
import { useRTL } from "@/contexts/RTLContext";
import { useAppFont } from "@/hooks/useAppFont";
import { Button } from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Celebrity {
  id: number;
  actorName: string;
  [key: string]: any;
}

interface CelebritySearchProps {
  onSelect: (celebrity: Celebrity) => void;
}

const CelebritySearch: React.FC<CelebritySearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(false);

  const { isRtl } = useRTL();
  const { t } = useTranslation();
  const fontFamily = useAppFont();

  const renderItem = ({ item }: { item: Celebrity }) => (
    <TouchableOpacity onPress={() => onSelect(item)}>
      <Text style={styles.item}>{item.actorName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              {
                fontFamily,
                writingDirection: isRtl ? "rtl" : "ltr",
                textAlign: isRtl ? "right" : "left",
                paddingLeft: isRtl ? 40 : 14,
                paddingRight: isRtl ? 14 : 40,
              },
            ]}
            placeholder={t("search_placeholder")}
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
          />

          {query.length > 0 && (
            <TouchableOpacity
              style={[
                styles.clearButton,
                isRtl ? { left: 12 } : { right: 12 },
              ]}
              onPress={() => {
                setQuery("");
                setResults([]);
              }}
            >
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.filterContainer}>
          <Button>fil</Button>
        </View>
      </View>

      {loading && <ActivityIndicator size="small" />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          query.length > 0 && !loading ? (
            <Text style={styles.emptyText}>{t("no_results")}</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  inputWrapper: {
    flex: 1,
    position: "relative",
  },

  input: {
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "white",
    fontSize: 12,
  },

  clearButton: {
    position: "absolute",
    top: 8,
  },

  clearText: {
    fontSize: 16,
    color: "#888",
  },

  filterContainer: {
    paddingHorizontal: 8,
  },

  filterText: {
    color: "white",
    fontSize: 12,
  },

  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 12,
  },
});

export default CelebritySearch;
