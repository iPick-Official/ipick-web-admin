import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllBookings`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "x-api-key": token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!backendRes.ok) {
      const errorData = await backendRes.json().catch(() => null);
      return NextResponse.json(errorData || { message: "Backend error" }, {
        status: backendRes.status,
      });
    }

    // Stream the backend response directly to the client
    const stream = backendRes.body;
    if (!stream) {
      return NextResponse.json(
        { message: "No data from backend" },
        { status: 500 }
      );
    }

    return new NextResponse(stream, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
