"use client";

import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { Admin } from "@/types/admin";

export function useAdmin() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAdmin = useCallback(() => {
    setLoading(true);
    const adminCookie = Cookies.get("admin");

    if (adminCookie) {
      try {
        setAdmin(JSON.parse(adminCookie));
      } catch (error) {
        console.error("Invalid admin cookie", error);
        setAdmin(null);
      }
    } else {
      setAdmin(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadAdmin();
  }, [loadAdmin]);

  // Update admin state and cookie
  const updateAdmin = (updatedAdmin: Admin) => {
    setAdmin(updatedAdmin);
    Cookies.set("admin", JSON.stringify(updatedAdmin), { expires: 7 });
  };

  // Function to refresh admin info from cookie
  const refetch = () => {
    loadAdmin();
  };

  return { admin, loading, updateAdmin, refetch };
}
