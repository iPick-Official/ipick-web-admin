import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = (await cookies()).get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Call your NestJS backend
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rainy-day-surcharge`,
      {
        method: "GET",
        headers: {
          "x-api-key": token,
          "Content-Type": "application/json",
        },
        cache: "no-store", // optional: always fetch fresh data
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch employees" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
