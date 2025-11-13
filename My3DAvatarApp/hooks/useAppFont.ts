// hooks/useAppFont.ts
import { useSelector } from "react-redux";

export const useAppFont = () => {
  const language = useSelector((state: any) => state.application.language);
  return language === "ar" ? "Cairo-Regular" : "Inter-Regular";
};
