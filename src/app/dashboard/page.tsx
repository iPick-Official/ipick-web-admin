"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      // Optionally replace URL to remove token query param
      router.replace("/dashboard");
    }
  }, [token, router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Dashboard 🎉</h1>
    </div>
  );
}
