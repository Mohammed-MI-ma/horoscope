export const formatTodayDate = (locale: "fr" | "ar") => {
  const today = new Date();

  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "ar", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(today);
};
