import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAppFont } from "@/hooks/useAppFont";
import { useTranslation } from "react-i18next";
import { formatTodayDate } from "@/utils/formatTodayDate";

export interface UserInfosController {
  user: User | null;
  loading: boolean;
  t: (key: string, options?: Record<string, any>) => string;
  boldFont: string;
  fontRegular: string;
  dateAr: string;
}

export const useUserInfosController = (): UserInfosController => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  const boldFont = useAppFont("bold");
  const fontRegular = useAppFont("regular");

  const dateAr = useMemo(() => formatTodayDate("ar"), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, t, boldFont, fontRegular, dateAr };
};
