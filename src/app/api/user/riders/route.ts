import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Get token from secure HTTP-only cookie
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    // Call your NestJS backend
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllRiders`,
      {
        method: "GET",
        headers: {
          "x-api-key": token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(data, { status: backendRes.status });
    }

    // Return the bookings to the frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
