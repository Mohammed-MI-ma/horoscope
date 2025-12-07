// src/contexts/AssetsContext.tsx
import { preloadImages } from "@/utils/loadAssets";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator, Text, View } from "react-native";

export type AssetMap = Record<string, string>;

interface AssetsContextValue {
  loadedAssets: AssetMap | null;
  loading: boolean;
  error: Error | null;
}

const AssetsContext = createContext<AssetsContextValue | null>(null);

interface AssetsProviderProps {
  children: ReactNode;
  assetsToLoad: AssetMap; // assets specific to this screen
  fallback?: ReactNode; // optional fallback UI while loading
}

export const AssetsProvider = ({
  children,
  assetsToLoad,
  fallback,
}: AssetsProviderProps) => {
  const [loadedAssets, setLoadedAssets] = useState<AssetMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        console.log(assetsToLoad);
        console.log("zabi",!assetsToLoad);
        console.log("porno",Object.keys(assetsToLoad).length === 0);

        if (!assetsToLoad || Object.keys(assetsToLoad).length === 0) {
          throw new Error("Assets to load are undefined or empty");
        }

        await preloadImages(assetsToLoad);
        if (isMounted) setLoadedAssets(assetsToLoad);
      } catch (err) {
        console.error("❌ Asset preload failed:", err);
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [assetsToLoad]);

  const contextValue = useMemo(
    () => ({ loadedAssets, loading, error }),
    [loadedAssets, loading, error]
  );

  // Show fallback while loading, error message if failed
  if (loading) {
    return <>{fallback ?? <ActivityIndicator size="large" color="white" />}</>;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          Failed to load assets: {error.message}
        </Text>
      </View>
    );
  }

  // Everything loaded successfully
  return (
    <AssetsContext.Provider value={contextValue}>
    {loading ? fallback || null : children}
    </AssetsContext.Provider>
  );
};

export const useAssets = (): AssetsContextValue => {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error("useAssets must be used within an AssetsProvider");
  }
  return context;
};
