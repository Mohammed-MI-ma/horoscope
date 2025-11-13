import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Create context
const RTLContext = createContext({
  isRtl: false,
  setRtl: (rtl: boolean) => {},
});

// Hook to use context easily
export const useRTL = () => useContext(RTLContext);

// Provider component
export const RTLProvider = ({ children }: { children: any }) => {
  // Read language from Redux store
  const language = useSelector((state: any) => state.application.language); // adjust the path to your slice

  // Local state for RTL
  const [isRtl, setIsRtl] = useState(language === "ar" || language === "he");

  useEffect(() => {
    // Update RTL whenever language changes in Redux
    setIsRtl(language === "ar" || language === "he");
  }, [language]);

  // Optional setter if you want to override manually
  const setRtl = (rtl: boolean) => setIsRtl(rtl);

  return (
    <RTLContext.Provider value={{ isRtl, setRtl }}>
      {children}
    </RTLContext.Provider>
  );
};
