"use client";

import { useState } from "react";

export type SortOrder = "asc" | "desc";

export function useSort(initialOrder: SortOrder = "asc") {
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialOrder);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return {
    sortOrder,
    toggleSort,
  };
}
