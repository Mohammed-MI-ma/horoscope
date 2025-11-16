import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { preloadGlobalAssets } from "../config.dev";
import { global_Assets } from "../images";

type AssetsType = typeof global_Assets;

interface AssetsContextValue {
  loadedAssets: AssetsType | null;
  loading: boolean;
  error: Error | null;
}

const AssetsContext = createContext<AssetsContextValue | null>(null);

interface AssetsProviderProps {
  children: ReactNode;
}

export const AssetsProvider = ({ children }: AssetsProviderProps) => {
  const [loadedAssets, setLoadedAssets] = useState<AssetsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        await preloadGlobalAssets(); // preloads images
        if (isMounted) setLoadedAssets(global_Assets); // object matches type
      } catch (err) {
        console.error("Failed to preload global assets:", err);
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const contextValue = useMemo(
    () => ({ loadedAssets, loading, error }),
    [loadedAssets, loading, error]
  );

  if (loading) return null; // or <FancyLoader />

  return (
    <AssetsContext.Provider value={contextValue}>
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error("useAssets must be used within an AssetsProvider");
  }
  return context;
};
