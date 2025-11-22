import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
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

    // await params before destructuring
    const { id } = await context.params;

    // Call your NestJS backend
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/rider/${id}`,
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

    // Return driver data to frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching driver by ID:", error);
    return NextResponse.json(
      { message: "Failed to fetch driver details" },
      { status: 500 }
    );
  }
}
