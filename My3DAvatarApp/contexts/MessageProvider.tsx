// src/providers/MessageProvider.tsx
import { Alert, HStack, Text, VStack } from "native-base";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

// Import interfaces
import {
    Message,
    MessageAPI,
    MessageProviderProps,
    MessageType,
} from "../types/message";

const MessageContext = createContext<MessageAPI | undefined>(undefined);

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<Message | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showMessage = useCallback(
    (type: MessageType, text: string, duration = 2500) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      setMessage({ type, text, duration });

      timerRef.current = setTimeout(() => {
        setMessage(null);
        timerRef.current = null;
      }, duration);
    },
    []
  );

  const api: MessageAPI = {
    success: (text, duration) => showMessage("success", text, duration),
    error: (text, duration) => showMessage("error", text, duration),
    warning: (text, duration) => showMessage("warning", text, duration),
    info: (text, duration) => showMessage("info", text, duration),
  };

  return (
    <MessageContext.Provider value={api}>
      {children}

      {message && (
        <VStack
          position="absolute"
          top={10}
          left={0}
          right={0}
          alignItems="center"
          zIndex={9999}
          pointerEvents="box-none"
        >
          <Alert w="90%" status={message.type} borderRadius="md" variant="solid">
            <HStack space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md">{message.text}</Text>
            </HStack>
          </Alert>
        </VStack>
      )}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageAPI => {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return ctx;
};
