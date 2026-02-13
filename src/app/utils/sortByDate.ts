export const sortByDate = <T extends Record<string, any>>(
  data: T[],
  dateKey: keyof T,
  order: "asc" | "desc" = "desc",
) => {
  return [...data].sort((a, b) => {
    const dateA = new Date(a[dateKey]).getTime();
    const dateB = new Date(b[dateKey]).getTime();

    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
};
