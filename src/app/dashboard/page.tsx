"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Ensure token is available and not already in localStorage
    if (token) {
      localStorage.setItem("authToken", token);
      // Replace URL to remove the token query parameter
      router.replace("/dashboard");
    } else {
      // Optionally handle the case where token is not present
      // (e.g., show a message or redirect elsewhere)
      console.log("No token found in the URL.");
    }
  }, [token, router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Dashboard 🎉</h1>
    </div>
  );
}
