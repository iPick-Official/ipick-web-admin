import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Get access token from secure cookies
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    // Await params before destructuring
    const { id } = await context.params;

    // Call NestJS backend for driver history
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/driver-history/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    // If history is not found (404), return empty array
    if (backendRes.status === 404) {
      return NextResponse.json([]);
    }

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        data || { message: "Failed to fetch driver history" },
        { status: backendRes.status }
      );
    }

    // Return driver history to frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching driver history:", error);
    return NextResponse.json(
      { message: "Failed to fetch driver history" },
      { status: 500 }
    );
  }
}
