import { useQuery } from "@tanstack/react-query";
import { Driver } from "@/types/drivers";

export const useDrivers = () => {
  return useQuery<Driver[]>({
    queryKey: ["drivers"],
    queryFn: async () => {
      const res = await fetch("/api/driver");
      if (!res.ok) throw new Error("Failed to fetch drivers");

      const data: Driver[] = await res.json();
      return data.filter((d) => d.status === "approved" && d.isLogged === true);
    },
    staleTime: 30_000, // 30s
    refetchInterval: 30_000,
  });
};
