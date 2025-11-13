import GlobalLoader from "@/components/atomic/GlobalLoader/GlobalLoader";
import React, { createContext, useContext, useState } from "react";

const GlobalLoaderContext = createContext({
  showLoader: (message?: string) => {},
  hideLoader: () => {},
});

export const GlobalLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string>("");

  const showLoader = (msg?: string) => {
    if (msg) setMessage(msg);
    setVisible(true);
  };
  const hideLoader = () => setVisible(false);

  return (
    <GlobalLoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      <GlobalLoader visible={visible} message={message} />
    </GlobalLoaderContext.Provider>
  );
};

export const useGlobalLoader = () => useContext(GlobalLoaderContext);
