import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleApiResponse } from "@/app/utils/api";

export async function GET() {
  try {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      const response = NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 },
      );
      (await cookies()).delete("access_token");
      (await cookies()).delete("refresh_token");
      return response;
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wallet`,
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
