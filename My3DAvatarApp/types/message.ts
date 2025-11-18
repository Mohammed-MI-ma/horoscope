// src/types/message.ts

export type MessageType = "success" | "error" | "warning" | "info";

export interface Message {
  id?: number;
  type: MessageType;
  text: string;
  duration?: number; // in ms
}

export interface MessageAPI {
  success: (text: string, duration?: number) => void;
  error: (text: string, duration?: number) => void;
  warning: (text: string, duration?: number) => void;
  info: (text: string, duration?: number) => void;
}

export interface MessageProviderProps {
  children: React.ReactNode;
}
