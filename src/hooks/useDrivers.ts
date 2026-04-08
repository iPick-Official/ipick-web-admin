import { useQuery } from "@tanstack/react-query";
import { Driver } from "@/types/drivers";

export const useDrivers = () => {
  return useQuery<Driver[]>({
    queryKey: ["drivers"],
    queryFn: async () => {
      const res = await fetch("/api/driver?status=approved&logged=true");
      if (!res.ok) throw new Error("Failed to fetch drivers");
      return res.json();
    },
    staleTime: 5 * 60_000, 
    refetchInterval: false, 
  });
};
