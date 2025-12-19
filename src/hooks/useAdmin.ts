"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Admin } from "@/types/admin";

export function useAdmin() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminCookie = Cookies.get("admin");

    if (adminCookie) {
      try {
        setAdmin(JSON.parse(adminCookie));
      } catch (error) {
        console.error("Invalid admin cookie", error);
        setAdmin(null);
      }
    }

    setLoading(false);
  }, []);

  return { admin, loading };
}
