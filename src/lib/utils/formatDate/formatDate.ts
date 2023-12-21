export const formatDate = (date?: Date | string) =>
  date === undefined
    ? "undefined"
    : Intl.DateTimeFormat("ban", {
        dateStyle: "medium",
      }).format(new Date(date));
