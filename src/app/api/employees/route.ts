import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleApiResponse } from "@/app/utils/api";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    // If no token, simulate a 401 response and let the util handle it
    if (!token) {
      return handleApiResponse(
        new Response(JSON.stringify({ message: "Unauthorized" }), {
          status: 401,
        }),
      );
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/employees`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return handleApiResponse(backendRes);
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
