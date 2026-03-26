import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Get token from secure HTTP-only cookie
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 },
      );
    }

    // Call your NestJS backend using streaming
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllDrivers`,
      {
        method: "GET",
        headers: {
          "x-api-key": token,
          "Content-Type": "application/json",
        },
      },
    );

    if (!backendRes.ok) {
      const errorData = await backendRes.json().catch(() => null);
      return NextResponse.json(errorData || { message: "Backend error" }, {
        status: backendRes.status,
      });
    }

    // Stream the response directly to the client
    const stream = backendRes.body;
    if (!stream) {
      return NextResponse.json(
        { message: "No data from backend" },
        { status: 500 },
      );
    }

    return new NextResponse(stream, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching riders:", error);
    return NextResponse.json(
      { message: "Failed to fetch riders" },
      { status: 500 },
    );
  }
}
