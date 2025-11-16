// hooks/useAppFont.ts
import { useSelector } from "react-redux";

type FontWeight = "regular" | "bold";

export const useAppFont = (weight: FontWeight = "regular") => {
  const language = useSelector((state: any) => state.application.language);
  const isArabic = language === "ar";

  if (isArabic) {
    return weight === "bold" ? "alfont_com_DARK" : "Cairo-Regular";
  } else {
    return weight === "bold" ? "Inter-Bold" : "Inter-Regular";
  }
};
